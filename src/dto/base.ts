import { Rule, RuleType } from '@midwayjs/decorator';

export class IListParam {
  @Rule(RuleType.number().default(1))
  pageNum: number;

  @Rule(RuleType.number().default(10))
  pageSize: number;
}

export class IResponser {
  code: number;
  msg: string;
  data: any;

  constructor(code: number, msg: string, data: any) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

}