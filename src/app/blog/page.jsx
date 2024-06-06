'use client';
import React, { useEffect } from 'react';
import BlogOverView from '../components/blogOverView/BlogOverView';
import Loading from '../components/loading/Loading';
import { useState } from 'react';
import Link from 'next/link';
import styles from './blog.module.css';
import EditBtn from '../components/editbtn/EditBtn';

const blogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFetchBlogs = async () => {
    try {
      const res = await fetch('/api/getblogs');
      const data = await res.json();
      if (data.data) {
        setBlogs(data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchBlogs();
  }, []);

  if (loading) return <Loading />;

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
