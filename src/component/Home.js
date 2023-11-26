import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import css from "./Home.css"
import { useRef, useState } from "react"
import { deleteTaskFromStore } from "../reduxe/dataslice"
import { editTaskInStore } from "../reduxe/edittaskslice"
import AddNewCat from "./AddNewCat"

import { CiSearch } from "react-icons/ci";

const itemsPerPage = 10;

export default function Home() {
    const taskList = useSelector(state=>state.tasks.value)
    const [isMenueVisible,setMenuVisible] = useState(true)

    const [isAddCatVisible,setAddCatVisible] = useState(true)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const newTaskPage=()=>{
        navigate("/add-new-task")
    }

    const showMenu=(task,index)=>{
        if(index==isMenueVisible) 
            setMenuVisible(-1)
        else setMenuVisible(index)
    }

    const deleteTask=(task)=>{
        dispatch(deleteTaskFromStore(task.taskName))
    }

    let curr_task = useSelector(state=>state.currEditTask.value)
    
    const editTask=(task)=>{
        dispatch(editTaskInStore(task));
        navigate("/edit-task")
    }

    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    let currentItems = taskList.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(taskList.length / itemsPerPage);

    const AddNewCatFuc = ()=>{
        setAddCatVisible(!isAddCatVisible)
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const [isChange,setChange] = useState(false);

    const handleSortChange = (event) => {
        const criteria = event.target.value;
        setChange(!isChange);

        currentItems = sortTasks(criteria);
    };

    const sortTasks = (criteria) => {
        return currentItems.sort((a, b) => {
            if (criteria === "default") {
                return 0;
            }

            if (a[criteria] < b[criteria]) {
                return -1;
            }

            if (a[criteria] > b[criteria]) {
                return 1;
            }

            return 0;
        });
    };
    let searchData = useRef({value:""})
    var checkDate=(ob)=>{
        var snm = searchData.current.value
        if(snm.length==0) return true
        if(snm == ob.taskName.toString().slice(0,snm.length)) return true
        if(snm == ob.category.toString().slice(0,snm.length)) return true
        if(snm == ob.lastEdit.toString().slice(0,snm.length)) return true
        return false
      }

    return(
        <>
            <div className="main_page_haeader">
                <div className="header_section">
                    <button onClick={newTaskPage}>New Task</button>
                </div>
                <div className="header_section_search">
                    <CiSearch />
                    <input type="text" onChange={()=>setChange(!isChange)} ref={searchData} placeholder="Search By task/category/date"/>
                </div>
                <div className="header_section">
                    {isAddCatVisible ? 
                        <button onClick={AddNewCatFuc}>Add Category</button>
                    :
                        <button onClick={AddNewCatFuc}>Cancel</button>
                    }
                </div>
                <div className="header_section">
                    Sort By :
                    <select onChange={handleSortChange}>
                        <option value={"default"}>default</option>
                        <option value={"taskName"}>Name</option>
                        <option value={"lastEdit"}>Date</option>
                        <option value={"category"}>category</option>
                    </select>
                </div>
            </div>
            <div hidden={isAddCatVisible} className="add_cat_area">
                <AddNewCat/>
            </div>
            <div className="task_div_main_area">
                {currentItems.filter(ob=>checkDate(ob)).map(task=><div className="task_div">
                        <div className="task_div_header">
                            <h3>{task.taskName}</h3>
                            <i>{task.lastEdit}</i>
                        </div>
                        <b>{task.category}</b>
                        <div className="task_div_disc">{task.description}</div>
                    </div>)}
            </div>
            <div className="table_area">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>Sr. no.</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.filter(ob=>checkDate(ob)).map((task,index)=><tr onClick={()=>showMenu(task,index)}>
                            <td>{index+1}</td>
                            <td>
                                {task.taskName}<br/>
                                <i>Last Edit : {task.lastEdit}</i>
                            </td>
                            <td>{task.category}</td>
                            <td>{task.description}</td>
                            <td><button onClick={()=>editTask(task)}>Edit</button> </td>
                            <td><button onClick={()=>deleteTask(task)}>Delete</button> </td>
                        </tr>
                        )}
                    </tbody>
                </table>

                <div>
                    {Array.from({ length: totalPages }).map((_, index) => (
                    <button key={index} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                    ))}
                </div>
            </div>
        </>
    )
}