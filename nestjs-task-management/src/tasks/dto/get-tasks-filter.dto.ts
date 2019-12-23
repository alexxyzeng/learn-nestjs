import { TaskStatus } from './../task_model';
export class GetTasksFilterDto {
  status: TaskStatus;
  search: string;
}