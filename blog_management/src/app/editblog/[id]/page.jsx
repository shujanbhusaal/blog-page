"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { getBlogs, updateBlog } from "@/lib/storage";
import BlogForm from "@/app/components/BlogForm";
import Navbar from "@/app/components/Navbar";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id;
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const blogs = getBlogs();
    const foundBlog = blogs.find((blog) => blog.id.toString() === blogId);
    if (foundBlog) {
      setBlogPost(foundBlog);
    } else {
      toast.error("Blog not found.");
      router.push("/blog");
    }
    setLoading(false);
  }, [blogId, router]);

  const handleSubmit = (blogData) => {
    const updatedData = {
      id: blogPost.id,
      ...blogData,
    };


    try {
      updateBlog(updatedData);
      toast.success("Blog updated successfully!");
      router.push("/blog");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Error updating blog");
    }
  };

  const handleCancel = () => {
    router.push("/blog");
  };

  if (loading || !blogPost) {
    return (
      <div className="flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  const initialValues = {
    title: blogPost.title || "",
    description: blogPost.description || "",
    image: blogPost.image || null,
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 flex justify-center py-5 px-4 sm:px-6 lg:px-8">
        <BlogForm
          initialValues={initialValues}
          onSubmitClicked={handleSubmit}
          onCancel={handleCancel}
          buttonText="Update Blog"
        />
      </div>
    </>
  );
}
