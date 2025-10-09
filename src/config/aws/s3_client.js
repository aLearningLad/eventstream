const https = require("https");
const {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_APP_ACCESS_KEY,
    secretAccessKey: process.env.AWS_APP_SECRET_ACCESS_KEY,
  },

  requestHandler: {
    httpsAgent: new https.Agent({
      keepAlive: true,
      family: 4, // Force IPv4
    }),
  },
});

module.exports = s3Client;
