import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {TaskRepository} from "./repository/task.repository";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class TasksService {
  constructor(
      @InjectRepository(TaskRepository) private taskRepository: TaskRepository
  ) {}
  async  create(createTaskDto: CreateTaskDto) {
    console.log(createTaskDto);
    return this.taskRepository.save(createTaskDto);
  }

  async findAll(title?:string) {
    if(title){
      return this.taskRepository.getTasksByTitle(title);
    }
    return this.taskRepository.find({
      order:{
        dueDate:"ASC",
      }
    });
  }

  async findOne(id: string) {
    const task =  await this.taskRepository.findOne(id);
    if(task){
      return task
    }else{
      throw new NotFoundException();
    }
  }
  async findDone(){
    return this.taskRepository.getDoneTasks();
  }
  async removeDone(){
    return this.taskRepository.delete({
      isDone:true,
    })
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const {title,description,dueDate,priority,isDone} = updateTaskDto;
    let taskUpdate = {};
    await this.findOne(id);
    if(title){
      taskUpdate = {
        ...taskUpdate,
        title,
      }
    }
    if(description){
      taskUpdate = {
        ...taskUpdate,
        description,
      }
    }
    if(dueDate){
      taskUpdate = {
        ...taskUpdate,
        dueDate,
      }
    }
    if(priority){
      taskUpdate = {
        ...taskUpdate,
        priority,
      }
    }
    if(isDone !=null){
      taskUpdate = {
        ...taskUpdate,
        isDone,
      }
    }
    console.log(taskUpdate);
    return this.taskRepository.update(id,taskUpdate);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.taskRepository.delete(id);
  }
}
