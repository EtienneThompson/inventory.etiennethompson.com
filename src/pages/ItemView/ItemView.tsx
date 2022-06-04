import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { Container, Row } from "../../components/common/Grid";
import { LoadingDetails } from "../../components/LoadingLayout";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { ErrorMessage } from "../../components/common/ErrorMessage";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { ElementDetails } from "../../components/ElementDetails/ElementDetails";
import api from "../../api";
import { setIsLoading } from "../../store/actions";
import { BreadcrumbDetails } from "../../types";
import { InventoryStore } from "../../store/types";
import { ItemProps, ItemDetails } from "./ItemView.types";
import "./ItemView.scss";

export const ItemView: FunctionComponent<ItemProps> = (props: ItemProps) => {
  document.title = "Etienne Thompson - Inventory System - Item";
  document.documentElement.className = "theme-light";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [item, setItem] = React.useState<ItemDetails | undefined>(undefined);
  const [errorMessage, setErrorMessgage] = React.useState("");
  const [breadcrumb, setBreadcrumb] = React.useState<
    BreadcrumbDetails | undefined
  >(undefined);

  const isLoading = useSelector((state: InventoryStore) => state.isLoading);
  const changingElement = useSelector(
    (state: InventoryStore) => state.changingElement
  );

  React.useEffect(() => {
    dispatch(setIsLoading(true));
    if (!params.itemid) {
      dispatch(setIsLoading(false));
      return;
    }
    let cachedItem = props.memo.get(params.itemid);
    if (cachedItem) {
      // If the item is in the cache use that data.
      setItem(cachedItem.item);
      setBreadcrumb(cachedItem.breadcrumb);
      dispatch(setIsLoading(false));
    } else {
      // Otherwise fetch data from the database and cache it.
      api
        .get(`/inventory/item?itemid=${params.itemid}`)
        .then((response) => {
          setErrorMessgage("");
          if (params.itemid) props.memo.add(params.itemid, response.data);
          setItem(response.data.item);
          setBreadcrumb(response.data.breadcrumb);
          dispatch(setIsLoading(false));
        })
        .catch((error) => {
          setErrorMessgage("Failed to fetch item data.");
          dispatch(setIsLoading(false));
        });
    }
  }, [dispatch, params.itemid, props.memo]);

  const updateItem = (
    newName: string,
    newDesc: string,
    newPict: string,
    updated: string
  ) => {
    if (!item) {
      return;
    }
    let newItem = { ...item };
    newItem.name = newName;
    newItem.description = newDesc;
    newItem.picture = newPict;
    newItem.updated = updated;
    setItem(newItem);
    // Update the cache when fields are edited.
    props.memo.add(newItem.itemid, newItem);
  };

  return (
    <Container className="item-view-container">
      {changingElement && (
        <div className="view-loading-area">
          <LoadingSpinner />
        </div>
      )}
      <Row justify="start">
        {item && item.parent_folder && (
          <Button onClick={() => navigate(`/folder/${item.parent_folder}`)}>
            Back
          </Button>
        )}
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
      {isLoading && <LoadingDetails />}
      {!isLoading && item && (
        <ElementDetails
          memo={props.memo}
          element={item}
          type={"item"}
          updateElement={updateItem}
        />
      )}
    </Container>
  );
};
