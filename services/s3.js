const S3 = require('aws-sdk/clients/s3');
const keys = require('../config/keys');
const fs = require('fs');
const s3 = new S3({
     region: keys.awsBucketRegion,
     accessKeyId: keys.awsAccessKey,
     secretAccessKey: keys.awsSecretKey,
});

async function uploadFile(file) {
     try {
          const fileStream = fs.createReadStream(file.pathOrigin);

          const uploadParams = {
               Bucket: keys.awsBucketName,
               Body: fileStream,
               Key: file.pathDestination,
          };

          var result = s3.upload(uploadParams).promise();
     } catch (error) {
          console.log(error);
     }
     return result;
}

function removeFile(fileKey) {
     const uploadParams = {
          Bucket: keys.awsBucketName,
          Key: fileKey,
     };
     try {
          var result = s3.deleteObject(uploadParams).promise();
     } catch (error) {
          console.log(error);
     }
     return result;
}

function getFileStream(fileKey) {
     const downloadParams = {
          Key: fileKey,
          Bucket: keys.awsBucketName,
     };
     try {
          var stream = s3.getObject(downloadParams).createReadStream();
     } catch (error) {
          console.log(error);
     }

     return stream;
}

function getDownloadSignedLink(fileKey) {
     const params = {
          Key: fileKey,
          Bucket: keys.awsBucketName,
     };
     try {
          var url = s3.getSignedUrl('getObject', params);
     } catch (error) {
          console.log(error);
     }

     return url;
}

exports.removeFile = removeFile;
exports.uploadFile = uploadFile;
exports.getFileStream = getFileStream;
exports.getDownloadSignedLink = getDownloadSignedLink;
