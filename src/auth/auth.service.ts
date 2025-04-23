import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(userId: number) {
    const payload = { sub: userId, username: 'testuser' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
