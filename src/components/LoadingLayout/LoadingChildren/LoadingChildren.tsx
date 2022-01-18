import { FunctionComponent } from "react";
import { Row, Col } from "../../common/Grid";
import { LoadingChildrenProps } from "./LoadingChildren.types";
import "./LoadingChildren.scss";

export const LoadingChildren: FunctionComponent<LoadingChildrenProps> = (
  props: LoadingChildrenProps
) => {
  return (
    <Row>
      <Col>
        <Row justify="end">
          <div className="children-skeleton-button children-loading"></div>
        </Row>
        <Row>
          <Col>
            {[1, 2, 3].map((child, index) => (
              <Row className="children-skeleton-child-container">
                <Col align="start" cols={1}>
                  <div className="children-skeleton-name children-loading"></div>
                </Col>
                <Col cols={4}>
                  <div className="children-skeleton-picture children-loading"></div>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
