import { ReactNode } from "react";

export interface ContainerProps {
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}
