import React from "react";
import { Col } from "../../components/common/Grid";
import "./404Error.scss";

export const Error404 = () => {
  document.title = "Etienne Thompson - Inventory System - 404 Not Found";
  document.documentElement.className = "theme-light";

  return (
    <div className="error-404-container">
      <Col>
        <h1 className="error-404-title">404 - Not Found</h1>
        <p className="error-404-description">
          That's not a page on this site! Did you go to the right URL?
        </p>
      </Col>
    </div>
  );
};
