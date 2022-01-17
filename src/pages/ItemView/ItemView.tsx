import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { Container, Row } from "../../components/common/Grid";
import api from "../../api";
import { setIsLoading } from "../../store/actions";
import { InventoryStore } from "../../store/types";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { ElementDetails } from "../../components/ElementDetails/ElementDetails";
import { ItemProps, ItemDetails } from "./ItemView.types";
import "./ItemView.scss";

export const ItemView: FunctionComponent<ItemProps> = (props: ItemProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [item, setItem] = React.useState<ItemDetails | undefined>(undefined);

  const isLoading = useSelector((state: InventoryStore) => state.isLoading);

  React.useEffect(() => {
    dispatch(setIsLoading(true));
    if (!params.itemid) {
      dispatch(setIsLoading(false));
      return;
    }
    let cachedItem = props.memo.retrieveFromMemo(params.itemid);
    if (cachedItem) {
      // If the item is in the cache use that data.
      dispatch(setIsLoading(false));
      setItem(cachedItem);
    } else {
      // Otherwise fetch data from the database and cache it.
      api
        .get(`/inventory/item?itemid=${params.itemid}`)
        .then((response) => {
          if (params.itemid)
            props.memo.addToMemo(params.itemid, response.data.item);
          setItem(response.data.item);
          dispatch(setIsLoading(false));
        })
        .catch((error) => {
          console.log(error);
          dispatch(setIsLoading(false));
        });
    }
  }, [dispatch, params.itemid, props.memo]);

  const updateItem = (newName: string, newDesc: string, newPict: string) => {
    if (!item) {
      return;
    }
    let newItem = { ...item };
    newItem.name = newName;
    newItem.description = newDesc;
    newItem.picture = newPict;
    setItem(newItem);
    // Update the cache when fields are edited.
    props.memo.addToMemo(newItem.itemid, newItem);
  };

  return (
    <Container className="item-view-container">
      <Row>
        {item && item.parent_folder && (
          <Button onClick={() => navigate(`/folder/${item.parent_folder}`)}>
            Back
          </Button>
        )}
        <h2>Item #{params.itemid}</h2>
      </Row>
      {isLoading && <LoadingSpinner />}
      {!isLoading && item && (
        <ElementDetails
          element={item}
          type={"item"}
          updateElement={updateItem}
        />
      )}
    </Container>
  );
};
