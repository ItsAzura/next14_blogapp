'use client';
import React from 'react';
import styles from './BlogOverView.module.css';
import Link from 'next/link';

const BlogOverView = () => {
  return (
    <div className={styles.btnAdd}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2"
        />
      </svg>
      <Link href="/blog/addblog">Add Blog</Link>
    </div>
  );
};

export default BlogOverView;
