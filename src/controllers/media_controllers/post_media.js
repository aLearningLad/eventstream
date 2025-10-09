const {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const generateKey = require("../../utils/generate_key");
const https = require("https");

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

const postMedia = async (req, res) => {
  const cryptoKey = generateKey();

  // get organizer_id
  const { organizer_id, media_file } = req.body || {};

  if (!organizer_id) {
    return res.status(401).json({ message: "Organizer ID field is missing" });
  }

  // const s3_bucket_id = cryptoKey + Date.now().toString();
  const bucket_name = `eventstream-app-kingmaker08`; // --> remember, I created bucket once and then removed the code

  try {
    // add file to this bucket
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket_name,
        Key: "first.txt",
        Body: "Hello there, bruv!",
      })
    );

    // try sending it back as res
    const { Body } = await s3Client.send(
      new GetObjectCommand({
        Bucket: bucket_name,
        Key: "first.txt",
      })
    );

    if (Body) {
      const bodyString = await Body.transformToString();
      res.status(200).json({
        message: "File found, yuuup!",
        content: bodyString,
      });
    } else {
      res
        .status(500)
        .json({ message: "Unable to retrieve newly sent file to AWS S3" });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch item from bucket" });
    console.error("Error fetching item just uploaded: ", error);
  }
};

module.exports = postMedia;
