import { useDispatch, useSelector } from "react-redux";
import { InventoryStore } from "../../../store/types";
import { Button } from "../Button";
import { Row, Col } from "../Grid";
import { logout } from "../../../store/actions";
import "./Toolbar.scss";

export const Toolbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: InventoryStore) => state.isLoggedIn);

  const onLoginButtonClicked = () => {
    window.open(
      `${process.env.REACT_APP_LOGIN_ENDPOINT}/login?appid=${process.env.REACT_APP_APPLICATION_ID}&redirectBase=${process.env.REACT_APP_LOGIN_REDIRECT}`,
      "_self"
    );
  };

  const onLogoutButtonClicked = () => {
    dispatch(logout());
  };

  return (
    <div className="toolbar-container">
      <Row>
        <Col cols={2} align="start">
          <div className="title">Etienne Thompson Inventory</div>
        </Col>
        <Col cols={2} align="end">
          {isLoggedIn ? (
            <Button onClick={onLogoutButtonClicked}>Logout</Button>
          ) : (
            <Button onClick={onLoginButtonClicked}>Login</Button>
          )}
        </Col>
      </Row>
    </div>
  );
};
