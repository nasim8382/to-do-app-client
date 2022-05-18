import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddTask from './Pages/AddTask/AddTask';
import AllTasks from './Pages/AllTasks/AllTasks';
import Login from './Pages/Login/Login/Login';
import SignUp from './Pages/Login/SignUp/SignUp';
import Header from './Pages/Shared/Header/Header';

function App() {
  return (
    <div className='main-body'>
      <Header></Header>
      <Routes>
        <Route path="/" element={<AddTask></AddTask>}></Route>
        <Route path="/addtask" element={<AddTask></AddTask>}></Route>
        <Route path="/alltasks" element={<AllTasks></AllTasks>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
}

export default App;
