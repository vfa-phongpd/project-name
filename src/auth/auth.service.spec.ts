import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository, // Use the actual Repository class
        },
        {
          provide: JwtService,
          useClass: JwtService, // Use the actual JwtService class
        },
        , AuthService],
    }).compile();
    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
    service = module.get<AuthService>(AuthService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('findOne', () => {
  //   it('should return user information', async () => {
  //     const email = 'test@example.com';
  //     const mockUser = {
  //       id: 1,
  //       name: "Admin",
  //       email: "Admin@gmail.com",
  //       password: "$2b$10$9xMrfyGz6euLjOhpSov5yOr0kifPKXQTobLbaYlzxAzkP8dFBpAlq",
  //       gender: 1,
  //       birthday: "2001-08-29",
  //       last_login: "2023-08-10 21:35:23.000000",
  //       created_at: "2023-08-10 21:35:23.000000",
  //       create_by: 1,
  //       role_id: 1
  //     };
  //     userRepository.findOne = jest.fn().mockResolvedValue(mockUser);

  //     const result = await userService.findOne(email);

  //     expect(result).toEqual(mockUser);
  //     expect(userRepository.findOne).toHaveBeenCalledWith({ relations: { role_id: true }, where: { email } });
  //   });

  //   it('should throw an error if repository throws an error', async () => {
  //     const email = 'test@example.com';
  //     const mockError = new Error('Database error');
  //     userRepository.findOne = jest.fn().mockRejectedValue(mockError);

  //     await expect(userService.findOne(email)).rejects.toThrowError(mockError);
  //   });
});


