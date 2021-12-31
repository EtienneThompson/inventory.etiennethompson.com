import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Container } from "../../components/common/Grid";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { login, setIsLoading } from "../../store/actions";
import { extractQueryParam } from "../../utils/window";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log("hello");
    dispatch(setIsLoading(true));
    let clientId = extractQueryParam("clientId");
    let isUser = extractQueryParam("isUser");
    let isAdmin = extractQueryParam("isAdmin");
    if (clientId && isUser && isAdmin) {
      dispatch(login(clientId, isUser, isAdmin));
      navigate("/");
    }
    dispatch(setIsLoading(false));
  }, [dispatch, navigate]);

  return (
    <Container>
      <LoadingSpinner />
    </Container>
  );
};
