import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import ConfirmDelete from "./ConfirmDelete";
import { deleteBlog } from "@/lib/storage";

const Card = ({ title, description, image ,index ,getBlogs }) => {

  const [showConfirmDelete,setShowConfirmDelete] = useState(false)


  const handleEdit = (index) => {
    router.push(`/editblog/${index}`);
  };

  const handleDelete = () => {
         setShowConfirmDelete(true)

  };

  const confirmDelete =(index)=>{
    console.log(index)
      deleteBlog(index);
    getBlogs();
    setShowConfirmDelete(false)
  }

  return (
    <div className="bg-white flex flex-col justify-self-center w-[80%] rounded-xl shadow-md overflow-hidden mb-8 hover:shadow-lg transition-shadow duration-300">
      {/* Rectangular Image */}
     <div className="flex justify-center rounded-lg">
      <img
        src={image}
        alt={title}
        className="w-[700px] h-[500px]  flex" 
      /></div>
      <div className="p-6">
        {/* Large Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
        {/* Paragraph Description */}
        <p className="text-lg text-gray-700 leading-relaxed mb-6">{description}</p>
        {/* Edit and Delete Actions */}
        <div className="flex space-x-6">
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
      </div>
      {
        showConfirmDelete && (
          <ConfirmDelete
            onCancel={()=>setShowConfirmDelete(false)}
            onConfirm={confirmDelete}
            index={index}
          />
        )
      }
    </div>
  );
};

export default Card;
