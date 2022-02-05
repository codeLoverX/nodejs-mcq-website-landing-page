"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadS3 = void 0;
const jwt = require("jsonwebtoken");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const { join } = require('path');
const dotenv = require("dotenv");
const path = join(__dirname, '../env/config.env');
dotenv.config({ path });
const s3 = new aws.S3({
    accessKeyId: process.env.Access_Key_ID,
    secretAccessKey: process.env.Secret_Access_Key,
});
exports.uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.Bucket_Name,
        acl: 'public-read',
        location: 'green-leaf-system',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, file.originalname);
        },
    }),
});
