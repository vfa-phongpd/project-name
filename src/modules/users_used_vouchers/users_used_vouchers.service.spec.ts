import { Test, TestingModule } from '@nestjs/testing';
import { UsersUsedVouchersService } from './users_used_vouchers.service';

describe('UsersUsedVouchersService', () => {
  let service: UsersUsedVouchersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersUsedVouchersService],
    }).compile();

    service = module.get<UsersUsedVouchersService>(UsersUsedVouchersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
