import { FunctionComponent } from "react";
import { Row, Col } from "../../common/Grid";
import { LoadingDetailsProps } from "./LoadingDetails.types";
import "./LoadingDetails.scss";

export const LoadingDetails: FunctionComponent<LoadingDetailsProps> = (
  props: LoadingDetailsProps
) => {
  return (
    <Row>
      <Col className="details-skeleton-container">
        <Row justify="end">
          <div className="details-skeleton-general details-skeleton-button details-skeleton-loading"></div>
          <div className="details-skeleton-general details-skeleton-button details-skeleton-loading"></div>
          <div className="details-skeleton-general details-skeleton-button details-skeleton-loading"></div>
        </Row>
        <Row>
          <Col cols={1}>
            <Row>
              <Col align="start" cols={1}>
                <div className="details-skeleton-general details-skeleton-main-descriptor details-skeleton-loading"></div>
                <div className="details-skeleton-general details-skeleton-main-descriptor details-skeleton-loading"></div>
              </Col>
            </Row>
            <Row>
              <Col align="start">
                <div className="details-skeleton-general details-skeleton-second-descriptor details-skeleton-loading"></div>
                <div className="details-skeleton-general details-skeleton-second-descriptor details-skeleton-loading"></div>
              </Col>
            </Row>
          </Col>
          <Col cols={4}>
            <div className="details-skeleton-image-placeholder loading"></div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
