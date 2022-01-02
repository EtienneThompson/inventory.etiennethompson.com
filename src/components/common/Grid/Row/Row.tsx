import { FunctionComponent } from "react";
import { RowProps, PropStyles } from "./Row.types";
import "./Row.scss";

export const Row: FunctionComponent<RowProps> = (props: RowProps) => {
  const propStyles = (): PropStyles => {
    let styles = {} as PropStyles;
    if (props.justify) {
      styles.justifyContent = props.justify;
    }
    if (props.align) {
      styles.alignItems = props.align;
    }
    return styles;
  };

  return (
<<<<<<< HEAD
    <div
      className={`row-container ${props.className}`}
      style={propStyles()}
      onClick={() => props.onClick && props.onClick()}
    >
=======
    <div className={`row-container ${props.className}`} style={propStyles()}>
>>>>>>> master
      {props.children}
    </div>
  );
};
