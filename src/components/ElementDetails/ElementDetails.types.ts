import { BreadcrumbDetails } from "../../types";
import Memo from "../../utils/memoization";

export interface ElementDetailsProps {
  memo: Memo;
  element: ElementComponents;
  breadcrumb: BreadcrumbDetails | undefined;
  type: string;
  updateElement: (
    newName: string,
    newDesc: string,
    newPict: string,
    updated: string
  ) => void;
  moveChild?: () => void;
  numChildren?: number;
}

export interface ElementComponents {
  folderid?: string;
  itemid?: string;
  name: string;
  picture: string;
  description: string;
  parent_folder: string;
  created: string;
  updated: string;
}

export interface DeleteRequest {
  folderid?: string;
  itemid?: string;
}
