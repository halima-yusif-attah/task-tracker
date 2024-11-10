import React from 'react'
import TaskList from './components/TaskList'
import CreateTaskProvider from './context/CreateTaskModal'
import DeleteModalProvider from './context/DeleteModalContext'

function App() {
  return (
    
    <CreateTaskProvider>
      <DeleteModalProvider>
       <TaskList />
      </DeleteModalProvider>
    </CreateTaskProvider>
   
  )
}

export default App