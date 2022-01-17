export interface ElementDetailsProps {
  element: ElementComponents;
  type: string;
  updateElement: (newName: string, newDesc: string, newPict: string) => void;
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
