import { useNavigate } from "react-router-dom"
import css from "./NewTaskAdd.css"
import { useDispatch, useSelector } from "react-redux"
import { useRef } from "react"
import { addNewTask } from "../reduxe/dataslice"

export default function NewTaskAdd(){
    const categoryList = useSelector((state)=>state.catogories.value)
    const dispatch = useDispatch();

    const taskNameBox = useRef();
    const taskCatogoryBox = useRef();
    const taskDescriptionBox = useRef();

    const navigate = useNavigate()
    const backToHome=()=>{
        navigate("/")
    }

    const addTask=(event)=>{
        event.preventDefault();
        const currentDate = new Date()
        const taskObject = {
            taskName : taskNameBox.current.value,
            description : taskDescriptionBox.current.value,
            category : taskCatogoryBox.current.value,
            lastEdit : currentDate.toLocaleDateString()
        }
        dispatch(addNewTask(taskObject));
        event.target.reset()
    }
    return(
        <>
            <button onClick={backToHome}>Home</button>
            <h1>new taskData</h1>
            <form onSubmit={addTask}>
                <div className="form_area">
                    <div className="input_area">
                        <label for="taskName" >Task Name :</label>
                        <input type="text" id="taskName" ref={taskNameBox} placeholder="Task" required/>
                    </div> 

                    <div className="input_area">
                        <label for="taskCat" >Category :</label>
                            <select ref={taskCatogoryBox} id="taskCat">
                                <option value={""}>Select Category</option>
                                {categoryList.map(cat=><option value={cat}>{cat}</option>)}
                            </select>
                    </div> 

                    <div className="input_area"> 
                        <label for="taskDisc" >Description :</label>
                            <textarea id="taskDisc" ref={taskDescriptionBox} placeholder="Description" required/>
                    </div> 
                    <div className="input_area"> 
                        <button>Add</button>
                    </div>
                </div>
            </form>
        </>
    )
}