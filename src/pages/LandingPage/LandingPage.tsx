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
  document.title = "Etienne Thompson - Inventory System - Home";
  document.documentElement.className = "theme-light";

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
      <p className="landing-page-description">
        This site is a web-based inventory application to help people stay
        organized with their things. It works similarly to a file system.
        "Folders" representing real-life objects which contain other objects
        (such as a box, a bag, or a room). "Items" represent real-life objects
        which are things you use (such as your phone, a lamp, or a book). The
        way you organize your items in the inventory system is up to you, but
        the idea is to help you find your things faster.
      </p>
      <div className="horizontal-break" />
      <p className="landing-page-description">
        You can check out more about me here:{" "}
        <a href="http://etiennethompson.com">etiennethompson.com</a>
        <br />
        You can check out the code for this project here:{" "}
        <a href="https://github.com/EtienneThompson/inventory.etiennethompson.com">
          Github
        </a>
      </p>
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
