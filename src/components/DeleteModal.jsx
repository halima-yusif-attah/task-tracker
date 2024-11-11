import React, { useState } from "react";
import { CgTrash } from "react-icons/cg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";


function DeleteModal({id, label}) {
  const [pending, setPending] = useState(false);
  const [show, setShow] = useState(false);

    const handleDeleteItem = async (id) => {
      setPending(true);
      try {
        await deleteDoc(doc(db, "tasks", id)); 
        setShow(false);
        setPending(false);
      } catch (error) {
        alert(error.message);
      }finally {
        setShow(false)
        setPending(false);
      }
    };

  return (
    <Dialog open={show} onOpenChange={setShow}>
  <DialogTrigger><button type="submit"><CgTrash size={25}/></button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{`Are you sure you want to delete this ${label}?`}</DialogTitle>
      <DialogDescription>
        This action is irrevisible!
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <button
              type="button"
              className="bg-rose-600 px-6 py-2 border rounded-md w-fit text-white"
              onClick={() => handleDeleteItem(id)}
            >
             {pending? "Deleting..." : "Delete"}
            </button>
            <button
              type="button"
              className="bg-slate-400 px-6 py-2 border rounded-md w-fit text-white"
              onClick={() => {
                console.log("click cancel");
                return setShow(false)
              }}
            >
              Cancel
            </button>
    </DialogFooter>
  </DialogContent>
</Dialog>

  );
}

export default DeleteModal