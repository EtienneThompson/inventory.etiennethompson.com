import { FunctionComponent } from "react";
import { Row, Col, Container } from "../../common/Grid";
import { LoadingDetailsProps } from "./LoadingDetails.types";
import "./LoadingDetails.scss";

export const LoadingDetails: FunctionComponent<LoadingDetailsProps> = (
  props: LoadingDetailsProps
) => {
  return (
    <Row>
      <Col className="details-skeleton-container">
        <Row justify="start">
          <div className="details-skeleton-general details-skeleton-second-descriptor details-skeleton-loading"></div>
        </Row>
        <Row justify="end">
          <div className="details-skeleton-general details-skeleton-button details-skeleton-loading"></div>
          <div className="details-skeleton-general details-skeleton-button details-skeleton-loading"></div>
          <div className="details-skeleton-general details-skeleton-button details-skeleton-loading"></div>
        </Row>
        <Container className="details-skeleton-layout">
          <Col cols={4}>
            <div className="details-skeleton-general details-skeleton-image-placeholder details-skeleton-loading"></div>
          </Col>
          <Col cols={1}>
            <Row>
              <Col align="start" cols={1}>
                <div className="details-skeleton-general details-skeleton-main-descriptor details-skeleton-loading"></div>
                <div className="details-skeleton-general details-skeleton-main-descriptor details-skeleton-loading"></div>
              </Col>
            </Row>
            <Row justify="start">
              <div className="details-skeleton-general details-skeleton-second-descriptor details-skeleton-loading"></div>
              <div className="details-skeleton-general details-skeleton-second-descriptor details-skeleton-loading"></div>
            </Row>
          </Col>
        </Container>
        {props.showChildren && (
          <>
            <Row justify="end">
              <div className="children-skeleton-general children-skeleton-button children-loading"></div>
            </Row>
            <Row className="children-skeleton-overflow">
              <Col>
                {[1, 2].map((child, index) => (
                  <Row
                    key={`loading-child-${index}`}
                    className="children-skeleton-child-container"
                  >
                    <Col align="start" cols={1}>
                      <div className="children-skeleton-general children-skeleton-name children-loading"></div>
                    </Col>
                    <Col cols={4}>
                      <div className="children-skeleton-general children-skeleton-picture children-loading"></div>
                    </Col>
                  </Row>
                ))}
              </Col>
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
};
