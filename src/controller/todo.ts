import { Inject, Controller, Post, Provide, Query, Get, Put, Patch, ALL, Body, Del, Param } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IPatchTodoItem, ITodoItem } from '../dto/todo';
import { TodoService } from '../service/todo';
import { Validate } from '@midwayjs/decorator';
import { IListParam } from '../dto/base';

import { BaseController } from './base';

@Provide()
@Controller('/api/todos')
export class TodoController extends BaseController{
  @Inject()
  ctx: Context;

  @Inject()
  protected service: TodoService;

  @Get('/', {summary: '分页获取todo列表', description: '' })
  @Validate()
  async getTodos(@Query(ALL) queryParam: IListParam) {
    const { pageNum, pageSize } = queryParam;
    const res = await this.service.list(pageNum, pageSize);
    return this.success(res);
  }

  @Put('/:id', {summary: '修改指定todo', description: '' })
  @Validate()
  async putTodo(@Param('id') id: number, @Body(ALL) todo: ITodoItem) {
    const res = await this.service.update(id, todo);
    return this.success(res);
  }


  @Patch('/:id', {summary: '标记完成', description: '' })
  async checkTodo(@Param('id') id: number, todo: IPatchTodoItem) {
    const res = await this.service.check(id, todo);
    return this.success(res);
  }


  @Post('/', {summary: '新增todo', description: '' })
  @Validate()
  async createTodo(@Body(ALL) todo: ITodoItem) {
    const res = await this.service.create(todo);
    return this.success(res);
  }

  @Del('/:id', {summary: '删除指定todo', description: '' })
  async removeTodo(@Param('id') id: number) {
    const res = await this.service.remove(id);
    return this.success(res);
  }     
}
