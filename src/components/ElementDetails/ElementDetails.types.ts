export interface ElementDetailsProps {
  element: ElementComponents;
  type: string;
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
