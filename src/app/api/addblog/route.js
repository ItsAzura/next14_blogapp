import connectToDb from '@/database/db';
import Blog from '@/models/blog';
import { NextResponse } from 'next/server';
import Joi from 'joi';

//Tạo schema để validate dữ liệu
const AddNewBlog = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

//Hàm này sẽ được gọi khi có request POST tới /api/addblog
export const POST = async (req, res) => {
  try {
    //Kết nối tới database
    await connectToDb();

    //Lấy dữ liệu từ request
    const extractBlogData = await req.json();
    const { title, content } = extractBlogData;

    //Kiểm tra dữ liệu
    const { error } = AddNewBlog.validate({ title, content });

    if (error) {
      return NextResponse.json(
        { message: error.details[0].message },
        { status: 400 }
      );
    }

    //Tạo mới một bài viết
    const newBlog = await Blog.create(extractBlogData);

    //Kiểm tra xem tạo mới thành công không?
    if (newBlog) {
      return NextResponse.json(
        { message: 'Blog added successfully' },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: 'Failed to add blog' },
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
