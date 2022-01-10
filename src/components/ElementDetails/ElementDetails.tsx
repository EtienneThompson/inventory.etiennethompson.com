import { FunctionComponent } from "react";
import { useNavigate } from "react-router";
import { Button } from "../common/Button";
import { Row, Col } from "../common/Grid";
import { ElementDetailsProps, DeleteRequest } from "./ElementDetails.types";
import api from "../../api";
import "./ElementDetails.scss";

export const ElementDetails: FunctionComponent<ElementDetailsProps> = (
  props: ElementDetailsProps
) => {
  const navigate = useNavigate();

  const onDeleteButtonClicked = () => {
    let deleteData = {} as DeleteRequest;
    if (props.type === "folder" && props.element.folderid) {
      deleteData.folderid = props.element.folderid;
    } else if (props.type === "item" && props.element.itemid) {
      deleteData.itemid = props.element.itemid;
    } else {
      return;
    }
    api
      .delete(`/inventory/${props.type}/delete`, { data: deleteData })
      .then((response) => {
        // Since the item no longer exists, navigate the user back to the
        // parent folder.
        navigate(`/folder/${props.element.parent_folder}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Row>
      <Col>
        <Row justify="end">
          {(!props.numChildren || props.numChildren === 0) && (
            <Button onClick={onDeleteButtonClicked}>Delete</Button>
          )}
          <Button>Edit</Button>
        </Row>
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
