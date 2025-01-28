import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  import * as dotenv from 'dotenv';

  dotenv.config();
  
  @Injectable()
  export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const apiKey = this.extractApiKeyFromHeader(request);
    
    if (apiKey === process.env.DEVELOPER_KEY) {
    return true;
    }

    if (!token) {
    throw new UnauthorizedException();
    }
    try {
    const payload = await this.jwtService.verifyAsync(
      token,
      {
      secret: process.env.ACCESS_SECRET_KEY
      }
    );
    request['user'] = payload;
    } catch {
    throw new UnauthorizedException();
    }
    return true;
  }
  
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractApiKeyFromHeader(request: Request): string | undefined {
    const apiKey = request.headers['x-api-key'];
    return Array.isArray(apiKey) ? apiKey[0] : apiKey;
  }
  }
