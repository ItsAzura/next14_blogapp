import mongoose from 'mongoose';

let isConnected = false;

const connectToDb = async () => {
  mongoose.set('strictQuery', true);
  if (isConnected) {
    console.log('using existing database connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'blogApp',
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    isConnected = true;
    console.log('MongoDB connection success');
  } catch (error) {
    console.log('MongoDB connection failed');
    console.error(`Error: ${error.message}`);
  }
};

export default connectToDb;
