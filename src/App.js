import { Route, Routes } from "react-router-dom";
import NewTaskAdd from "./component/NewTaskAdd";
import Home from "./component/Home";
import EditTask from "./component/EditTask";
import AddNewCat from "./component/AddNewCat";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/add-new-task" element={<NewTaskAdd/>} />
        <Route path="/" element={<Home/>} />  
        <Route path="/edit-task" element={<EditTask/>} />              
        <Route path="/add-cat" element={<AddNewCat/>} />              
      </Routes>
    </>
  );
}