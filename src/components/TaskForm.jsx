import React, { useContext, useState } from 'react'
import { db } from '../firebase/firebase';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { CreateTaskContext } from '../context/CreateTaskModal';

function TaskForm() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [pending, setPending] = useState(false);

  const { handleShowFormModal, setShowFormModal } = useContext(CreateTaskContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setPending(true);
      await setDoc(doc(collection(db, "tasks")), {
      title,
      text,
      status: "pending",
      timestamp: serverTimestamp(),
    })
      setPending(false);
      setShowFormModal(false);
      setTitle("");
      setText("");
      
      
    } catch (error) {
      throw new Error(`Error creating a task`, error)
    }finally {
      setPending(false);
      setShowFormModal(false);
      setTitle("");
      setText(""); 
    }
    
  }


  return (
    <div className="h-[100vh] flex w-full items-center justify-center">
   <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col border border-slate-700 rounded-md space-y-4 w-fit p-8'>


      <input  type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} className='w-full p-4 border border-slate-400 rounded-md' minLength={4} maxLength={50} required/>
      <textarea  id="description" name="description" rows={10} columns={30} value={text} onChange={(e) => setText(e.target.value)} className='w-full p-4 border rounded-md border-slate-400' placeholder="Enter task description" required minLength={4} maxLength={150}>Add description</textarea>
      
      <div className="flex items-center space-x-4 p-4 ml-auto">
      <button onClick={() => handleShowFormModal()} className='px-4 py-2 border rounded-md border-slate-60 bg-slate-200' >Cancel</button>
      <button type="submit" disabled={pending} className='px-4 py-2 border rounded-md border-slate-600 bg-[green] text-white' >Create</button>
      </div>
    
   </form>
   </div>
  )
}

export default TaskForm