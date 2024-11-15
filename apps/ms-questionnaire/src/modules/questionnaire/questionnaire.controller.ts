// modules/questionnaire/questionnaire.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';
import { Public } from '@app/common';


interface UserRequest extends Request {
  user?: any;
}

@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Public()
  @Post()
  create(@Body() createQuestionnaireDto: CreateQuestionnaireDto) {
    return this.questionnaireService.create(createQuestionnaireDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.questionnaireService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionnaireService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionnaireDto: UpdateQuestionnaireDto) {
    return this.questionnaireService.update(id, updateQuestionnaireDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionnaireService.remove(id);
  }

  @Get('/user/questionnaires')
  getUserQuestionnaires(@Request() req: UserRequest) {
    const userId = req.user.id;
    console.log(userId);
    return this.questionnaireService.findByUserId(userId);
  }
}