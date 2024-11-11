import { useEffect, useState } from 'react'
import EditDialog from './EditModal';
import DeleteModal from './DeleteModal';

function TaskItem({ title, description, id }) {
  const [checkedTasks, setCheckedTasks] = useState([]);
  const [status, setStatus] = useState(false);
 
   useEffect(() => {
    const storedCheckedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    setCheckedTasks(storedCheckedTasks);
    setStatus(true)
  }, [status]);

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
              <p className='text-sm text-slate-600'>{description}</p>
            </div>
            
            <div className='flex space-x-4 '>
                <DeleteModal label={title} id={id}/>
                <EditDialog title={title} description={description} id={id} />
            </div>
           
        </div>
        <hr />
    </div>
    
  )
}

export default TaskItem