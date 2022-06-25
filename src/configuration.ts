import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as orm from '@midwayjs/orm';

@Configuration({
  imports: [
    orm,
  ],
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {
    // const coreMiddlewareArr = this.app.getConfig('coreMiddleware') as string[]
    const coreMiddlewareArr = this.app.config.coreMiddleware as string[];

    // 增加全局错误处理中间件（确保在最前）
    coreMiddlewareArr.splice(0, 0, 'errorHandlerMiddleware');
  }
}
