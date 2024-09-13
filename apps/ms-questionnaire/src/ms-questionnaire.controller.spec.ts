import { Test, TestingModule } from '@nestjs/testing';
import { MsQuestionnaireController } from './ms-questionnaire.controller';
import { MsQuestionnaireService } from './ms-questionnaire.service';

describe('MsQuestionnaireController', () => {
  let msQuestionnaireController: MsQuestionnaireController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MsQuestionnaireController],
      providers: [MsQuestionnaireService],
    }).compile();

    msQuestionnaireController = app.get<MsQuestionnaireController>(MsQuestionnaireController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(msQuestionnaireController.getHello()).toBe('Hello World!');
    });
  });
});
