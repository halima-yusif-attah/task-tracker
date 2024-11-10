import { deleteDoc, doc } from "firebase/firestore";
import React, { createContext, useState } from "react";
import { db } from "../firebase/firebase";

export const DeleteContext = createContext();

function DeleteModalProvider({children}) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selected, setSelected] = useState("");

    const handleDelete = async (id) => {
      setSelected(id);
      try {
        await deleteDoc(doc(db, "tasks", id));
        setShowDeleteModal(false);
      } catch (error) {
        alert(error.message);
      }
    };

    const value = {
      selected,
      setSelected,
      setShowDeleteModal,
      handleDelete,
      showDeleteModal,
    }

  return (
    <DeleteContext.Provider value={value}>
        {children}
    </DeleteContext.Provider>
  )
}

export default DeleteModalProvider;