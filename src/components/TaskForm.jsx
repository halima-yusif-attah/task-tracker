import React, { useState } from 'react'
import { db } from '../firebase/firebase';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"


function TaskForm() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [pending, setPending] = useState(false);

  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    try {   
      await setDoc(doc(collection(db, "tasks")), {
      title,
      text,
      status: "pending",
      timestamp: serverTimestamp(),
    })
      setPending(false);
      setShow(false);
      setTitle("");
      setText("");
      
      
    } catch (error) {
      throw new Error(`Error creating a task`, error)
    }finally {
      setPending(false);
      setShow(false);
      setTitle("");
      setText(""); 
    }
    
  }


  return (  
    <Dialog className="flex flex-col space-y-4" open={show} onOpenChange={setShow} >
  <DialogTrigger className='mb-2'>create task</DialogTrigger>
  
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="text-xl pl-2 capitalize">
    Create a new task
  </DialogTitle>
    </DialogHeader>

    <form onSubmit={handleSubmit} className='flex flex-col space-y-4 p-2'>
      <input  type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} className='w-full p-4 border border-slate-400 rounded-md' minLength={4} maxLength={50} required/>
      <textarea  id="description" name="description" rows={10} columns={30} value={text} onChange={(e) => setText(e.target.value)} className='w-full p-4 border rounded-md border-slate-400' placeholder="Enter task description" required minLength={4} maxLength={150}>Add description</textarea>
      
      <div className="flex items-center space-x-4 p-4 ml-auto">
      <button onClick={() => setShow(false)} className='px-4 py-2 border rounded-md border-slate-60 bg-slate-200' >Cancel</button>
      <button type="submit" disabled={pending} className='px-4 py-2 border rounded-md border-blue-400 bg-blue-600 text-white' >{pending ? "submitting..." : "Create"}</button>
      </div>
    
   </form>
     
  </DialogContent>
    </Dialog>

  )
}

export default TaskForm