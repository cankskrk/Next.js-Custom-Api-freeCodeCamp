"use client";

import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (err: any) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      <h1>Profile</h1>
      <hr />
      <h2 className="p-1 rounded bg-green-400">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded"
        onClick={onLogout}
      >
        Logout
      </button>

      <button
        className="bg-green-800 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded"
        onClick={getUserDetails}
      >
        Get User Details
      </button>
    </div>
  );
};

export default ProfilePage;
