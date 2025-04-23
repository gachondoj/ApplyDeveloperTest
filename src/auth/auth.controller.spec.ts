import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  const mockService = {
    login: jest.fn().mockReturnValue({ access_token: 'mocked-jwt-token' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should return a JWT token', () => {
    const result = controller.login(1);
    expect(result).toEqual({ access_token: 'mocked-jwt-token' });
    expect(mockService.login).toHaveBeenCalledWith(1);
  });
});
