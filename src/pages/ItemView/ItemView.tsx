import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "../../components/common/Grid";
import api from "../../api";
import { setIsLoading } from "../../store/actions";
import { InventoryStore } from "../../store/types";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { ItemDetails } from "./ItemView.types";
import "./ItemView.scss";
import { Button } from "../../components/common/Button";

export const ItemView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [item, setItem] = React.useState<ItemDetails | undefined>(undefined);

  const isLoading = useSelector((state: InventoryStore) => state.isLoading);

  React.useEffect(() => {
    dispatch(setIsLoading(true));
    api
      .get(`/inventory/item?itemid=${params.itemid}`)
      .then((response) => {
        console.log(response);
        setItem(response.data.item);
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setIsLoading(false));
      });
  }, [dispatch, params.itemid]);

  return (
    <Container>
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
        <Row>
          <Col>
            <Row>
              <Col align="start" cols={1}>
                <p className="details">Name: {item.name}</p>
                <p className="details">Description: {item.description}</p>
              </Col>
              <Col cols={4}>
                <div>Picture: {item.picture}</div>
              </Col>
            </Row>
            <Row>
              <Col align="start">
                <p className="item-time">Created: {item.created}</p>
                <p className="item-time">Updated: {item.updated}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
};
