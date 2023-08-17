import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('api/voucher')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) { }


  @Post('create')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './upload',
      filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
      }
    })
  }))
  create(@Body() createVoucherDto: CreateVoucherDto, @UploadedFile() file: Express.Multer.File) {
    return 'success'
  }

}
