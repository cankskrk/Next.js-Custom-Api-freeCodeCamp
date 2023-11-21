"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const ResetPasswordPage = () => {
  const [token, setToken] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isTokenReceived, setIsTokenReceived] = useState(false);
  const [error, setError] = useState(false);

  const resetUserPassword = async () => {
    try {
      await axios.post("/api/users/resetemail", { ...password, token });
    } catch (err: any) {
      setError(true);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || ""); // avoid to get undefined
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      setIsTokenReceived(true);
    }
  }, [token]);

  // Enabling or Disabling the button
  useEffect(() => {
    if (
      password.password.length > 0 &&
      password.confirmPassword.length > 0 &&
      password.password === password.confirmPassword
    ) {
    }
  }, [password]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Reset Password</h1>
      <h2 className="p-2 bg-blue-500 text-black">
        {token ? `${token}` : "No token"}
      </h2>

      {isTokenReceived && (
        <div>
          <label htmlFor="password">password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-gray-900"
            id="password"
            type="text"
            value={password.password}
            onChange={(e) =>
              setPassword({ ...password, password: e.target.value })
            }
            placeholder="password"
          />
          <hr />
          <label htmlFor="confirmation">password confirmation</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-gray-900"
            id="confirmation"
            type="text"
            value={password.confirmPassword}
            onChange={(e) =>
              setPassword({ ...password, confirmPassword: e.target.value })
            }
            placeholder="password confirmation"
          />
          <button
            onClick={resetUserPassword}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            disabled={buttonDisabled}
          >
            {buttonDisabled ? "Reset Password" : "No Reset Password"}
          </button>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;
