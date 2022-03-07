import React from "react";
import { Container, Row, Col } from "../../components/common/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { InventoryStore } from "../../store/types";
import api from "../../api";
import { setIsLoading } from "../../store/actions";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { FolderDetails } from "../FolderView";
import placeholderImage from "../../assets/images/photo-placeholder.png";
import "./LandingPage.scss";

export const LandingPage = () => {
  const [folder, setFolder] = React.useState<FolderDetails | undefined>(
    undefined
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state: InventoryStore) => state.isLoading);
  const isLoggedIn = useSelector((state: InventoryStore) => state.isLoggedIn);

  React.useEffect(() => {
    dispatch(setIsLoading(true));
    if (!isLoggedIn) {
      dispatch(setIsLoading(false));
      return;
    }

    api
      .get("/inventory/folder/base")
      .then((response) => {
        setFolder(response.data.folder);
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setIsLoading(false));
      });
  }, [dispatch, isLoggedIn]);

  const onBaseFolderClicked = () => {
    if (!folder) {
      return;
    }

    navigate(`/folder/${folder.folderid}`);
  };

  return (
    <Container className="landing-page-container">
      <h2>Welcome to inventory.etiennethompson.com!</h2>
      {isLoading && <LoadingSpinner />}
      {!isLoading && folder && (
        <Row className="base-folder-card" onClick={onBaseFolderClicked}>
          <Col cols={1}>{folder.name}</Col>
          <Col cols={3}>
            <img
              style={{ height: "100px", width: "100px" }}
              alt="Nothing Uploaded"
              src={folder.picture ? folder.picture : placeholderImage}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};
