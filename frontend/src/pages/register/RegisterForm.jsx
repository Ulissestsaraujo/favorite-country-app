import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../../context/AuthenticationContext";
import UserForm from "../../components/UserForm";

const RegisterForm = () => {
  const [registerMutation, { loading, error }] = useMutation(REGISTER_MUTATION);
  const navigate = useNavigate();
  const { login } = useContext(AuthenticationContext);

  const handleRegister = async (username, password) => {
    try {
      const { data } = await registerMutation({
        variables: { username, password },
      });
      const { id } = data.registerUser;
      login(id);
      navigate("/");
    } catch (err) {
      throw err;
    }
  };

  return (
    <UserForm
      title="Register"
      onSubmit={handleRegister}
      loading={loading}
      error={error}
      buttonText="Register"
    />
  );
};

export default RegisterForm;
