import { useRef } from "react"
import css from "./AddNewCat.css"
import { useDispatch } from "react-redux"
import { addNewCategory } from "../reduxe/categories"

export default function AddNewCat(){
    const dispatch = useDispatch()
    const CateName = useRef()
    const addCat=(event)=>{
        event.preventDefault()
        dispatch(addNewCategory(CateName.current.value))
    }
    return(
        <div className="main_area_add_cat">
             <form onSubmit={addCat}>
             <div className="form_area">
                    <div className="input_area">
                        <label for="CateName" >Task Name :</label>
                        <input type="text" id="taskName" ref={CateName} placeholder="Task" required/>
                    </div> 
                    <div className="input_area"> 
                        <button>Add</button>
                    </div>
                </div>
             </form>
        </div>
    )
}