import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "root",
    "database": "sotatek",
    // "entities": ["dist/**/*.entity{.ts,.js}"],
    autoLoadEntities:true,
    "synchronize": true
  }),TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
