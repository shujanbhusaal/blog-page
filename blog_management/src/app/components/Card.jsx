"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import ConfirmDelete from "./ConfirmDelete";
import { deleteBlog } from "@/lib/storage";

const Card = ({ title, description, image, id, fetchBlogs, dummy = true }) => {
  const router = useRouter();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleEdit = () => {
    router.push(`/editblog/${id}`);
  };

  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    deleteBlog(id);
    fetchBlogs();
    setShowConfirmDelete(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-64 object-contain" />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        {!dummy && (
          <div className="flex justify-between">
            <button
              onClick={handleEdit}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition"
            >
              <FiEdit size={20} />
              <span>Edit</span>
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition"
            >
              <FiTrash2 size={20} />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
      {showConfirmDelete && !dummy && (
        <ConfirmDelete
          onCancel={() => setShowConfirmDelete(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default Card;
