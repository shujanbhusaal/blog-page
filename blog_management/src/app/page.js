"use client";
import { useEffect, useState } from "react";
import { blogDummy } from "@/lib/storage";
import Card from "./components/Card";
import BeforeLoginNavbar from "./components/BeforeLoginNavbar";


export default function Home() {


  return (
    <div className="min-h-screen bg-gray-50">
<BeforeLoginNavbar/>     

      <main>
        <section className="text-center py-8 bg-white">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to My Blog</h1>
          <p className="mt-2 text-xl text-gray-600">
            Discover amazing stories and share your passion.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Blogs</h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {blogDummy.map((blog, index) => (
              <Card
                key={index}
                index={index}
                title={blog.title}
                description={blog.description}
                image={blog.image || blog.sampleImage}
                dummy={true}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
