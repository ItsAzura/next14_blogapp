import connectToDb from '@/database/db';
import { NextResponse } from 'next/server';
import Blog from '@/models/blog';

//Hàm xử lý delete blog
export const DELETE = async (req, res) => {
  try {
    //Kết nối với database
    await connectToDb();
    //Lấy _id từ body
    const { _id } = await req.json();

    //Kiểm tra xem _id có rỗng không
    if (!_id) {
      return NextResponse.json({ error: 'Missing _id' }, { status: 400 });
    }

    //Tìm blog bằng _id và xóa
    const deletedBlog = await Blog.findByIdAndDelete(_id);

    //Kiểm tra xem blog có xóa thành công không
    if (deletedBlog) {
      return NextResponse.json(
        { message: 'Blog deleted successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to delete blog' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Error deleting blog' }, { status: 500 });
  }
};
