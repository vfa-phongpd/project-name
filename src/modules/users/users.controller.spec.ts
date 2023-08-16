import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../modules/users/users.controller';
import { UsersService } from '../../modules/users/users.service';
describe('UsersController', () => {
    let controller: UsersController;
    let userService: UsersService

    const mockAuthService = {
        findOne: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                UsersController,
            ],
            providers: [
                {
                    provide: UsersService,
                    useValue: mockAuthService,
                },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        userService = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    // Thêm các kiểm tra khác liên quan đến các phương thức trong bộ điều khiển
});
