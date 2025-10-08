const {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

const s3Client = new S3Client({});

const postMedia = async (req, res) => {
  res.status(200).json({ message: "Yuuup, this route works fiiiiine!" });
};

module.exports = postMedia;
