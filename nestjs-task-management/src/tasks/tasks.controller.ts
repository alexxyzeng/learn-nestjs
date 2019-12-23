import { CreateTaskDto } from './dto/create-task_dto';
import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task_model';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) { }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    return this.taskService.getTasksWithFilters(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.taskService.updateTaskStatus(id, status)
  }
}
