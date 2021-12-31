import { Button } from "../Button";
import "./Toolbar.scss";

export const Toolbar = () => {
  return (
    <div className="toolbar-container">
      <div className="title">Etienne Thompson Inventory</div>
      <Button>Login</Button>
    </div>
  );
};
