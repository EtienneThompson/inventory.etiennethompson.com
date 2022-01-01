import React from "react";
import { Container } from "../../components/common/Grid";
import { LogoutReasons } from "./Logout.types";
import { extractQueryParam } from "../../utils/window";

export const Logout = () => {
  const [reason, setReason] = React.useState(0);

  const logoutReasons: LogoutReasons = {
    0: "You have successfully been logged out.",
    1: "Your session has expired. Please login again to continue",
  };

  React.useEffect(() => {
    setReason(extractQueryParam("reason"));
  }, []);

  return (
    <Container>
      <div style={{ width: "50%", textAlign: "center" }}>
        {logoutReasons[reason]}
      </div>
    </Container>
  );
};
