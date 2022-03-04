import React, {useEffect, useState} from "react";
import "./HomePage.scss";
import ItemForm from "../Components/ItemForm/ItemForm";
import Item from "../Components/Item/Item";
import {useDeleteDoneTasksMutation, useGetDoneTasksQuery, useGetTasksQuery} from "../services/tasks/tasks";


const HomePage = () => {
    const [isToggleActive, setIsToggleActive] = useState(false);
    const [searchValue,setSearchValue] = useState<string>("");
    const [deleteDoneTasks] = useDeleteDoneTasksMutation();
    const  {data} = useGetTasksQuery({title: searchValue});
    const {data:doneTasks} = useGetDoneTasksQuery();
    console.log(doneTasks);

    const handleRemoveDoneTasks = async () => {
        try {
            await deleteDoneTasks().unwrap();
        }catch (err){
            console.log(err)
        }
    };

    return (
        <div className="home-page">
            <div
                className={`new-task__toggle ${isToggleActive ? "active" : ""}`}
                onClick={() => {
                    setIsToggleActive((prev) => !prev);
                }}
            />
            <div className={`new-task center-text ${isToggleActive ? "active" : ""}`}>
                <h5 className="title">New Task</h5>
                <div style={{width: "80%"}}>
                    <ItemForm />
                </div>
            </div>
            <div className="todo-list center-text">
                <h5 className="title">Todo List</h5>
                <div className="list-main">
                    <input className="search-input" placeholder="Search" onChange={(e) =>setSearchValue(e.target.value)}/>
                    <div className="items-wrapper">
                        {data?.map(task => {
                            return <Item key={task.id}
                                         id={task.id.toString()}
                                         title={task.title}
                                         description={task.description}
                                         dueDate={task.dueDate}
                                         priority={task.priority}
                                         isDone={task.isDone}
                            />
                        })
                        }
                    </div>
                </div>
                {
                    doneTasks?.length!==0?
                        <div className="bulk-action">
                            <p>Bulk Action:</p>
                            <div className="btn-group">
                                <button className="btn-done">Done</button>
                                <button className="btn-remove" onClick={handleRemoveDoneTasks}>Remove</button>
                            </div>
                        </div>:null
                }
            </div>
        </div>
    );
};
export default HomePage;
