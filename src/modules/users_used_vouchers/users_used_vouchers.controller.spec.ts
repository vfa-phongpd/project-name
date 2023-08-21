import { Test, TestingModule } from '@nestjs/testing';
import { UsersUsedVouchersController } from './users_used_vouchers.controller';
import { UsersUsedVouchersService } from './users_used_vouchers.service';

describe('UsersUsedVouchersController', () => {
  let controller: UsersUsedVouchersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersUsedVouchersController],
      providers: [UsersUsedVouchersService],
    }).compile();

    controller = module.get<UsersUsedVouchersController>(UsersUsedVouchersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
