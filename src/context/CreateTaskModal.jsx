import React, { createContext, useState } from 'react'

export const CreateTaskContext = createContext();

function CreateTaskProvider({ children }) {

  const [showFormModal, setShowFormModal] = useState(false);

  const handleShowFormModal = () => {
    setShowFormModal(!showFormModal);
  }

  const value = {
    showFormModal,
    handleShowFormModal,
   
  }


  return (
    <CreateTaskContext.Provider value={value}>{children}</CreateTaskContext.Provider>
  )
}

export default CreateTaskProvider