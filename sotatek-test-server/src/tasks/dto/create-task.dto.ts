import {IsNotEmpty} from "class-validator";
import {Priority} from "../entities/task.entity";

export class CreateTaskDto {
    @IsNotEmpty()
    title:string;

    description:string;

    @IsNotEmpty()
    dueDate: Date;

    @IsNotEmpty()
    priority: Priority;

    @IsNotEmpty()
    isDone:boolean;
}
