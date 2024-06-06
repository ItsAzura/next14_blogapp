import connectToDb from '@/database/db';
import { NextResponse } from 'next/server';
import Blog from '@/models/blog';

export const GET = async (req) => {
  try {
    //kết nối với database
    await connectToDb();
    //lấy ra các tham số truy vấn từ url
    const { searchParams } = new URL(req.url);
    //lấy ra id từ tham số truy vấn
    const id = searchParams.get('_id');

    //kiểm tra xem id có tồn tại không
    if (!id) {
      return NextResponse.json(
        { message: 'Blog ID is required' },
        { status: 400 }
      );
    }

    //tìm blog theo id
    const blog = await Blog.findById(id);

    //kiểm tra xem blog có tồn tại không
    if (blog) {
      return NextResponse.json(
        { message: 'Success', data: blog },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Failed to fetch blog' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
