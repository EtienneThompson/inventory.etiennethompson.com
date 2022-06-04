import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Button } from "../../components/common/Button";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { ElementDetails } from "../../components/ElementDetails";
import { Container, Row, Col } from "../../components/common/Grid";
import { ErrorMessage } from "../../components/common/ErrorMessage";
import { NewElementEditor } from "../../components/NewElementEditor";
import {
  LoadingChildren,
  LoadingDetails,
} from "../../components/LoadingLayout";
import { AiFillFolder, AiFillInfoCircle } from "react-icons/ai";
import { setIsLoading } from "../../store/actions";
import { BreadcrumbDetails } from "../../types";
import { InventoryStore } from "../../store/types";
import { FolderProps, FolderDetails, ChildDetails } from "./FolderView.types";
import api from "../../api";
import { extractQueryParam } from "../../utils/window";
import placeholderImage from "../../assets/images/photo-placeholder.png";
import "./FolderView.scss";

export const FolderView: FunctionComponent<FolderProps> = (
  props: FolderProps
) => {
  document.title = "Etienne Thompson - Inventory System - Folder";
  document.documentElement.className = "theme-light";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [folder, setFolder] = React.useState<FolderDetails | undefined>(
    undefined
  );
  const [children, setChildren] = React.useState<ChildDetails[] | undefined>(
    undefined
  );
  const [breadcrumb, setBreadcrumb] = React.useState<
    BreadcrumbDetails | undefined
  >(undefined);
  const [errorMessage, setErrorMessage] = React.useState("");

  const isLoading = useSelector((state: InventoryStore) => state.isLoading);

  React.useEffect(() => {
    dispatch(setIsLoading(true));
    let force_update = extractQueryParam("force_update");

    let folderid = params.folderid;
    if (!folderid) {
      dispatch(setIsLoading(false));
      return;
    }
    let cachedFolder = props.memo.get(folderid);
    if (cachedFolder && !force_update) {
      // If the element is in the cache, use that data.
      setFolder(cachedFolder.folder);
      setChildren(cachedFolder.folder.children);
      setBreadcrumb(cachedFolder.breadcrumb);
      dispatch(setIsLoading(false));
    } else {
      // Otherwise, get the data from the database and then cache it.
      api
        .get(`/inventory/folder?folderid=${params.folderid}`)
        .then((response) => {
          setErrorMessage("");
          if (folderid) props.memo.add(folderid, response.data);
          setFolder(response.data.folder);
          setChildren(response.data.folder.children);
          setBreadcrumb(response.data.breadcrumb);
          dispatch(setIsLoading(false));
        })
        .catch((error) => {
          setErrorMessage("Couldn't fetch the folder data.");
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
    props.memo.add(newCacheFolder.folderid, newCacheFolder);
  };

  const updateFolder = (
    newName: string,
    newDesc: string,
    newPict: any,
    updated: string
  ) => {
    if (!folder) {
      return;
    }
    let newFolder = { ...folder };
    newFolder.name = newName;
    newFolder.description = newDesc;
    newFolder.picture = newPict;
    newFolder.updated = updated;
    setFolder(newFolder);
    // Update the cache when a folder is edited.
    props.memo.add(newFolder.folderid, newFolder);
  };

  const moveChild = () => {
    // Fetch the updated children when an element is moved.
    api
      .get(`/inventory/folder/children?folderid=${params.folderid}`)
      .then((response) => setChildren(response.data.children))
      .catch((error) => console.log(error));
  };

  return (
    <Container className="folder-view-container">
      <Row className="folder-view-row" justify="start">
        {folder && folder.parent_folder && (
          <Button onClick={() => navigate(`/folder/${folder?.parent_folder}`)}>
            Back
          </Button>
        )}
        {/* <h2>Folder #{params.folderid}</h2> */}
        {breadcrumb && (
          <Breadcrumb
            names={breadcrumb.names}
            values={breadcrumb.values}
            types={breadcrumb.types}
            onNameClick={(value: string, type: string) =>
              navigate(`/${type}/${value}`)
            }
          />
        )}
      </Row>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {isLoading && (
        <Row>
          <Col>
            <LoadingDetails />
            <LoadingChildren />
          </Col>
        </Row>
      )}
      {!isLoading && folder && (
        <Col className="test">
          <div className="folder-view-row">
            <ElementDetails
              memo={props.memo}
              element={folder}
              type={"folder"}
              updateElement={updateFolder}
              moveChild={moveChild}
              numChildren={folder.children.length}
            />
          </div>
          <div className="folder-view-row">
            <NewElementEditor
              onCreateSuccess={addNewElement}
              parent={folder.folderid}
            />
          </div>
          <div className="folder-view-overflow">
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
                      <img
                        className="child-image"
                        alt="Nothing pictured"
                        src={child.picture ? child.picture : placeholderImage}
                      />
                    </Col>
                  </Row>
                ))}
            </Col>
          </div>
          <div className="folder-view-footer"></div>
        </Col>
      )}
    </Container>
  );
};
