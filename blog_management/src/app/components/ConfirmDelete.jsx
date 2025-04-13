import React from 'react'

const ConfirmDelete = ({ onCancel, onConfirm ,index}) => {
  return (
    <div className="fixed inset-0 bg-black  bg-opacity-10 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          Are you sure you want to delete?
        </h2>
        <p className="text-gray-700 mb-6">
          This action cannot be undone. Please confirm if you would like to proceed with deleting.
        </p>
        <div className="flex justify-center space-x-5">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={()=>onConfirm(index)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDelete
