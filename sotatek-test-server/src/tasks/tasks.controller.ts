import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {type} from "os";

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  getAllTasks(@Query('title') title:string) {
    return this.tasksService.findAll(title);
  }
  @Get('done')
  findDoneTask(){
    return this.tasksService.findDone();
  }
  @Delete('done')
  removeDoneTasks(){
    return this.tasksService.removeDone();
  }

  @Get(':id')
  getTask(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  removeTask(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
