import { App, Inject } from '@midwayjs/decorator';
import { Application, Context } from 'egg';
import { IResponser } from '../dto/base';

export abstract class BaseController {
  @App()
  protected app: Application;

  @Inject()
  ctx: Context;

  protected service;

  protected success(data?) {
    this.ctx.status = 200;
    return new IResponser(0, "success", data)
  }
}