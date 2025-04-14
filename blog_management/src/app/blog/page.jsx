"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, setAuth, blogDummy } from "@/lib/storage";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

export default function BlogsPage() {
  const router = useRouter();
  const [blogList, setBlogList] = useState([]);
  const [isDummy,setIsDummy] = useState(true)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  const fetchBlogs = () => {
    const storedBlogs = localStorage.getItem("blogs");
    let parsedBlogs = [];
    try {
      parsedBlogs = JSON.parse(storedBlogs);
    } catch (error) {
      console.error("Error parsing blogs:", error);
    }
    setBlogList(parsedBlogs && parsedBlogs.length > 0 ? parsedBlogs : blogDummy);
    setIsDummy(parsedBlogs && parsedBlogs.length > 0 ? false : true)
  };

  useEffect(() => {
    fetchBlogs();
  }, []);


  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 py-8">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {blogList.map((blog,index) => (
            <Card
              key={index}
              id={blog.id}
              title={blog.title}
              description={blog.description}
              image={blog.image || blog.sampleImage}
              fetchBlogs={fetchBlogs}
              dummy={isDummy}
            />
          ))}
        </div>
      </main>
    </div>
    </>
  
  );
}
