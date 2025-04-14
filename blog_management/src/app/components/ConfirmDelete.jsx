import React from 'react';

const ConfirmDelete = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed w-full inset-0 bg-transparent bg-opacity-10 flex justify-center items-center z-50">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-11/12 md:w-1/2">
        <h3 className="text-xl font-bold text-blue-600 mb-4">Confirm Deletion</h3>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete this blog? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
