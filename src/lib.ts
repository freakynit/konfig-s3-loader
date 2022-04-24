import {contracts} from 'konfig';
import {PathLike} from 'fs';
import AWS, {S3} from 'aws-sdk';

export type S3Config = {
    accessKeyId: string,
    secretAccessKey: string,
    region: string
};

export type S3ConfigOrClient = {
    s3Config?: S3Config,
    s3?: S3
}

const parseS3BucketKey = (s3Path: string): {Bucket: string, Key: string} => {
    const bucketAndKeyString: string = s3Path.indexOf('s3://') > -1
        ? s3Path.split('s3://')[1]
        : s3Path.split('S3://')[1];
    const bucketAndKey: string[] = bucketAndKeyString.split('/');
    return {Bucket: bucketAndKey[0], Key: bucketAndKey[1]}
}

export const S3Provider = (s3ConfigOrClient: S3ConfigOrClient, encoding: BufferEncoding = 'utf8'): contracts.Loader => {
    if(!s3ConfigOrClient.s3Config && !s3ConfigOrClient.s3) {
        throw new Error(`One of s3Config or s3 client needs to be supplied`);
    }
    const s3 = s3ConfigOrClient.s3 ? s3ConfigOrClient.s3 : new AWS.S3({...s3ConfigOrClient.s3Config});

    return {
        async load(uri: PathLike): Promise<string> {
            const response: any = await s3.getObject(parseS3BucketKey(uri as string)).promise();
            return Buffer.from(response.Body).toString(encoding);
        }
    };
};
