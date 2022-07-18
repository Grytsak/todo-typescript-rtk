import React from 'react'
import { Routes, Route } from 'react-router-dom'
import  TasksList  from './features/tasks/TasksList'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import NavigationContainer from './components/NavigationContainer'
import AddNewTask from './features/tasks/AddNewTask'


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/' element={<NavigationContainer />}>
          <Route path='/tasks' element={<><AddNewTask /><TasksList /></>}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
