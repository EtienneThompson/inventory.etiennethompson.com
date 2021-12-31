import { ReactNode } from "react";

export interface RowProps {
  justify?: "start" | "center" | "end";
  align?: "start" | "center" | "end";
  children: ReactNode;
}

export interface PropStyles {
  justifyContent?: string;
  alignItems?: string;
}