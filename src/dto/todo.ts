

import { Rule, RuleType } from '@midwayjs/decorator';

export class ITodoItem {
  @Rule(RuleType.string().required())
  title: string;

  @Rule(RuleType.number().required())
  priority: number;

  @Rule(RuleType.number())
  status: number;
}

export class IPatchTodoItem {
  @Rule(RuleType.string())
  title: string;

  @Rule(RuleType.number())
  priority: number;

  @Rule(RuleType.number())
  status: number;
}

