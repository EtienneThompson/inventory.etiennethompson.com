import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button } from "../common/Button";
import { Row, Col } from "../common/Grid";
import { ErrorMessage } from "../common/ErrorMessage";
import {
  ElementDetailsProps,
  DeleteRequest,
  ElementComponents,
} from "./ElementDetails.types";
import api from "../../api";
import placeholderImage from "../../assets/images/photo-placeholder.png";
import "./ElementDetails.scss";
import { InventoryStore, SystemState } from "../../store/types";
import {
  deleteFromLocalStorage,
  readFromLocalStorage,
  writeToLocalStorage,
} from "../../utils/localStorage";
import { LocalStorageKey } from "../../types";
import { setChangingElement, setCurrentState } from "../../store/actions";

export const ElementDetails: FunctionComponent<ElementDetailsProps> = (
  props: ElementDetailsProps
) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editing, setEditing] = React.useState(false);
  const [editedName, setEditedName] = React.useState("");
  const [editedDesc, setEditedDesc] = React.useState("");
  const [editedPict, setEditedPict] = React.useState<any>(null);
  const [errorMessage, setErrorMessage] = React.useState("");

  const currentState = useSelector(
    (state: InventoryStore) => state.currentState
  );

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
    dispatch(setChangingElement(true));
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
        setErrorMessage("");
        // Since the item no longer exists, navigate the user back to the
        // parent folder.
        dispatch(setChangingElement(false));
        // Set the force_update flag when navigating back to refetch the data
        // from the database.
        navigate(`/folder/${props.element.parent_folder}?force_update=true`);
      })
      .catch((error) => {
        setErrorMessage(`Failed to delete the ${props.type}.`);
        dispatch(setChangingElement(false));
      });
  };

  const onMoveButtonClicked = () => {
    // Keep track of the current element that wants to be moved.
    writeToLocalStorage(
      LocalStorageKey.MovingFolder,
      JSON.stringify(props.element)
    );
    // Set currentState to be Moving.
    dispatch(setCurrentState(SystemState.Moving));
  };

  const onMoveToButtonClicked = () => {
    // Set state to changing the element.
    dispatch(setChangingElement(true));
    // Get the id of the current element.
    let moveToId = props.element.folderid;
    // Get the id of the element that we wanted to move.
    let movingElement = readFromLocalStorage(LocalStorageKey.MovingFolder);
    if (!movingElement) {
      // Something went wrong.
      dispatch(setChangingElement(false));
      dispatch(setCurrentState(SystemState.Viewing));
      return;
    }
    let movingJson: ElementComponents = JSON.parse(movingElement);
    let movingId = movingJson.folderid
      ? movingJson.folderid
      : movingJson.itemid;
    let movingType = movingJson.folderid ? "folder" : "item";

    if (!moveToId || !movingId) {
      // Something went wrong.
      dispatch(setChangingElement(false));
      dispatch(setCurrentState(SystemState.Viewing));
      return;
    }

    deleteFromLocalStorage(LocalStorageKey.MovingFolder);
    // Make the API request to move the element.
    api
      .post("/inventory/move", {
        moveToId: moveToId,
        movingId: movingId,
        movingType: movingType,
      })
      .then((response) => {
        // Remove affected elements from the cache.
        props.memo.delete(movingJson.parent_folder);
        props.memo.delete(props.element.folderid as string);
        props.memo.delete(moveToId as string);
        props.memo.delete(movingId as string);

        // Call the method to update the parent.
        if (props.moveChild) {
          props.moveChild();
        } else {
          dispatch(setChangingElement(false));
        }
        // Set currentState back to Viewing.
        dispatch(setCurrentState(SystemState.Viewing));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setCurrentState(SystemState.Viewing));
      });
  };

  const onEditButtonClicked = () => {
    setEditing(true);
  };

  const onCancelButtonClicked = () => {
    // If currentState is Moving, set it back to Viewing.
    // If currentState is Viewing, do the below.
    if (currentState === SystemState.Moving) {
      deleteFromLocalStorage(LocalStorageKey.MovingFolder);
      dispatch(setCurrentState(SystemState.Viewing));
    } else {
      resetFields();
      setEditing(false);
    }
  };

  const onDoneButtonClicked = () => {
    dispatch(setChangingElement(true));
    let formData = new FormData();
    formData.append("file", editedPict);
    formData.append(
      "id",
      (!!props.element.folderid
        ? props.element.folderid
        : props.element.itemid) as string
    );
    formData.append("name", editedName);
    formData.append("description", editedDesc);
    api
      .put(`/inventory/${props.type}/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setErrorMessage("");
        props.updateElement(
          editedName,
          editedDesc,
          response.data.picture,
          response.data.updated
        );
        // Fetch the cached parent from the cache.
        let cachedParent = props.memo.get(props.element.parent_folder);
        if (cachedParent) {
          // Find the child this current element corresponds to.
          let elementId = !!props.element.folderid
            ? props.element.folderid
            : props.element.itemid;
          let updatedChild = cachedParent.folder.children.filter(
            (child: any) => child.id === elementId
          )[0];
          // Update it's fields and update the cache.
          updatedChild.name = editedName;
          updatedChild.picture = response.data.picture;
          props.memo.add(props.element.parent_folder, cachedParent);
        }
        // Reset UI fields.
        resetFields();
        setEditing(false);
        dispatch(setChangingElement(false));
      })
      .catch((error) => {
        setErrorMessage("Couldn't update the item.");
        resetFields();
        setEditing(false);
        dispatch(setChangingElement(false));
      });
  };

  return (
    <Row>
      <Col className="element-details-overlay">
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <Row justify="end">
          {(!props.numChildren || props.numChildren === 0) && (
            <Button onClick={onDeleteButtonClicked}>Delete</Button>
          )}
          {!editing &&
            currentState === SystemState.Viewing &&
            props.element.parent_folder && (
              <Button onClick={onMoveButtonClicked}>Move</Button>
            )}
          {!editing &&
            currentState === SystemState.Moving &&
            !props.element.itemid && (
              <Button onClick={onMoveToButtonClicked}>Move To</Button>
            )}
          {!editing && currentState === SystemState.Viewing && (
            <Button onClick={onEditButtonClicked}>Edit</Button>
          )}
          {editing && <Button onClick={onDoneButtonClicked}>Done</Button>}
          {(editing || (!editing && currentState === SystemState.Moving)) && (
            <Button onClick={onCancelButtonClicked}>Cancel</Button>
          )}
        </Row>
        <Row>
          <Col align="start" cols={1}>
            <Row>
              <Col className="details-section" align="start">
                <div className="details-label">Name</div>
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
              </Col>
            </Row>
            <Row>
              <Col className="details-section" align="start">
                <div className="details-label">Description</div>
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
              </Col>
            </Row>
            <Row>
              <Col className="details-section" align="start">
                <span className="details-label">Created</span>
                <span className="element-time">{props.element.created}</span>
              </Col>
              <Col align="start">
                <span className="details-label">Updated</span>
                <span className="element-time">{props.element.updated}</span>
              </Col>
            </Row>
          </Col>
          <Col align="center" cols={4}>
            {!editing && (
              <img
                className="image-details"
                alt="Nothing pictured"
                src={
                  props.element.picture
                    ? props.element.picture
                    : placeholderImage
                }
              />
            )}
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
      </Col>
    </Row>
  );
};
