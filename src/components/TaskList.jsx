import { useEffect, useState } from "react";
import TaskItem from "./TaskItem"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import TaskForm from "./TaskForm";


function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState('');
  
  const [updatedTasks, setUpdatedTasks] =  useState(JSON.parse(localStorage.getItem("completedTasks")) || []);

  useEffect(() => {
 
    let completed = JSON.parse(localStorage.getItem("completedTasks")) || []

    const taskRef = collection(db, "tasks");
    const orderedQuery = query(taskRef,(orderBy('timestamp', 'asc')));

    const unsubscribe = onSnapshot(orderedQuery, (snapshot) => {
      let task = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
    
      task.forEach((t) => {
      if (completed.includes(t.id)) {
        t.status = "completed";  
      } else {
        t.status = "pending";   
      }
    });

    localStorage.setItem("TaskData", JSON.stringify(task));
    setTasks(task)
    setUpdatedTasks(task)
    setLoading(false);
      
  })
   return () => unsubscribe();

  }, [updatedTasks])
 
  const handleFilter = (e) => {
    const statusSelected = e.target.value.toLowerCase();
    setFilteredData(statusSelected);
  };

  return (
    <>
    
    <div className="h-[100vh]">
      <div className='bg-gray-500 w-full flex p-8 items-center '>
            <select name="tasks" id="" defaultValue="" onChange={handleFilter} className="p-2 bg-[white-smoke] rounded-md">
              <option value="">Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
        
            <div className='border rounded-md border-slate-600 bg-[white] p-2  ml-auto'><TaskForm /></div>
            

        </div>

        {loading && (<h1 className="flex items-center justify-center h-full text-xl font-md">Loading...</h1>)}

      {tasks.length === 0 && !loading && (
        <div className="h-full flex items-center justify-center">
          <span className="text-slate-500">No Task created</span>
        </div>
        )}

      {tasks.filter((item) => {
          const isFilteredDataMatch = filteredData
      ? item.status === filteredData.toLowerCase()
      : true;

        return isFilteredDataMatch;
      }).map((task) => (
        <TaskItem key={task.id} title={task.title} description={task.text} id={task.id} />
      ))}
      
    </div>
     
    </>
  )
}

export default TaskList