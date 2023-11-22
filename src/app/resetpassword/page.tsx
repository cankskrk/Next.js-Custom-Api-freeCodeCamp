"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || ""); // avoid to get an undefined
  }, []);

  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  // const [buttonDisabled, setButtonDisabled] = useState(true);

  // useEffect(() => {
  //   if (
  //     password.password.length > 0 &&
  //     password.confirmPassword.length > 0 &&
  //     password.password === password.confirmPassword
  //   ) {
  //     setButtonDisabled(false);
  //   }
  // }, [password]);

  const resetUserPassword = async () => {
    try {
      await axios.post("/api/users/resetpassword", { ...password, token });
      router.push("/login");
    } catch (err: any) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      <h1 className="text-4xl">Reset Password</h1>
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
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
