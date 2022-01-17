import Memo from "../../utils/memoization";

export interface ItemProps {
  memo: Memo;
}

export interface ItemDetails {
  itemid: string;
  name: string;
  picture: string;
  description: string;
  parent_folder: string;
  created: string;
  updated: string;
}
