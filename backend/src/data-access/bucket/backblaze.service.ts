import { ConfigService } from "@nestjs/config";
import { BucketService } from "./bucket.service";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import pLimit from "p-limit";

@Injectable()
export class BackBlazeService extends BucketService {
  private client: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    super();
    const bucketUrl = this.configService.get<string>("BUCKET_URL");
    const bucketRegion = this.configService.get<string>("BUCKET_REGION");
    const bucketName = this.configService.get<string>("BUCKET_NAME");
    const accessKeyId = this.configService.get<string>("BUCKET_KEY_ID");
    const secretAccessKey = this.configService.get<string>("BUCKET_APP_KEY");
    if (
      !bucketUrl ||
      !bucketRegion ||
      !accessKeyId ||
      !secretAccessKey ||
      !bucketName
    ) {
      throw new Error("BackBlaze bucket configuration is missing");
    }
    this.client = new S3Client({
      endpoint: bucketUrl,
      region: bucketRegion,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
    this.bucketName = bucketName;
  }

  async uploadFiles(files: Express.Multer.File[], userId: number): Promise<{ dbUrl: string; signedUrl: string }[]> {
    const limit = pLimit(5);
    return Promise.all(
      files.map((file) =>
        limit(async () => {
          const safeName = file.originalname.replace(/\s+/g, "_");
          const destinationPath = `${userId}/${safeName}`;
          const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: destinationPath,
            Body: file.buffer,
            ContentType: file.mimetype,
          });
          await this.client.send(command);

          const dbUrl = `b2://${this.bucketName}/${destinationPath}`;
          const signedUrl = await this.getFile(dbUrl, 60 * 60);
          return {
            dbUrl,
            signedUrl
          };
        })
      )
    );
  }

  async getFile(dbUrl: string, expiresInSeconds = 60 * 5): Promise<string> {
    const { bucket, key } = this.parseDbUrl(dbUrl);

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    return getSignedUrl(this.client, command, { expiresIn: expiresInSeconds });
  }

  private parseDbUrl(dbUrl: string) {
    if (!dbUrl.startsWith("b2://")) throw new Error("Invalid B2 URL");

    const withoutScheme = dbUrl.replace("b2://", "");
    const firstSlash = withoutScheme.indexOf("/");
    const bucket = withoutScheme.substring(0, firstSlash);
    const key = withoutScheme.substring(firstSlash + 1);

    return { bucket, key };
  }

  async getFilesForUser(userId: string): Promise<string[]> {
    throw new Error("Method not implemented.");
  }

   async deleteFile(dbUrl: string): Promise<void> {
    const { bucket, key } = this.parseDbUrl(dbUrl);

    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    await this.client.send(command);
  }
}
