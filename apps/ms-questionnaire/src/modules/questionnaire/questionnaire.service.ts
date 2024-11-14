import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';
import { Questionnaire } from './schemas/questionnaire.schema';
import { mongoErrorHandler } from '@app/common';
import { MongoError } from 'mongodb';
import { SectionService } from '../section/section.service';
import { QuestionService } from '../question/question.service';
import { AnswerService } from '../answer/answer.service';
import { CreateAnswerDto } from '../answer/dto/create-answer.dto';
import { CreateQuestionDto } from '../question/dto/create-question.dto';
import { CreateSectionDto } from '../section/dto/create-section.dto';

@Injectable()
export class QuestionnaireService {
  constructor(
      @InjectModel(Questionnaire.name) private questionnaireModel: Model<Questionnaire>,
      private readonly sectionService: SectionService,
      private readonly questionService: QuestionService,
      private readonly answerService: AnswerService,
  ) {}

  async createAnswer(answerData: CreateAnswerDto) {
      console.debug(answerData)
      return await this.answerService.create(answerData);
  }


  async createQuestion(questionData: CreateQuestionDto) {
    const newAnswers = await Promise.all(questionData.answers.map(async (answerData) => await this.createAnswer(answerData)));
    questionData.answers = newAnswers;

    const userAnswer = questionData.userAnswer ?? [];
    const newUserAnswer = await Promise.all(userAnswer.map(async (answerData) => await this.createAnswer(answerData)));
    questionData.userAnswer = newUserAnswer;

    return await this.questionService.create(questionData);
  }

  async createSection(sectionData: CreateSectionDto) {
    const newQuestions = await Promise.all(sectionData.questions.map(async (questionData) => await this.createQuestion(questionData)));
    sectionData.questions = newQuestions;

    return await this.sectionService.create(sectionData);
  }

  async create(createQuestionnaireDto: CreateQuestionnaireDto) {
    try {
      const newSections = await Promise.all(
        createQuestionnaireDto.sections.map(async (sectionData) =>
          await this.createSection(sectionData)
        )
      );
      
      createQuestionnaireDto.sections = newSections;
      console.log(createQuestionnaireDto)
      const createdQuestionnaire = await this.questionnaireModel.create(
        createQuestionnaireDto
      );

      const populatedQuestionnaire = await createdQuestionnaire.populate({
        path: 'sections',
        select: '_id',
        populate: {
            path: 'questions',
            select: '_id',
            populate: {
                path: 'answers',
                select: '_id',
            },
        },
      });

      return populatedQuestionnaire;
    } catch (error) {
      if ((error as Record<string, number>)?.code) {
          mongoErrorHandler(error as MongoError);
      }
      throw new Error(error as string);
    }
  }

  async findAll() {
    return await this.questionnaireModel.find().populate({
      path: 'sections',
      populate: {
        path: 'questions',
        populate: {
          path: 'answers',
        },
      },
    }).exec();
  }

  async findOne(id: string) {
    return await this.questionnaireModel.findById(id).exec();
  }

  async update(id: string, updateQuestionnaireDto: UpdateQuestionnaireDto) {
    try {
      return await this.questionnaireModel.updateOne({ _id: id }, updateQuestionnaireDto).exec();
    } catch (error: unknown) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async remove(id: string) {
    return await this.questionnaireModel
      .findOneAndDelete({ _id: id })
      .exec();
  }
  
}