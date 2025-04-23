import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  const mockJwtService = {
    sign: jest.fn(() => 'mocked-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should return a signed token', () => {
    const result = service.login(1);
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      sub: 1,
      username: 'testuser',
    });
    expect(result).toEqual({ access_token: 'mocked-jwt-token' });
  });
});
