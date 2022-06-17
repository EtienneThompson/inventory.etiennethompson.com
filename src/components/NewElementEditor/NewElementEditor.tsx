import React, { FunctionComponent } from "react";
import { Row, Col, Container } from "../common/Grid";
import { Toggle } from "../common/Toggle";
import { Button } from "../common/Button";
import { NewElementEditorProps } from "./NewElementEditor.types";
import api from "../../api";
import "./NewElementEditor.scss";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";

export const NewElementEditor: FunctionComponent<NewElementEditorProps> = (
  props: NewElementEditorProps
) => {
  const elementTypes = ["item", "folder"];

  const [addNew, setAddNew] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [picture, setPicture] = React.useState<any>(null);
  const [elementTypeIndex, setElementTypeIndex] = React.useState(0);
  const [isCreating, setIsCreating] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const resetFields = () => {
    setName("");
    setDescription("");
    setPicture(null);
  };

  const onCancelButtonClicked = () => {
    setAddNew(false);
    resetFields();
  };

  const onDoneButtonClicked = () => {
    setIsCreating(true);
    const formData = new FormData();
    formData.append("file", picture);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("parent_folder", props.parent);

    api
      .post(`/inventory/${elementTypes[elementTypeIndex]}/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setErrorMessage("");
        props.onCreateSuccess(response.data.createdElement);
        setIsCreating(false);
        resetFields();
      })
      .catch((error) => {
        setErrorMessage(
          `Couldn't create the ${elementTypes[elementTypeIndex]}.`
        );
        setIsCreating(false);
      });
  };

  return (
    <Row className="new-element-container">
      <Col className="new-element-overlay">
        {errorMessage && <ErrorMessage message={errorMessage} />}
        {isCreating && (
          <div className="new-element-loading-area">
            <LoadingSpinner />
          </div>
        )}
        <Row justify="end">
          {!addNew && <Button onClick={() => setAddNew(true)}>New</Button>}
          {addNew && <Button onClick={onCancelButtonClicked}>Cancel</Button>}
          {addNew && <Button onClick={onDoneButtonClicked}>Done</Button>}
        </Row>
        {addNew && (
          <Container className="new-element-form-container">
            <Col>
              <Row justify="start" className="element-detail">
                <div>Item</div>
                <Toggle
                  action={() =>
                    setElementTypeIndex((elementTypeIndex + 1) % 2)
                  }
                />
                <div>Folder</div>
              </Row>
              <Row justify="start" className="element-detail">
                <div style={{ marginRight: "5px" }}>Name:</div>
                <input
                  type="text"
                  value={name}
                  onChange={(event: any) => {
                    setName(event.currentTarget.value);
                  }}
                ></input>
              </Row>
              <Row justify="start" className="element-detail">
                <div style={{ marginRight: "5px" }}>Description:</div>
                <input
                  type="text"
                  value={description}
                  onChange={(event: any) => {
                    setDescription(event.currentTarget.value);
                  }}
                ></input>
              </Row>
            </Col>
            <input
              className="file-upload"
              type="file"
              accept="image/*"
              onChange={(event: any) => setPicture(event.target.files[0])}
            />
          </Container>
        )}
      </Col>
    </Row>
  );
};
