import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from '../../entities/user.entity';



describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let jwtService: JwtService;

  const mockAuthService = {
    findOne: jest.fn(),
    generateAccessToken: jest.fn(),
    generateRefreshToken: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: Repository,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should return error if user is not found', async () => {
  //   const loginUserDto: LoginUserAuthDto = {
  //     email: 'Admin@gmail.com',
  //     password: 'password',
  //   };

  //   jest.spyOn(authService, 'findOne').mockResolvedValue(null);

  //   const result = await controller.login(loginUserDto);

  //   expect(result).toEqual({
  //     code: 'B0002',
  //     status: 400,
  //     message: 'Invalid Email user',
  //   });
  // });
  // Add more test cases as needed
});
