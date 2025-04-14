"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";
import { saveUser } from "@/lib/storage";
import BeforeLoginNavbar from "../components/BeforeLoginNavbar";
import { useRouter } from "next/navigation";

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
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Signup = () => {
  const router = useRouter();

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
      saveUser(values);
      toast.success("Signup Successful");
      router.push("/login");
    },
  });

  return (
    <>
      <BeforeLoginNavbar />
      <div className=" flex items-center py-4 justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-5 bg-white p-10 rounded-xl shadow-lg">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Create an Account
            </h2>
            <p className="mt-1 text-center text-sm text-gray-600">
              Sign up to get started!
            </p>
          </div>
          <form className="mt-5 space-y-3" onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              {/* First Name */}
              <div className="w-full md:w-1/2">
                <label htmlFor="firstName" className="sr-only">
                  First Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...formik.getFieldProps("firstName")}
                  />
                </div>
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="mt-1 text-red-500 text-sm">
                    {formik.errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="w-full md:w-1/2">
                <label htmlFor="lastName" className="sr-only">
                  Last Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...formik.getFieldProps("lastName")}
                  />
                </div>
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="mt-1 text-red-500 text-sm">
                    {formik.errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email in its own row */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...formik.getFieldProps("email")}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-red-500 text-sm">
                  {formik.errors.email}
                </p>
              )}
            </div>
              {/* Password */}
              <div className="w-full ">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...formik.getFieldProps("password")}
                  />
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-red-500 text-sm">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="w-full ">
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...formik.getFieldProps("confirmPassword")}
                  />
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <p className="mt-1 text-red-500 text-sm">
                    {formik.errors.confirmPassword}
                  </p>
                )}
              </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                Signup
              </button>
            </div>
          </form>
          {/* Login Redirect */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Login here
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
