"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [resetEmail, setResetEmail] = React.useState("");

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isResetClicked, setIsResetClicked] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      // POST request is sended to the route file here
      const response = await axios.post("/api/users/login", user);
      //! console.log("Login success", response.data);
      // Toast message
      toast.success("Login success");
      // Redirecting to the profile page
      router.push("/profile");
    } catch (err: any) {
      //! console.log("Login failed", err.message);
      toast.error(err.message);
    } finally {
      // Loading is done
      setLoading(false);
    }
  };

  const onReset = async () => {
    try {
      await axios.post("/api/users/resetemail", resetEmail);
      toast.success("Check your mailbox, please!");
      router.push("/login");
    } catch (err: any) {
      toast.error("Something went wrong!");
      router.push("/login");
    }
  };

  // Disabling or Enabling the button
  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {isResetClicked ? (
        <div>
          <Toaster />
          <h1>{loading ? "Proccessing..." : "Login"}</h1>
          <hr />
          <label htmlFor="email">email</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-gray-900"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
          />
          <label htmlFor="password">password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-gray-900"
            id="password"
            type="text"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
          />
          <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            disabled={buttonDisabled}
          >
            {buttonDisabled ? "No Login" : "Login"}
          </button>

          <div className="flex flex-row p-4">
            <Link className="me-4" href="/signup">
              Create an account
            </Link>
            <a
              className="ms-4"
              onClick={() => {
                setIsResetClicked;
              }}
            >
              Forgot password?
            </a>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <label htmlFor="email">email</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-gray-900"
            id="password"
            type="text"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            placeholder="password"
          />
          <button
            onClick={onReset}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            disabled={buttonDisabled}
          >
            {buttonDisabled ? "No Login" : "Login"}
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
