'use client';
import Loading from '@/app/components/loading/Loading';
import React, { useState, useEffect } from 'react';
import styles from './blogdetails.module.css';

const DetailBlogPage = ({ params }) => {
  console.log(params);

  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState({});

  const handleFetchBlog = async () => {
    try {
      //Fetch blog by id
      const res = await fetch(`/api/getblog?_id=${params.id}`); // Updated API endpoint

      //Kiểm tra xem kết quả trả về có thành công không
      if (res.ok) {
        const { data } = await res.json();
        setBlog(data);
      } else {
        console.error('Failed to fetch blog');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchBlog();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className={styles.container}>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p>Created At: {new Date(blog.createdAt).toLocaleString()}</p>
      <p>Updated At: {new Date(blog.updatedAt).toLocaleString()}</p>
    </div>
  );
};

export default DetailBlogPage;
