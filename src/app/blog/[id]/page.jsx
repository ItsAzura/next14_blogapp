'use client';
import Loading from '@/app/components/loading/Loading';
import React, { useState, useEffect } from 'react';
import styles from './blogdetails.module.css';
import EditBtn from '@/app/components/editbtn/EditBtn';
import DeleteBtn from '@/app/components/deletebtn/DeleteBtn';

const DetailBlogPage = ({ params }) => {
  console.log(params);

  //Cài đặt Loading state để kiểm tra xem dữ liệu đã được fetch chưa
  const [loading, setLoading] = useState(true);
  //Cài đặt state để lưu blog
  const [blog, setBlog] = useState({});

  //Cài đặt state để kiểm tra xem có đang edit blog không
  const [isEditing, setIsEditing] = useState(false);
  //Cài đặt state để lưu title mới
  const [newTitle, setNewTitle] = useState('');
  //Cài đặt state để lưu content mới
  const [newContent, setNewContent] = useState('');

  //Hàm fetch blog bằng id
  const handleFetchBlog = async () => {
    try {
      //Fetch blog bằng id
      const res = await fetch(`/api/getblog?_id=${params.id}`);

      //Kiểm tra xem fetch có thành công không
      if (res.ok) {
        const { data } = await res.json();
        setBlog(data);
        setNewTitle(data.title);
        setNewContent(data.content);
      } else {
        console.error('Failed to fetch blog');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setLoading(false);
    }
  };

  //Hàm xử lý edit blog
  const handleEditBlog = async () => {
    //Kiểm tra xem title và content có rỗng không
    if (!newTitle || !newContent) {
      console.error('Title and content cannot be empty');
      return;
    }

    try {
      //Fetch để update blog
      const res = await fetch('/api/updateblog', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          //Gửi id, title, content mới
          _id: blog._id,
          title: newTitle,
          content: newContent,
        }),
      });

      //Kiểm tra xem update có thành công không
      if (res.ok) {
        const { data } = await res.json();
        setBlog(data);
        setIsEditing(false);
      } else {
        console.error('Failed to update blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  //Sử dụng useEffect để fetch blog khi component được render và khi params.id thay đổi
  useEffect(() => {
    handleFetchBlog();
  }, [params.id]);

  if (loading) return <Loading />;

  return (
    <div className={styles.container}>
      {/* Kiểm tra xem có đang edit không */}
      {isEditing ? (
        //Nếu đang edit thì render form edit
        <div className={styles.form}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)} //Lưu title mới vào state
          />
          <label htmlFor="content">Content</label>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)} //Lưu content mới vào state
            cols={30}
            rows={10}
          />
          <button onClick={handleEditBlog}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        //Nếu không đang edit thì render thông tin blog
        <>
          <h1>{blog.title}</h1>
          <p>{blog.content}</p>
          <p>Created At: {new Date(blog.createdAt).toLocaleString()}</p>
          <p>Updated At: {new Date(blog.updatedAt).toLocaleString()}</p>
          <div className={styles.groupBtn}>
            <EditBtn onClick={() => setIsEditing(true)} />
            <DeleteBtn
              blogId={blog._id}
              onDelete={() => (window.location.href = '/blog')}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DetailBlogPage;
