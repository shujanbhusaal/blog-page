"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { saveBlog } from "@/lib/storage";
import BlogForm from "../components/BlogForm";
import Navbar from "../components/Navbar";


export default function AddBlogPage() {
  const router = useRouter();

  const initialValues = { title: "", description: "", image: null };

  const handleSubmit = (blogData, resetForm) => {
    try {
      saveBlog(blogData);
      toast.success("Blog saved successfully!");
      resetForm();
      router.push("/blog");
    } catch (error) {
      toast.error("Error in saving blog");
    }
  };

  const handleCancel = () => {
    router.push("/blog");
  };

  return (
    <>
    <Navbar/>
    <div className=" bg-gray-100 flex justify-center  py-5 px-4 sm:px-6 lg:px-8">
      <BlogForm
        initialValues={initialValues}
        onSubmitClicked={handleSubmit}
        onCancel={handleCancel}
        buttonText="Submit Blog"
      />
    </div>
    </>
   
  );
}
