import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../modules/users/users.service'; // Import RolesService
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { mockJwtService } from '../../test/mocks/service/mock-jwt.service';
import { RolesService } from '../../modules/roles/roles.service';
describe('UsersService', () => {
    let service: UsersService;
    let roleService: RolesService;
    let userRepository: Repository<User>;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: Repository,
                    useClass: Repository
                },
                RolesService
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        roleService = module.get<RolesService>(RolesService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));

    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // Thêm các kiểm tra khác liên quan đến các phương thức trong dịch vụ
});
