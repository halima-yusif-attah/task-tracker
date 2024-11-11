import { useContext, useEffect, useState } from "react";
import TaskItem from "./TaskItem"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { CreateTaskContext } from "../context/CreateTaskModal";
import TaskForm from "./TaskForm";
import { DeleteContext } from "../context/DeleteModalContext";
import DeleteModal from "./DeleteModal";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState('');
  
  const { showFormModal, handleShowFormModal, setShowFormModal } = useContext(CreateTaskContext);
  const { showDeleteModal, selected } = useContext(DeleteContext)

  useEffect(() => {
    setLoading(true);

    const taskRef = collection(db, "tasks");
    const orderedQuery = query(taskRef,(orderBy('timestamp', 'asc')));

    onSnapshot(orderedQuery, (snapshot) => {
      let task = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
              
      let completed = JSON.parse(localStorage.getItem("completedTasks")) || [];

      task.forEach((t) => {
      if (completed.includes(t.id)) {
        t.status = "completed";  
      } else {
        t.status = "pending";   
      }
    });
    console.log("task", task);
    localStorage.setItem("TaskData", JSON.stringify(task));
    setTasks(task)
      
})
   setLoading(false);
  },[])

  
  if (loading) {
    return <h1>Loading</h1>
  }

  const handleFilter = (e) => {
    const statusSelected = e.target.value.toLowerCase();
    setFilteredData(statusSelected);
  };


  return (
    <>
     {showFormModal && <TaskForm />}
     {showDeleteModal &&
      tasks.map((item) => (
        item.id === selected &&
       ( <DeleteModal key={item.id} id={item.id} label={item.title} />)
      ))
      }

     {!showFormModal && !showDeleteModal &&
    <div className="h-[100vh]">
      <div className='bg-gray-500 w-full flex p-8 items-center '>
            <select name="tasks" id="" defaultValue="" onChange={handleFilter} className="w-[20%] p-2 bg-[white-smoke] rounded-md">
              <option value="">Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
        
            <button className='border rounded-md border-slate-600 bg-[white] p-2  ml-auto' onClick={() => setShowFormModal(true)}>Create a task</button>

        </div>
      {tasks.length === 0 && (
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
     }
    </>
  )
}

export default TaskList