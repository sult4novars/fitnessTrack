import { __prod__ } from './utils';

export * from './cloudinary';
export * from './token';
export * from './routes';
export * from './utils';
export * from './limits';

export const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.mouep.mongodb.net/?retryWrites=true&w=majority`;

export const DOMAIN = __prod__ ? process.env.NEXT_PUBLIC_DOMAIN : 'http://localhost:3000';
