'use client';
import React from 'react';
import styles from './BlogOverView.module.css';
import Link from 'next/link';

const BlogOverView = () => {
  return (
    <div className={styles.container}>
      <div className="">
        <Link href="/blog/addblog">Add Blog</Link>
      </div>
    </div>
  );
};

export default BlogOverView;
