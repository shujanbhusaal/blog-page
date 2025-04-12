"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import { saveUser,getUsers } from "@/lib/storage";

// Validation Schema
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters")
    .required("First name is required"),

  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters")
    .required("Last name is required"),

  email: Yup.string().email("Enter a valid email").required("Email is required"),

  password: Yup.string()
    // .min(8, "Password must be at least 8 characters")
    // .max(50, "Password must be less than 50 characters")
    // .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    // .matches(/[a-z]/, "Must contain at least one lowercase letter")
    // .matches(/[0-9]/, "Must contain at least one number")
    // .matches(/[@$!%*?&]/, "Must contain at least one special character (@$!%*?&)")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log(values)
      saveUser(values);
     // localStorage.setItem("signupData", JSON.stringify(values));
      toast.success("Signup Successful")
    },
  });

  return (
    <div className="p-6 max-w-md mx-auto bg-white border border-gray-200 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Create an Account</h2>

      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="firstName"
              type="text"
              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              {...formik.getFieldProps("firstName")}
            />
          </div>
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            id="lastName"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            {...formik.getFieldProps("lastName")}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="email"
              type="email"
              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              {...formik.getFieldProps("email")}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="password"
              type="password"
              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              {...formik.getFieldProps("password")}
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            {...formik.getFieldProps("confirmPassword")}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Signup
        </button>
      </form>

      {/* Login Redirect */}
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login here</Link>.
      </p>
    </div>
  );
};

export default Signup;
