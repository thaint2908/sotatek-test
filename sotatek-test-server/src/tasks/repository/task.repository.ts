import {EntityRepository, ILike, Repository} from "typeorm";
import {Task} from "../entities/task.entity";
import {CreateTaskDto} from "../dto/create-task.dto";
import {InternalServerErrorException} from "@nestjs/common";
import {UpdateTaskDto} from "../dto/update-task.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasksByTitle(title:string): Promise<any> {
        try {
            let findQuery = {};
            console.log(typeof title);
             const tasks = await this.find({
                 order:{
                   dueDate:"ASC",
                 },
                where:{
                    title: ILike(`%${title}%`),
                },
            });
            return tasks;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
    async getDoneTasks():Promise<any>{
        try {
            return  await this.find({
                where:{
                    isDone:true,
                }
            })
        }catch (err){
            throw new InternalServerErrorException(err);
        }
    }
}