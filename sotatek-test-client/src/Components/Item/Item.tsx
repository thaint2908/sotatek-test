import React, {useState} from "react";
import "./Item.scss";
import ItemForm from "../ItemForm/ItemForm";
import {useDeleteTaskMutation, useUpdateTaskMutation} from "../../services/tasks/tasks";


interface ItemProps {
    id:string,
    title:string,
    description:string,
    dueDate:string,
    priority:string,
    isDone:boolean,
}

const Item = (props:ItemProps) =>{
    const [showDetail,setShowDetail] = useState<boolean>(false);
    const [updateTask] = useUpdateTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();
    const {id,title,description,dueDate,priority,isDone} = props;
    const toggleShowDetail = () => {
        setShowDetail(prev => !prev);
    };
    const [checkBoxValue,setCheckBoxValue] = useState<boolean>(isDone);
    const handleClickCheckbox = async () =>{
        try {
            const body = {
                isDone:!checkBoxValue,
            }
            await updateTask({id,body}).unwrap();
        }catch (err){
            console.log(err)
        }finally {
            setCheckBoxValue(prev => !prev);
        }
    }

    const handleRemoveItem = async () => {
        try {
            await deleteTask(id).unwrap();
        }catch (err){
            console.log(err)
        }
    };

    return(
        <div className="item">
            <div className="item-header">
                <div className='item-header-title'>
                    <input type="checkbox" checked={checkBoxValue} onClick={handleClickCheckbox}/>
                    <label> {title}</label>
                </div>
                <div className="btn-group">
                    <button className="btn-detail" onClick={toggleShowDetail}>Detail</button>
                    <button className="btn-remove" onClick={handleRemoveItem}>Remove</button>
                </div>
            </div>
            {
                showDetail?
                    <div className='item-form-wrapper'>
                        <ItemForm onSuccess={() =>toggleShowDetail()} id={id} editMode title={title} description={description} dueDate={dueDate} priority={priority} />
                    </div>:null
            }
        </div>
    )
};
export default Item;