import connectToDb from '@/database/db';
import { NextResponse } from 'next/server';
import Blog from '@/models/blog';

export const PUT = async (req, res) => {
  try {
    //Kết nối với database
    await connectToDb();
    //Lấy dữ liệu từ body
    const { _id, title, content } = await req.json();

    //Kiểm tra xem id có tồn tại không
    if (!_id) {
      return NextResponse.json({ message: 'Missing id' }, { status: 400 });
    }

    // Update blog bằng id và trả về blog đã được update
    const updateBlog = await Blog.findByIdAndUpdate(
      _id,
      { title, content, updatedAt: new Date() },
      { new: true }
    );

    //Kiểm tra xem blog đã được update chưa
    if (updateBlog) {
      return NextResponse.json(
        { message: 'Blog updated successfully', data: updateBlog }, // Include updated blog in response
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Failed to update blog' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to update blog' },
      { status: 500 }
    );
  }
};
