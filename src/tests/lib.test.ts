import * as s3LoaderPlugin from '../lib'

describe('S3 Loader Tests', () => {
    test('Should be able to fetch config from S3', async () => {
        const provider = s3LoaderPlugin.S3Provider({
            s3Config: {
                accessKeyId: process.env.S3_LOADER_AWS_ACCESS_KEY || '',
                secretAccessKey: process.env.S3_LOADER_AWS_ACCESS_KEY_SECRET || '',
                region: process.env.S3_LOADER_REGION || 'us-east-1'
            }
        });

        let fetchedConfig = await provider.load(process.env.S3_LOADER_S3_CONFIG_PATH || '');
        expect(fetchedConfig).toEqual('port: ${PORT:-8001}\nlogLevel: ${LOG_LEVEL:-info}\nlogDirectory: ${LOG_DIRECTORY:-/var/log}\n');
    });
})
