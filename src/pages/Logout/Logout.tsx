import React from "react";
import { Container } from "../../components/common/Grid";
import { LogoutReasons } from "./Logout.types";
import { extractQueryParam } from "../../utils/window";
import "./Logout.scss";

export const Logout = () => {
  document.title = "Etienne Thompson - Inventory System - Logout";
  document.documentElement.className = "theme-light";

  const [reason, setReason] = React.useState(0);

  const logoutReasons: LogoutReasons = {
    0: "You have successfully been logged out.",
    1: "Your session has expired. Please login again to continue",
  };

  React.useEffect(() => {
    setReason(extractQueryParam("reason"));
  }, []);

  return (
    <Container className="logout-full-height">
      <div style={{ width: "50%", textAlign: "center" }}>
        {logoutReasons[reason]}
      </div>
    </Container>
  );
};
