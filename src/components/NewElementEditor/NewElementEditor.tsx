import React, { FunctionComponent } from "react";
import { Row, Col } from "../common/Grid";
import { Toggle } from "../common/Toggle";
import { NewElementEditorProps } from "./NewElementEditor.types";
import "./NewElementEditor.scss";

export const NewElementEditor: FunctionComponent<NewElementEditorProps> = (
  props: NewElementEditorProps
) => {
  const elementTypes = ["item", "folder"];

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [picture, setPicture] = React.useState("");
  const [elementTypeIndex, setElementTypeIndex] = React.useState(0);

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <Row justify="start" className="element-detail">
              <div>Item</div>
              <Toggle
                action={() => setElementTypeIndex((elementTypeIndex + 1) % 2)}
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
          <Col cols={3}>
            <div>Upload picture here.</div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
