import connectToDb from '@/database/db';
import { NextResponse } from 'next/server';
import Blog from '@/models/blog';

export const GET = async (req, res) => {
  try {
    await connectToDb();
    const blogs = await Blog.find();
    if (blogs) {
      return NextResponse.json(
        { message: 'Success', data: blogs },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Failed to fetch blogs' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
