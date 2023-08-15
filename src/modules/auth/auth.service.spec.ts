import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { getRepositoryToken } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { User } from 'src/entities/user.entity';
import { mockJwtService } from 'src/test/mocks/service/mock-jwt.service';




describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: Repository<User>;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: Repository,
          useClass: Repository
        },
        {
          provide: JwtService,
          useValue: mockJwtService
        }
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return user information', async () => {
      const email = 'Admin12312@gmail.com';
      const mockUser = {
        id: 1,
        name: "Admin",
        email: "Admin@gmail.com",
        password: "$2b$10$9xMrfyGz6euLjOhpSov5yOr0kifPKXQTobLbaYlzxAzkP8dFBpAlq",
        gender: 1,
        birthday: "2001-08-29",
        last_login: "2023-08-10 21:35:23.000000",
        created_at: "2023-08-10 21:35:23.000000",
        create_by: 1,
        role_id: 1
      };
      userRepository.findOne = jest.fn().mockResolvedValue(mockUser);
      // console.log(email);

      const result = await authService.findOne(email)
      // console.log(result);

      expect(result).toBe(mockUser);
      expect(userRepository.findOne).toHaveBeenCalledWith({ relations: { role_id: true }, where: { email } });
    });

    it('should throw an error if repository throws an error', async () => {
      const email = 'test@example.com';
      const mockError = new Error('Database error');
      userRepository.findOne = jest.fn().mockRejectedValue(mockError);

      await expect(authService.findOne(email)).rejects.toThrowError(mockError);
    });
  });
  // Add more test cases as needed
});

