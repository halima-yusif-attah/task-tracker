import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog"
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { MdModeEdit } from "react-icons/md";


function EditDialog({description, title, id}) {
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [show, setShow] = useState(false);
  const [pending, setPending] = useState(false);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      setPending(true);
      await updateDoc(doc(db, "tasks", id), {
        title: editTitle,
        description: editDescription,
      });
      setPending(false);
      setShow(false);
      setEditTitle("");
      setEditDescription("");
    } catch (error) {
      alert(error.message);
    } finally {
      setPending(false);
      setShow(false);
      setEditTitle("");
      setEditDescription("");
      
    }
  }

 
  return (
    <Dialog className="flex flex-col space-y-4" open={show} onOpenChange={setShow} >
  <DialogTrigger className=''><button><MdModeEdit size={25} /></button></DialogTrigger>
  <DialogContent>
    <form onSubmit={handleEdit} className='flex flex-col space-y-4 p-2'>


      <input  type="text" placeholder="Enter title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className='w-full p-4 border border-slate-400 rounded-md' minLength={4} maxLength={50} required/>
      <textarea  id="description" name="description" rows={10} columns={30} value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className='w-full p-4 border rounded-md border-slate-400' placeholder="Enter task description" required minLength={4} maxLength={150}>Add description</textarea>
      
      <div className="flex items-center space-x-4 p-4 ml-auto">
      <button onClick={() => setShow(false)} className='px-4 py-2 border rounded-md border-slate-60 bg-slate-200' >Cancel</button>
      <button type="sub,it" disabled={pending} className='px-4 py-2 border rounded-md border-blue-400 bg-blue-600 text-white' >{pending ? "submitting..." : "Save"}</button>
      </div>
    
   </form>
     
  </DialogContent>
    </Dialog>
  )
}

export default EditDialog;