import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Button } from "../../components/common/Button";
import { Container, Row, Col } from "../../components/common/Grid";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { ElementDetails } from "../../components/ElementDetails";
import { NewElementEditor } from "../../components/NewElementEditor";
import { AiFillFolder, AiFillInfoCircle } from "react-icons/ai";
import { setIsLoading } from "../../store/actions";
import { InventoryStore } from "../../store/types";
import { FolderDetails } from "./FolderView.types";
import api from "../../api";
import "./FolderView.scss";
import { ChildDetails } from ".";

export const FolderView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [folder, setFolder] = React.useState<FolderDetails | undefined>(
    undefined
  );
  const [children, setChildren] = React.useState<ChildDetails[] | undefined>(
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
        setChildren(response.data.folder.children);
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setIsLoading(false));
      });
  }, [dispatch, params.folderid]);

  const addNewElement = (newElement: any) => {
    console.log(newElement);
    if (!folder) {
      return;
    }
    if (!children) {
      setChildren([newElement]);
    } else {
      let childrenCopy = [...children];
      childrenCopy.push(newElement);
      setChildren(childrenCopy);
    }
  };

  return (
    <Container className="folder-view-container">
      <Row>
        {folder && folder.parent_folder && (
          <Button onClick={() => navigate(`/folder/${folder?.parent_folder}`)}>
            Back
          </Button>
        )}
        <h2>Folder #{params.folderid}</h2>
      </Row>
      {isLoading && <LoadingSpinner />}
      {!isLoading && folder && (
        <Col>
          <ElementDetails element={folder} />
          <NewElementEditor
            onCreateSuccess={addNewElement}
            parent={folder.folderid}
          />
          <Row>
            <Col>
              {children &&
                children.map((child, index) => (
                  <Row
                    className="folder-child"
                    key={`${child.id}+${index}`}
                    onClick={() => {
                      navigate(`/${child.type}/${child.id}`, {
                        state: params.folderid,
                      });
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
