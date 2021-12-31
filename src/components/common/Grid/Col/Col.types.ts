import { ReactNode } from "react";

export interface ColProps {
  cols?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  justify?: "start" | "center" | "end";
  align?: "start" | "center" | "end";
  children?: ReactNode;
}

export interface PropsStyles {
  justifyContent?: string;
  alignItems?: string;
}
