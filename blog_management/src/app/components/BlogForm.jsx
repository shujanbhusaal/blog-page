"use client";
import { useFormik } from "formik";
import * as Yup from "yup";

export const BlogSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be less than 50 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(5, "Description must be at least 5 characters")
    .required("Description is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test("fileSize", "Image must be less than 500KB", (value) => {
      if (!value) return false;

      if (typeof value === "string") {
        const parts = value.split(",");
        if (parts.length !== 2) return false;
        const base64String = parts[1];

        const padding = (base64String.endsWith("==") ? 2 : base64String.endsWith("=") ? 1 : 0);
        const sizeInBytes = base64String.length * 0.75 - padding;

        return sizeInBytes <= 500 * 1024;
      }

      return false;
    }),
});



const BlogForm = ({
  initialValues,
  onSubmitClicked,
  onCancel,
  buttonText = "Submit Blog",
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: BlogSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmitClicked(values, resetForm);
    },
  });



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const imageString = reader.result;
      formik.setFieldValue("image", imageString);
    };
    reader.readAsDataURL(file);
    };
  

  return (
    <div className="max-w-md w-full bg-white p-5 rounded-lg shadow-xl">
      <h2 className="mt-1 text-center text-3xl font-bold text-gray-800">
        {buttonText.includes("Update")
          ? "Edit Blog Post"
          : "Create a Blog Post"}
      </h2>
      <p className="mt-1 text-center text-sm text-gray-600">
        {buttonText.includes("Update")
          ? "Update your blog content."
          : "Share your story with the world."}
      </p>
      <form className="mt-3 space-y-2" onSubmit={formik.handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Blog Title"
              className={`appearance-none relative block w-full px-3 py-2 border ${
                formik.touched.title && formik.errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:z-10 sm:text-sm`}
              {...formik.getFieldProps("title")}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="description" className="sr-only">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Blog Description"
              className={`appearance-none relative block w-full px-3 py-2 border ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              } placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm rounded-md`}
              {...formik.getFieldProps("description")}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>


          <div className="mt-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Image
            </label>
            <div className="mt-1">
              <label
                htmlFor="image"
                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:underline"
              >
                <span>Select a file</span>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageChange}
                />
              </label>
              {formik.values.image &&
                typeof formik.values.image === "object" && (
                  <p className="text-xs text-gray-500">
                    {formik.values.image.name}
                  </p>
                )}
            </div>
            {formik.touched.image && formik.errors.image && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="group relative flex-1 mr-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          >
            {buttonText}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="group relative flex-1 ml-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
