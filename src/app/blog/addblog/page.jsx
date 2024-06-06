'use client';
import React from 'react';
import styles from './AddBlog.module.css';
import { useRouter } from 'next/navigation';

const AddBlog = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;

    try {
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
      <form action="" onSubmit={handleSubmit}>
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
        <button type="submit" value="Submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
