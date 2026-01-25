export abstract class BucketService {
    abstract uploadFiles(files: Express.Multer.File[], userId: number): Promise<{ dbUrl: string; signedUrl: string }[]>;
    abstract deleteFile(filePath: string): Promise<void>;
    abstract getFile(filePath: string, expiresInSeconds?: number): Promise<string>;
    abstract getFilesForUser(userId: string): Promise<string[]>;
}