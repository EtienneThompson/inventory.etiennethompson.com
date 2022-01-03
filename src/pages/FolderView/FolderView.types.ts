export interface FolderDetails {
  folderid: string;
  name: string;
  picture: string;
  description: string;
  parent_folder: string;
  created: string;
  updated: string;
  children: ChildDetails[];
}

export interface ChildDetails {
  id: string;
  type: "folder" | "item";
  name: string;
  picture: string;
}
