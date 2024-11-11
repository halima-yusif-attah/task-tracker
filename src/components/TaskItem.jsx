import { useContext, useEffect, useState } from 'react'
import { CgTrash } from "react-icons/cg";
import { MdModeEdit } from "react-icons/md";
import { db } from '../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { DeleteContext } from '../context/DeleteModalContext';
import { CreateTaskContext } from '../context/CreateTaskModal';

function TaskItem({ title, description, id }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(description);
  const [checkedTasks, setCheckedTasks] = useState([]);
  const [status, setStatus] = useState(false);

  const { setShowDeleteModal, setSelected } = useContext(DeleteContext)
  const { setShowFormModal } = useContext(CreateTaskContext);

   useEffect(() => {
    const storedCheckedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    setCheckedTasks(storedCheckedTasks);
    setStatus(true)
  }, [status]);

  const handleEdit = async () => { 
   try {
     await updateDoc(doc(db, "tasks", id), {
        text: editText,
      })
      setShowFormModal(false);
   } catch (error) {
     alert(error.message)
   }finally{
    setIsEditing(false)
   }
  }

  const showDeleteModal = () => {
    setSelected(id);
    setShowDeleteModal(true);
  }


  const handleCheckedTasks = (e) => {
    const checked = e.target.checked;
    setStatus(checked);
    
    let completedTaskIds = JSON.parse(localStorage.getItem('completedTasks')) || [];
    if (checked) {
      if (!completedTaskIds.includes(id)) {
        completedTaskIds.push(id);
      }
    } else {
      completedTaskIds = completedTaskIds.filter(taskId => taskId!== id);
    }

    setCheckedTasks(completedTaskIds);
    localStorage.setItem('completedTasks', JSON.stringify(completedTaskIds));
    
  }

  return (
    <div className='w-full flex flex-col p-8'>
        
        <div className='flex items-center bg-[white] w-full justify-between mb-2'>
            <div className='flex w-full space-y-4 flex-col'>
            <div className="flex items-center space-x-4">
              <input type="checkbox" className={`size-8`} checked={checkedTasks.includes(id)}
                onChange={handleCheckedTasks} />
              <p className='text-xl font-semibold capitalize'>{title}</p>
            </div>
              {isEditing ?  (
                <div className="flex flex-col space-y-2 items-center">
                  <textarea name="" id="" value={editText} onChange={(e) => setEditText(e.target.value)} rows={5} columns={10} minLength={4} maxLength={150} required className='w-full p-4 border rounded-md border-slate-400'></textarea>
                  <div className="flex space-x-2">
                    <button type="button" onClick={()=> setIsEditing(false)} className='px-6 py-2 border rounded-md border-slate-60 bg-slate-200 w-fit' >Cancel</button>
                    <button type="button" onClick={()=> handleEdit()} className='px-6 py-2 border rounded-md border-slate-60 bg-slate-600 w-fit' >Save</button>

                  </div>
                  
                </div>
                )
              :
              (<p className='text-sm text-slate-600'>{description}</p>)
              }
            
           
            </div>
            

             {!isEditing &&
            <div className='flex space-x-4 '>
                <button type="submit" onClick={() => showDeleteModal()}><CgTrash size={25}/></button>
                <button onClick={() => setIsEditing(true)}><MdModeEdit size={25} /></button>
            </div>
           }
        </div>
        <hr />
    </div>
    
  )
}

export default TaskItem