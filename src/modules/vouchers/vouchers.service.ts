import { Injectable, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_RESPONSE } from 'src/common/custom-exceptions';
import { ErrorCustom } from 'src/common/error-custom';
import { Group } from 'src/entities/group.entity';
import { GroupsVouchers } from 'src/entities/groups_vouchers.entity';
import { Voucher } from 'src/entities/voucher.entity';
import { In, Repository } from 'typeorm';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { S3 } from "aws-sdk";
import { config } from "../../config";
import fs from 'fs';

import { CreateBucketRequest } from 'aws-sdk/clients/s3';
@Injectable()
export class VouchersService {

  constructor(
    @InjectRepository(Voucher) private readonly voucherRepository: Repository<Voucher>,
    @InjectRepository(Group) private readonly groupRepository: Repository<Group>,
    @InjectRepository(GroupsVouchers) private readonly groupsVouchersRepository: Repository<GroupsVouchers>

  ) { }

  async createVoucher(createVoucherDto: CreateVoucherDto, pathImage: string, idUserCreate) {
    const { assign_groups } = createVoucherDto

    if (!pathImage) {
      throw new ErrorCustom(ERROR_RESPONSE.ImageIsRequired)
    }
    const newVoucher = this.voucherRepository.create({
      image: pathImage,
      name: createVoucherDto.name,
      expired_date: createVoucherDto.expired_date,
      detail: createVoucherDto.detail,
      created_at: new Date(),
      created_by: idUserCreate
    })


    const findGroup = await this.groupRepository.find({
      where: {
        group_id: In(assign_groups),
      },
    });

    const arrayUser = findGroup.map(group => group.group_id)
    const checkExits = assign_groups.filter(id => !arrayUser.includes(id))
    if (checkExits.length > 0) {
      throw new ErrorCustom(ERROR_RESPONSE.GroupNotExits, checkExits.join(', '))
    }

    const createdVoucher = await this.voucherRepository.save(newVoucher);
    for (const groups of findGroup) {
      const saveGroupsVouchers = await this.groupsVouchersRepository.create({
        group_id: groups.group_id,
        voucher_id: createdVoucher
      })
      this.groupsVouchersRepository.save(saveGroupsVouchers)
    }
    return createdVoucher;

  }


  async checkBucket(s3: S3, bucket: string) {
    try {
      const res = await s3.headBucket({ Bucket: bucket }).promise()
      return { success: true, message: "Bucket already Exist", data: {} };
    } catch (error) {
      return { success: false, message: "Error bucket don't exsit", data: error };

    }
  };

  async createBucket(s3: S3) {
    const params: CreateBucketRequest = {
      Bucket: config.bucket_name,
      CreateBucketConfiguration: {
        // Set your region here
        LocationConstraint: config.aws_region
      }
    }

    try {
      const res = await s3.createBucket(params).promise();
      return { success: true, message: "Bucket Created Successfull", data: res.Location };
    } catch (error) {
      return { success: false, message: "Unable to create bucket", data: error };;

    }
  }

  async initBucket(s3: S3) {
    const bucketStatus = await this.checkBucket(s3, config.bucket_name);
    if (!bucketStatus.success) { // check if the bucket don't exist
      let bucket = await this.createBucket(s3); // create new bucket
    }
  }


  async uploadToS3(s3: S3, fileData?: Express.Multer.File) {
    try {
      const fileContent = fs.readFileSync(fileData!.path);
      const params = {
        Bucket: config.bucket_name,
        Key: fileData!.originalname,
        Body: fileContent
      };

      try {
        const res = await s3.upload(params).promise();
        return { success: true, message: "File Uploaded with Successfull", data: res.Location };
      } catch (error) {
        return { success: false, message: "Unable to Upload the file", data: error };
      }
    } catch (error) {
      return { success: false, message: "Unalbe to access this file", data: {} };
    }
  }


}
