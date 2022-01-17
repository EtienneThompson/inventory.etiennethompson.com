import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router";
import { Button } from "../common/Button";
import { Row, Col } from "../common/Grid";
import { ElementDetailsProps, DeleteRequest } from "./ElementDetails.types";
import api from "../../api";
import { LoadingSpinner } from "../common/LoadingSpinner";
import "./ElementDetails.scss";

export const ElementDetails: FunctionComponent<ElementDetailsProps> = (
  props: ElementDetailsProps
) => {
  const navigate = useNavigate();
  const [editing, setEditing] = React.useState(false);
  const [editedName, setEditedName] = React.useState("");
  const [editedDesc, setEditedDesc] = React.useState("");
  const [editedPict, setEditedPict] = React.useState<any>(null);
  const [isWaiting, setIsWaiting] = React.useState(false);

  React.useEffect(() => {
    setEditedName(props.element.name);
    setEditedDesc(props.element.description);
  }, [props.element]);

  const resetFields = () => {
    setEditedName(props.element.name);
    setEditedDesc(props.element.description);
    setEditedPict(null);
  };

  const onDeleteButtonClicked = () => {
    setIsWaiting(true);
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
        setIsWaiting(false);
        navigate(`/folder/${props.element.parent_folder}?force_update=true`);
      })
      .catch((error) => {
        console.log(error);
        setIsWaiting(false);
      });
  };

  const onEditButtonClicked = () => {
    setEditing(true);
  };

  const onCancelButtonClicked = () => {
    resetFields();
    setEditing(false);
  };

  const onDoneButtonClicked = () => {
    setIsWaiting(true);
    api
      .put(`/inventory/${props.type}/update`, {
        data: {
          id: !!props.element.folderid
            ? props.element.folderid
            : props.element.itemid,
          name: editedName,
          description: editedDesc,
          picture: editedPict,
        },
      })
      .then((response) => {
        props.updateElement(editedName, editedDesc, editedPict);
        resetFields();
        setEditing(false);
        setIsWaiting(false);
      })
      .catch((error) => {
        console.log(error);
        resetFields();
        setEditing(false);
        setIsWaiting(false);
      });
  };

  return (
    <Row>
      <Col className="element-details-overlay">
        {isWaiting && (
          <div className="element-details-loading-area">
            <LoadingSpinner />
          </div>
        )}
        <Row justify="end">
          {(!props.numChildren || props.numChildren === 0) && (
            <Button onClick={onDeleteButtonClicked}>Delete</Button>
          )}
          {!editing && <Button onClick={onEditButtonClicked}>Edit</Button>}
          {editing && <Button onClick={onCancelButtonClicked}>Cancel</Button>}
          {editing && <Button onClick={onDoneButtonClicked}>Done</Button>}
        </Row>
        <Row>
          <Col align="start" cols={1}>
            <Row justify="start">
              <div className="details">Name:</div>
              {!editing && <p className="details">{props.element.name}</p>}
              {editing && (
                <input
                  type="text"
                  value={editedName}
                  onChange={(event: any) => {
                    setEditedName(event.currentTarget.value);
                  }}
                />
              )}
            </Row>
            <Row justify="start">
              <div className="details">Description:</div>
              {!editing && (
                <p className="details">{props.element.description}</p>
              )}
              {editing && (
                <input
                  type="text"
                  value={editedDesc}
                  onChange={(event: any) => {
                    setEditedDesc(event.currentTarget.value);
                  }}
                />
              )}
            </Row>
          </Col>
          <Col align="center" cols={4}>
            {!editing && <div>Picture: {props.element.picture}</div>}
            {editing && (
              <input
                type="file"
                accept="image/*"
                onChange={(event: any) => {
                  setEditedPict(event.target.files[0]);
                }}
              />
            )}
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
