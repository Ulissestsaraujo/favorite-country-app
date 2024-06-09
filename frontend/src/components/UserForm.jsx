import React, { useState, useEffect } from "react";
import TextInput from "./TextInput";
import MaxWidthWrapper from "./MaxWidthWrapper";

const UserForm = ({ title, onSubmit, loading, error, buttonText }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (error) {
      setFormError("Invalid username or password. Please try again.");
    } else {
      setFormError("");
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formError) {
      setFormError("");
    }
    try {
      await onSubmit(username, password);
    } catch (err) {
      if (
        err.message.includes("User not found") ||
        err.message.includes("Incorrect password")
      ) {
        setFormError("Invalid username or password. Please try again.");
      } else if (err.message.includes("Username already exists")) {
        setFormError("Username already exists. Please choose a different one.");
      } else {
        setFormError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="max-w-md mx-auto mt-10 p-4">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <TextInput
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <TextInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {formError && <p className="text-red-500 text-sm">{formError}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? `${buttonText}...` : buttonText}
          </button>
        </form>
      </div>
    </MaxWidthWrapper>
  );
};

export default UserForm;
