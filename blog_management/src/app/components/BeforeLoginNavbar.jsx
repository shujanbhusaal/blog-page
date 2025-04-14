import React from 'react'
import Link from "next/link";


const BeforeLoginNavbar = () => {
  return (
    <header className="bg-white shadow">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex-shrink-0">
          <Link href="/">
            <span className="text-2xl font-bold text-blue-600">My Blog</span>
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/login" className="text-blue-600 hover:text-blue-800">
            Login
          </Link>
          <Link href="/signup" className="text-blue-600 hover:text-blue-800">
            Register
          </Link>
        </div>
      </div>
    </div>
  </header>
  )
}

export default BeforeLoginNavbar