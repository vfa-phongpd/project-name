import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from 'src/common/custom-exceptions';
import { ErrorCustom } from 'src/common/error-custom';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { VouchersService } from './vouchers.service';
import { CustomResponse } from 'src/common/response_success';
import { FILE, FILE_SIZE, TYPE_FILE } from 'src/common/enum/file.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/third-parties/guard/jwt-auth.guard';


@Controller('api/voucher')
@ApiBearerAuth()
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) { }

  @Post('create')
  @UseInterceptors(FileInterceptor(FILE.FILE_INTERCEPTOR, {
    storage: diskStorage({
      destination: FILE.DISTINATION,
      filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
      },

    }),
    limits: {
      fileSize: FILE_SIZE.FILE_SIZE_REQUIRE // (vd: 1MB)
    },
    fileFilter: (req, file, cb) => {
      if ((file.mimetype === TYPE_FILE.PNG ||
        file.mimetype === TYPE_FILE.JPEG ||
        file.mimetype === TYPE_FILE.JPG
      )) {
        cb(null, true);
      } else {
        cb(new ErrorCustom(ERROR_RESPONSE.ImageFormat), false);
      }
    },
  }))
  @UseGuards(JwtAuthGuard)
  async create(@Body() createVoucherDto: CreateVoucherDto, @UploadedFile() file: Express.Multer.File, @Req() request) {
    if (!file) {
      throw new ErrorCustom(ERROR_RESPONSE.ImageIsRequired)
    }
    if (file.size > FILE_SIZE.FILE_SIZE_REQUIRE) {
      throw new ErrorCustom(ERROR_RESPONSE.FileSizeToLarge)
    }
    await this.vouchersService.createVoucher(createVoucherDto, file.path, request.user.id)
    return new CustomResponse(SUCCESS_RESPONSE.ResponseSuccess)
  }
}
