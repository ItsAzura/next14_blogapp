'use client';
import React, { useEffect } from 'react';
import BlogOverView from '../components/blogOverView/BlogOverView';
import Loading from '../components/loading/Loading';
import { useState } from 'react';
import Link from 'next/link';
import styles from './blog.module.css';

const blogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  //Hàm fetch tất cả blog từ database
  const handleFetchBlogs = async () => {
    try {
      //Fetch để lấy tất cả blog
      const res = await fetch('/api/getblogs');
      //Kiểm tra xem fetch có thành công không
      const data = await res.json();
      //Kiểm tra xem fetch có thành công không
      if (data.data) {
        setBlogs(data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Gọi hàm handleFetchBlogs khi component được render
  useEffect(() => {
    handleFetchBlogs();
  }, []);

  if (loading) return <Loading />; //Nếu đang fetch thì hiển thị loading

  return (
    <div className={styles.mainContainer}>
      <div className={styles.groupTitle}>
        <h1>All Blogs</h1>
        <BlogOverView />
      </div>

      <div className={styles.container}>
        {blogs.map((blog) => (
          <Link href={`/blog/${blog._id}`} key={blog._id}>
            <h3>{blog.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default blogPage;
