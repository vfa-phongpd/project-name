import * as dotenv from 'dotenv';

dotenv.config();


export const config: {
    port: number,
    aws_access_key_id: string,
    aws_secret_access_key: string,
    bucket_name: string,
    aws_region
} = {
    port: Number(process.env.PORT) ?? 3000,
    aws_access_key_id: process.env.AWS_ACCESS_KEY_ID ?? " ",
    aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    bucket_name: process.env.BUCKET_NAME ?? 'phongdt',
    aws_region: process.env.AWS_REGION ?? 'us-east-1'
}