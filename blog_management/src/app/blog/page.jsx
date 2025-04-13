'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteBlog, isAuthenticated, setAuth, blogDummy } from '@/lib/storage';
import Card from '../components/Card';

export default function BlogsPage() {
  const router = useRouter();
  const [blogList, setBlogList] = useState([]);
  
  

  useEffect(() => {
    const auth = isAuthenticated();
    if (!auth) {
      router.push('/login');
    }
  }, []);

  // Retrieve blogs from localStorage (or fallback to dummy data)
   const getBlogs = () => {
    const storedBlogs = localStorage.getItem('blogs');
    const parsedBlogs = JSON.parse(storedBlogs);
    console.log(parsedBlogs)
    setBlogList(parsedBlogs.length===0 ? blogDummy : parsedBlogs);
    //console.log(parsedBlogs)
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleLogout = () => {
    setAuth(false);
    router.push('/login');
  };

  const handleAdd = () => {
    router.push('/addblog');
  };

  

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header with Blog Title and Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 md:mb-0">My Blog</h1>
        <div className="flex space-x-4">
          <button 
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            onClick={handleAdd}
          >
            Add Blog
          </button>
          <button 
            className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      {/* List of Blog Cards */}
      <div className="space-y-8">
        {blogList.map((data, index) => (
          <Card
            index={index}
            title={data.title}
            description={data.description}
            image={data.image}
            getBlogs={getBlogs}
          
          />
        ))}
      </div>
    </div>
  );
}
