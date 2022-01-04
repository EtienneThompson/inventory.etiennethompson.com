import { ToggleProps } from "./Toggle.types";
import "./Toggle.scss";

export const Toggle = (props: ToggleProps) => {
  return (
    <div className="toggle-container">
      <label className="toggle">
        <input
          type="checkbox"
          onChange={() => {
            props.action();
          }}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};
