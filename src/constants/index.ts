import { __prod__ } from './utils';

export * from './cloudinary';
export * from './token';
export * from './routes';
export * from './utils';
export * from './limits';

//export const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@instagram-clone.ho9r4.mongodb.net/instagram-clone?retryWrites=true&w=majority`;
export const MONGODB_URI = `mongodb://127.0.0.1:27017/test`;

export const DOMAIN = __prod__ ? process.env.NEXT_PUBLIC_DOMAIN : 'http://localhost:3000';
