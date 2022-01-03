import { FunctionComponent } from "react";
import { Row, Col } from "../common/Grid";
import { ElementDetailsProps } from "./ElementDetails.types";
import "./ElementDetails.scss";

export const ElementDetails: FunctionComponent<ElementDetailsProps> = (
  props: ElementDetailsProps
) => {
  return (
    <Row>
      <Col>
        <Row>
          <Col align="start" cols={1}>
            <p className="details">Name: {props.element.name}</p>
            <p className="details">Description: {props.element.description}</p>
          </Col>
          <Col align="center" cols={4}>
            <div>Picture: {props.element.picture}</div>
          </Col>
        </Row>
        <Row>
          <Col align="start">
            <p className="element-time">Created: {props.element.created}</p>
            <p className="element-time">Updated: {props.element.updated}</p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
