import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Container, Row, Col } from "../../components/common/Grid";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { AiFillFolder, AiFillInfoCircle } from "react-icons/ai";
import { setIsLoading } from "../../store/actions";
import { InventoryStore } from "../../store/types";
import { FolderDetails } from "./FolderView.types";
import api from "../../api";
import "./FolderView.scss";

export const FolderView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [folder, setFolder] = React.useState<FolderDetails | undefined>(
    undefined
  );

  const isLoading = useSelector((state: InventoryStore) => state.isLoading);

  React.useEffect(() => {
    dispatch(setIsLoading(true));
    api
      .get(`/inventory/folder?folderid=${params.folderid}`)
      .then((response) => {
        console.log(response);
        setFolder(response.data.folder);
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setIsLoading(false));
      });
  }, [dispatch, params.folderid]);

  return (
    <Container className="folder-view-container">
      <h1>Folder #{params.folderid}</h1>
      {isLoading && <LoadingSpinner />}
      {!isLoading && folder && (
        <Col>
          <Row>
            <Col align="start" cols={1}>
              <p className="details">Name: {folder.name}</p>
              <p className="details">Description: {folder.name}</p>
            </Col>
            <Col cols={4}>
              <div>Picture: {folder.picture}</div>
            </Col>
          </Row>
          <Row>
            <Col align="start">
              <p className="item-time">Created: {folder.created}</p>
              <p className="item-time">Updated: {folder.modified}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              {folder.children.map((child, index) => (
                <Row
                  className="folder-child"
                  key={`${child.id}+${index}`}
                  onClick={() => {
                    navigate(`/${child.type}/${child.id}`);
                  }}
                >
                  <Col cols={1}>
                    <Row className="folder-child-name" justify="start">
                      {child.type === "folder" ? (
                        <AiFillFolder />
                      ) : (
                        <AiFillInfoCircle />
                      )}
                      <p className="details">{child.name}</p>
                    </Row>
                  </Col>
                  <Col cols={4}>
                    <div>Picture: {child.picture}</div>
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        </Col>
      )}
    </Container>
  );
};
