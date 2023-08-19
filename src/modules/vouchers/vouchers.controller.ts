import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors, Req, Res, Get } from '@nestjs/common';
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
import { config } from "../../config";
import { S3 } from "aws-sdk";

type FileNameCallback = (error: Error | null, filename: string) => void

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



  @Post('upload')
  @UseInterceptors(FileInterceptor(FILE.UPLOAD_INTERCEPTOR, {
    storage: diskStorage({
      destination: FILE.UPLOAD_DISTINATION,
      filename: (req, file, cb: FileNameCallback) => {
        const timestamp = new Date().getTime();
        cb(null, ` ${timestamp}_${file.originalname}`)
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
  async upload(@UploadedFile() file: Express.Multer.File, @Req() request, @Res() response) {
    const s3 = new S3({
      accessKeyId: config.aws_access_key_id,
      secretAccessKey: config.aws_secret_access_key,
    });
    // Initialize bucket
    await this.vouchersService.initBucket(s3);
    const uplaodRes = await this.vouchersService.uploadToS3(s3, file);
    if (uplaodRes.success) {
      response.status(200).json(uplaodRes);
    } else {
      response.status(400).json(uplaodRes);
    }
  }


  @Get('get')
  get(@Body() voucher_id: number) {
    return this.vouchersService.getUsersHaveVouchers(voucher_id)
  }
}
