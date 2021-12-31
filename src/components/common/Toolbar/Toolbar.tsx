import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { ToolbarProps } from "./Toolbar.types";
import { InventoryStore } from "../../../store/types";
import { Button } from "../Button";
import { Row, Col } from "../Grid";
import "./Toolbar.scss";

export const Toolbar: FunctionComponent<ToolbarProps> = (
  props: ToolbarProps
) => {
  const isLoggedIn = useSelector((state: InventoryStore) => state.isLoggedIn);

  const onLoginButtonClicked = () => {
    window.open(
      `${process.env.REACT_APP_LOGIN_ENDPOINT}/login?appid=${process.env.REACT_APP_APPLICATION_ID}&redirectBase=${process.env.REACT_APP_LOGIN_REDIRECT}`,
      "_self"
    );
  };

  return (
    <div className="toolbar-container">
      <Row>
        <Col cols={2} align="start">
          <div className="title">Etienne Thompson Inventory</div>
        </Col>
        <Col cols={2} align="end">
          {isLoggedIn ? (
            <Button onClick={props.onLogoutButtonClicked}>Logout</Button>
          ) : (
            <Button onClick={onLoginButtonClicked}>Login</Button>
          )}
        </Col>
      </Row>
    </div>
  );
};
