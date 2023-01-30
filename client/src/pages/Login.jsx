import React, { useState, useEffect } from "react";
import logo from "../assets/eteCube.jpg";
import { userLogin } from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

const initialForm = { username: "", password: "" };

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await userLogin(formData);
      setFormData(initialForm);
      localStorage.setItem("accessToken", res?.token);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.response?.data?.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-300">
      <form onSubmit={handleSubmit}>
        <div className="bg-white w-96 p-6 rounded shadow-md">
          <div className="flex items-center justify-center mb-4">
            <img src={logo} alt="logo" className="h-32 rounded-lg" />
          </div>
          {errorMessage && (
            <div className="bg-red-500 py-2 px-3 rounded text-gray-100 mb-2">
              <p>{errorMessage}</p>
            </div>
          )}
          <label htmlFor="username" className="text-gray-700">
            User Name
          </label>
          <input
            value={formData.username}
            name="username"
            required
            type="text"
            id="username"
            className="w-full py-2 bg-gray-300 text-gray-500 px-2 outline-none mb-4 rounded-md"
            onChange={handleChange}
          />
          <label htmlFor="password" className="text-gray-700">
            Password
          </label>
          <input
            value={formData.password}
            name="password"
            required
            type="password"
            id="password"
            className="w-full py-2 bg-gray-300 text-gray-500 px-2 outline-none mb-2 rounded-md"
            onChange={handleChange}
          />
          <p className="text-sm mb-4 tracking-tight">
            Do not have an account?{" "}
            <Link className="tracking-tight underline" to={"/register"}>
              Register here
            </Link>{" "}
          </p>
          <button className="bg-blue-500 w-full text-gray-100 rounded py-2 hover:bg-blue-700 transition-colors">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
