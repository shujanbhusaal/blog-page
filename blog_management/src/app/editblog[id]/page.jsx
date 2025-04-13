"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'
import { saveBlog } from "@/lib/storage";



const BlogSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be less than 50 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(5, "Description must be at least 5 characters")
    .required("Description is required"),
  image: Yup.mixed().required("Image is required"),
});

const BlogForm = () => {
    const router = useRouter()
  const [imagePreview, setImagePreview] = useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: null,
    },
    validationSchema: BlogSchema,
    onSubmit: (values, { resetForm }) => {
      const blogData = {
        title: values.title,
        description: values.description,
        image: imagePreview,
      };
      try {
        saveBlog(blogData);
        toast.success("Blog saved successfully!");
        resetForm();
        setImagePreview("");
        router.push("/blog");
      } catch (error) {
      
        toast.error("Error in saving blog");
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg border">
      <h2 className="text-2xl font-bold text-center mb-6">Create Blog Post</h2>
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            {...formik.getFieldProps("title")}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {formik.touched.image && formik.errors.image && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
          )}
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded mt-2" />
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
