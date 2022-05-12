import { MongoClient } from 'mongodb';
import handler from '../pages/api/auth/signup';

export async function connectToDatabase() {
    console.log ("User is ",process.env.DB_PASSWORD);
  const client = await MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ztdrz.mongodb.net/?retryWrites=true&w=majority`);

  return client;
}

