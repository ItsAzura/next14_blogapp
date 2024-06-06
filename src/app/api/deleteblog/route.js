import connectToDb from '@/database/db';
import { NextResponse } from 'next/server';
import Blog from '@/models/blog';

export const DELETE = async (req, res) => {
  try {
    await connectToDb();
    const { _id } = await req.json();
    if (!_id) {
      return NextResponse.json({ error: 'Missing _id' }, { status: 400 });
    }

    const deletedBlog = await Blog.findByIdAndDelete(_id);
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
