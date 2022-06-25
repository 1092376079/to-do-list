import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import MyError from '../common/my-err';
import { IPatchTodoItem, ITodoItem } from '../dto/todo';
import { TodoEntity } from '../entity/todo.entity';

@Provide()
export class TodoService {

  @InjectEntityModel(TodoEntity)
  todoModel: Repository<TodoEntity>;

  async list(pageNum: number, pageSize: number) {
    let [list, count] = await this.todoModel.findAndCount({
      order: { createdTime: "DESC" },
      take: pageSize,
      skip: (pageNum - 1) * pageSize
    });
    return { list, count };
  }

  async update(id: number, todo: ITodoItem) {
    let todoItem = new TodoEntity();
    todoItem.title = todo.title;
    todoItem.priority = todo.priority;
    await this.todoModel.update(id, todoItem);
    return true
  }

  async check(id: number, todo: IPatchTodoItem) {
    let param = new TodoEntity();
    param.id = id;
    if (todo.priority) {
      param.priority = todo.priority;
    }
    if (todo.status) {
      param.status = todo.status;
    }
    if (todo.title) {
      param.title = todo.title;
    }
    let exist = await this.todoModel.findOne(param);
    console.log(exist);
    if (exist == null) {
      throw new MyError('todo不存在', 400);
    }
    exist.status = 1;
    await this.todoModel.update(id, exist);
    return true
  }

  async create(todo: ITodoItem) {
    let todoItem = new TodoEntity();
    todoItem.title = todo.title;
    todoItem.priority = todo.priority;
    todoItem.status = 0;
    const result = await this.todoModel.save(todoItem);
    return result;
  }

  async remove(id: number) {
    await this.todoModel.delete({ id: Number(id) });
    return true;
  }
}
