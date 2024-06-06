import connectToDb from '@/database/db';
import { NextResponse } from 'next/server';
import Blog from '@/models/blog';

//Hàm xử lý fetch tất cả blog
export const GET = async (req, res) => {
  try {
    //Kết nối với database
    await connectToDb();
    //Tìm tất cả blog
    const blogs = await Blog.find();
    //Kiểm tra xem blog nào không
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
