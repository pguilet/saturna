const S3 = require('aws-sdk/clients/s3');
const keys = require('../config/keys');
const fs = require('fs');
const s3 = new S3({
     region: keys.awsBucketRegion,
     accessKeyId: keys.awsAccessKey,
     secretAccessKey: keys.awsSecretKey,
});

function uploadFile(file) {
     const fileStream = fs.createReadStream(file.path);

     const uploadParams = {
          Bucket: keys.awsBucketName,
          Body: fileStream,
          Key: file.filename
     };

     return s3.upload(uploadParams).promise();
}

function removeFile(fileKey) {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
         Bucket: keys.awsBucketName,
         Key: file.filename
    };

    return s3.deleteObject(uploadParams).promise();
}

function getFileStream(fileKey){
     const downloadParams = {
          Key:fileKey,
          Bucket:keys.awsBucketName
     }
     return s3.getObject(downloadParams).createReadStream()
}

exports.removeFile = removeFile;
exports.uploadFile = uploadFile;
exports.getFileStream = getFileStream;
