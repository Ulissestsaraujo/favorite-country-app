import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../../context/AuthenticationContext";
import UserForm from "../../components/UserForm";

const LoginForm = () => {
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();
  const { login } = useContext(AuthenticationContext);

  const handleLogin = async (username, password) => {
    try {
      const { data } = await loginMutation({
        variables: { username, password },
      });
      const { id } = data.loginUser;
      login(id);
      navigate("/");
    } catch (err) {
      throw err;
    }
  };

  return (
    <UserForm
      title="Login"
      onSubmit={handleLogin}
      loading={loading}
      error={error}
      buttonText="Login"
    />
  );
};

export default LoginForm;
