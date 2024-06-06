import React from 'react';
import styles from './DeleteBtn.module.css';
import Link from 'next/link';

const DeleteBtn = ({ blogId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const res = await fetch('/api/deleteblog', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: blogId }),
      });
      if (res.ok) {
        onDelete();
      } else {
        console.error('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };
  return (
    <div className={styles.editBtn} onClick={handleDelete}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
        />
      </svg>
      <p>Delete Blog</p>
    </div>
  );
};

export default DeleteBtn;
