import React, { useContext } from "react";
import { DeleteContext } from "../context/DeleteModalContext";

function DeleteModal({id, label}) {

  const { setShowDeleteModal, handleDelete } = useContext(DeleteContext);

  return (
    <div className="w-full h-[100vh] bg-gray-800 flex items-center justify-center">
      <div className="w-[50%] border border-slate-400 bg-slate-400 p-4 flex space-y-2 flex-col">
        
          <h2 className="text-md">{`Are you sure you want to delete this ${label}?`}</h2>
          <p>This action is irrevisible!</p>
          <div className="flex ml-auto space-x-2">
            <button
              type="button"
              className="bg-rose-600 px-6 py-2 border rounded-md w-fit text-white"
              onClick={() => handleDelete(id)}
            >
              Delete
            </button>
            <button
              type="button"
              className="bg-slate-400 px-6 py-2 border rounded-md w-fit text-white"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
          
        </div>
      </div>
    </div>
  );
}

export default DeleteModal