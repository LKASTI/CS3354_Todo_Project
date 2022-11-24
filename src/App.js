import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import AccountRegistration from './pages/AccountRegistration';
import AccountConfirmation from './pages/AccountConfirmation'; 
import {useState, useContext, createContext} from 'react'
import Home from './pages/Home';
import TodoList from './pages/TodoList';
import CreateTask from './pages/CreateTask'

export const AppContext = createContext()

function App() {
  const [username, setUsername] = useState("")
  const [taskList, setTaskList] = useState([])
  const [points, setPoints] = useState(0)
  
  return (
    
    
    <div className="App">
      <AppContext.Provider value={{username, setUsername,taskList, setTaskList, points, setPoints}}>
        <Router>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<AccountRegistration/>}/>
            <Route path="/confirmation" element={<AccountConfirmation/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/todolist" element={<TodoList/>}/>
            <Route path="/task-creation" element={<CreateTask/>}/>
            <Route path="*" element={<h1>ERROR 404 PAGE NOT FOUND</h1>}/>
          </Routes>
        </Router>
      </AppContext.Provider>
      
    </div>
  );
}

export default App;
