import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { ERROR_RESPONSE } from 'src/common/custom-exceptions';
import { FILE, FILE_SIZE, TYPE_FILE } from 'src/common/enum/file.enum';
import { ErrorCustom } from 'src/common/error-custom';

// Multer configuration
export const multerConfig = {
    dest: process.env.UPLOAD_LOCATION,
};

// Multer upload options
export const multerOptionsCreateVouchers = {
    // Enable file size limits
    limits: {
        fileSize: FILE_SIZE.FILE_SIZE_REQUIRE
    },
    // Check the mimetypes to allow for upload
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
    // Storage properties
    storage: diskStorage({
        // Destination storage path details
        destination: FILE.DISTINATION,
        filename: (req: any, file: any, cb: any) => {
            cb(null, `${file.originalname}`)
        },
    }),
};

export const multerOptionsUploadVouchers = {
    // Enable file size limits
    limits: {
        fileSize: FILE_SIZE.FILE_SIZE_REQUIRE
    },
    // Check the mimetypes to allow for upload
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
    // Storage properties
    storage: diskStorage({
        // Destination storage path details
        destination: FILE.UPLOAD_DISTINATION,
        filename: (req: any, file: any, cb: any) => {
            const timestamp = new Date().getTime();
            cb(null, ` ${timestamp}_${file.originalname}`)
        },
    }),
};
