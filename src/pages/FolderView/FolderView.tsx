import React, { FunctionComponent } from "react";
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
import { FolderProps, FolderDetails, ChildDetails } from "./FolderView.types";
import api from "../../api";
import "./FolderView.scss";

export const FolderView: FunctionComponent<FolderProps> = (
  props: FolderProps
) => {
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
    let folderid = params.folderid;
    if (!folderid) {
      dispatch(setIsLoading(false));
      return;
    }
    let cachedFolder = props.memo.retrieveFromMemo(folderid);
    if (cachedFolder) {
      // If the element is in the cache, use that data.
      dispatch(setIsLoading(false));
      setFolder(cachedFolder);
      setChildren(cachedFolder.children);
    } else {
      // Otherwise, get the data from the database and then cache it.
      api
        .get(`/inventory/folder?folderid=${params.folderid}`)
        .then((response) => {
          if (folderid) props.memo.addToMemo(folderid, response.data.folder);
          setFolder(response.data.folder);
          setChildren(response.data.folder.children);
          dispatch(setIsLoading(false));
        })
        .catch((error) => {
          console.log(error);
          dispatch(setIsLoading(false));
        });
    }
  }, [dispatch, params.folderid, props.memo]);

  const addNewElement = (newElement: any) => {
    if (!folder) {
      return;
    }
    let newChildren = undefined;
    if (!children) {
      setChildren([newElement]);
      newChildren = [newElement];
    } else {
      let childrenCopy = [...children];
      childrenCopy.push(newElement);
      setChildren(childrenCopy);
      newChildren = childrenCopy;
    }
    // Update the cache when a new child is added.
    let newCacheFolder = { ...folder };
    newCacheFolder.children = newChildren;
    props.memo.addToMemo(newCacheFolder.folderid, newCacheFolder);
  };

  const updateFolder = (newName: string, newDesc: string, newPict: any) => {
    if (!folder) {
      return;
    }
    let newFolder = { ...folder };
    newFolder.name = newName;
    newFolder.description = newDesc;
    newFolder.picture = newPict;
    setFolder(newFolder);
    // Update the cache when a folder is edited.
    props.memo.addToMemo(newFolder.folderid, newFolder);
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
          <ElementDetails
            element={folder}
            type={"folder"}
            updateElement={updateFolder}
            numChildren={folder.children.length}
          />
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
