export enum LocalStorageKey {
  ClientId = "ClientId",
  IsUser = "IsUser",
  IsAdmin = "IsAdmin",
}

export interface MemoInterface {
  [key: string]: any;
}

export interface BreadcrumbDetails {
  names: string[];
  values: string[];
  types: string[];
}
