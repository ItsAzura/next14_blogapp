'use client';
import React from 'react';
import styles from './AddBlog.module.css';
import { useRouter } from 'next/navigation';

const AddBlog = () => {
  const router = useRouter(); //Lấy router để chuyển hướng trang

  //Hàm xử lý submit form
  const handleSubmit = async (e) => {
    //Ngăn chặn form reload trang
    e.preventDefault();
    //Lấy title và content từ form
    const title = e.target.title.value;
    const content = e.target.content.value;

    try {
      //Fetch để thêm blog mới
      const req = await fetch('/api/addblog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      const res = await req.json();

      if (req.ok) {
        console.log('Blog added successfully', res);
        router.push('/blog');
      } else {
        console.log('Failed to add blog', res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add Blog</h1>
      <form
        action=""
        onSubmit={handleSubmit} //Gọi hàm handleSubmit khi submit form
      >
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" placeholder="Title"></input>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          placeholder="Content"
          cols={30}
          rows={10}
        ></textarea>
        <button
          type="submit"
          value="Submit" //Thêm type và value cho button
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
