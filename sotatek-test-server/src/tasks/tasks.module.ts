import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Task} from "./entities/task.entity";
import {TaskRepository} from "./repository/task.repository";

@Module({
  imports:[ TypeOrmModule.forFeature([Task,TaskRepository])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
