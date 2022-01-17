import { MemoInterface } from "../types";

export default class Memo {
  memo: MemoInterface;

  constructor() {
    this.memo = {};
  }

  retrieveFromMemo(id: string): any {
    if (this.memo[id]) {
      return this.memo[id];
    } else {
      return null;
    }
  }

  addToMemo(id: string, value: any): void {
    this.memo[id] = value;
  }
}
