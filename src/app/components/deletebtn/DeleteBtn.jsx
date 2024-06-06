import React from 'react';
import styles from './DeleteBtn.module.css';
import Link from 'next/link';

const DeleteBtn = ({ blogId, onDelete }) => {
  //Hàm xử lý delete blog
  const handleDelete = async () => {
    try {
      //Fetch để xóa blog
      const res = await fetch('/api/deleteblog', {
        method: 'DELETE', //Phương thức DELETE
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: blogId }), //Gửi _id của blog cần xóa
      });
      //Kiểm tra xem xóa có thành công không
      if (res.ok) {
        onDelete(); //Gọi hàm onDelete để cập nhật lại danh sách blog
      } else {
        console.error('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };
  return (
    <div
      className={styles.editBtn}
      //gọi hàm handleDelete khi click vào nút
      onClick={handleDelete}
    >
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
