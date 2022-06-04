import { MemoInterface } from "../types";

export default class Memo {
  memo: MemoInterface;

  constructor() {
    this.memo = {};
  }

  get(id: string): any {
    if (this.memo[id]) {
      return this.memo[id];
    } else {
      return null;
    }
  }

  add(id: string, value: any): void {
    this.memo[id] = value;
  }

  delete(id: string): void {
    if (this.memo[id]) {
      delete this.memo[id];
    }
  }
}
