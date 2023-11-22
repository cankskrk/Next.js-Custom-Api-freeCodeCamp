"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const ResetPasswordPage = () => {
  const resetUserPassword = async () => {
    try {
      await axios.post("/api/users/resetemail");
    } catch (err: any) {
      setError(true);
    }
  };

  const [error, setError] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Reset Password</h1>
      <div>
        <label htmlFor="password">password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-gray-900"
          id="password"
          type="text"
          // value={password.password}
          // onChange={(e) =>
          //   setPassword({ ...password, password: e.target.value })
          // }
          placeholder="password"
        />
        <hr />
        <label htmlFor="confirmation">password confirmation</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-gray-900"
          id="confirmation"
          type="text"
          // value={password.confirmPassword}
          // onChange={(e) =>
          //   setPassword({ ...password, confirmPassword: e.target.value })
          // }
          placeholder="password confirmation"
        />
        <button
          // onClick={resetUserPassword}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          // disabled={buttonDisabled}
        >
          {/* {buttonDisabled ? "Reset Password" : "No Reset Password"} */}
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
