import { Redis } from '@upstash/redis';
import https from 'https';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL ?? '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN ?? '',
  agent: new https.Agent({ keepAlive: true })
});

export default redis;
