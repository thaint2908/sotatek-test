import React, {useEffect, useRef, useState} from "react";
import "./ItemForm.scss";
import {getLocalDate} from "../../util/dateUtils";
import {SubmitHandler, useForm} from "react-hook-form";
import {useCreateTaskMutation, useUpdateTaskMutation } from "../../services/tasks/tasks";

interface PropsType {
    id?:string;
    title?: string;
    editMode?: boolean;
    description?: string;
    dueDate?: string;
    priority?: string;
    onSuccess?: () =>void;
}

interface ItemFormValue {
    title?: string;
    description?: string;
    dueDate?: string;
    priority?: string;

}

const ItemForm = (props: PropsType) => {
    const today = getLocalDate(new Date());
    const dateRef = useRef<HTMLInputElement | null>(null);
    const [updateTask,{isLoading:updating}] = useUpdateTaskMutation();
    const [createTask,{isLoading:creating}] = useCreateTaskMutation();
    const [inputTitle, setInputTitle] = useState<string | undefined>(props.title);
    const {register, handleSubmit,formState:{errors}} = useForm<ItemFormValue>({
        defaultValues:{
            title: props.title ?? "",
            description:props.description ?? "",
            dueDate: props.dueDate? props.dueDate.split('T')[0] : today,
            priority: props.priority ?? "normal",
        }
    });
    const {ref,...rest} = register("dueDate");
    const onSubmit: SubmitHandler<ItemFormValue> =  async (data) => {
        try {
            if(props.editMode){
                await updateTask({id:props.id,body:data}).unwrap();
            }else {
                await createTask(data).unwrap();
            }
        } catch (err) {
            console.log(err)
        } finally {
            props.onSuccess?.();
        }
    }
    useEffect(() => {
        dateRef.current?.setAttribute("min", today);
    }, [today]);
    return (
        <form className="item-form" onSubmit={handleSubmit(onSubmit)}>
            <input {...register("title", {required: true})}/>
             {errors.title && <span className="error">This field is required</span>}
            <label>Description</label>
            <textarea {...register("description")} id="description" name="description" rows={8}/>
            <div className="input-group">
                <div className="input-date">
                    <label>Due Date</label>
                    <input {...rest}  ref={(e) => {
                        ref(e)
                        dateRef.current = e
                    }}
                           type="date" min={today}/>
                </div>
                <div className="input-priority">
                    <label>Priority</label>
                    <select  {...register("priority")}>
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>
            <button type="submit" className="btn" disabled={updating||creating}>{props.editMode? "Update":"Add" }</button>
        </form>
    );
};
export default ItemForm;
