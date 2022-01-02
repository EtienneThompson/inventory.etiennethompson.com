export interface FolderDetails {
  folderid: string;
  name: string;
  picture: string;
  description: string;
  created: string;
  modified: string;
  children: ChildDetails[];
}

export interface ChildDetails {
  id: string;
  type: "folder" | "item";
  name: string;
  picture: string;
}
