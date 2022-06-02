import React from "react";
import { BreadcrumbProps } from "./Breadcrumb.types";
import "./Breadcrumb.scss";

export const Breadcrumb: React.FunctionComponent<BreadcrumbProps> = (
  props: BreadcrumbProps
) => {
  return (
    <div className="breadcrumb-container">
      {props.names.map((name, index) => {
        return (
          <div
            className="breadcrumb-item-container"
            key={`breadcrumb-item-${index}`}
          >
            <div
              className="breadcrumb-item-name"
              onClick={() =>
                props.onNameClick &&
                props.onNameClick(props.values[index], props.types[index])
              }
            >
              {name}
            </div>
            {index !== props.names.length - 1 && (
              <div className="breadcrumb-item-separator">&nbsp;&gt;&nbsp;</div>
            )}
          </div>
        );
      })}
    </div>
  );
};
