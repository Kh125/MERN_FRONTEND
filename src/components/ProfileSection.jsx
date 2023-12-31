import { adventurerNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import React, { useMemo, useState } from "react";
import { convert } from "../utils/expend";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../shared/auth.state";

const ProfileSection = ({ user }) => {
  const [isAuth, setIsAuth] = useRecoilState(auth);
  const navigate = useNavigate();
  const year = convert(user.academicYear);
  const major = convert(user.major);

  const avatar = useMemo(() => {
    return createAvatar(adventurerNeutral, {
      seed: user._id,
    }).toDataUriSync();
  }, []);

  const onLogout = async () => {
    if (navigator?.serviceWorker?.controller) {
      navigator.serviceWorker.controller.postMessage({ action: "logout" });
    }

    await axios.post("/api/routes/logout").then(() => {
      setIsAuth(false);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    });
  };

  return (
    <>
      <div className=" font-mono shadow-xl rounded-lg  w-full h-screen flex flex-col items-center">
        <div className="text-center text-white text-4xl font-bold uppercase mt-4 mb-6">
          <p>Profile</p>
        </div>
        <div className="photo-wrapper p-2 mt-10 mb-8 text-2xl font-semibold">
          <img
            className=" w-40 h-40 rounded-full mx-auto border-white border-4"
            src={avatar}
            alt="John Doe"
          />
          <h3 className="text-center text-white text-xl font-bold leading-12 uppercase mt-6">
            {user.username}
          </h3>
        </div>
        <div className="py-6 px-6 text-blue-700 bg-white rounded-xl shadow-md">
          <div className="flex w-full justify-center items-center">
            <div>
              <p className="px-2 py-2 font-semibold">Student ID</p>
              <p className="px-2 py-2 font-semibold">Email</p>
              <p className="px-2 py-2 font-semibold">Major</p>
              <p className="px-2 py-2 font-semibold">Academic Year</p>
            </div>
            <div>
              <p className="px-2 py-2">{user.studentId}</p>
              <p className="px-2 py-2">{user.email}</p>
              <p className="px-2 py-2">{major}</p>
              <p className="px-2 py-2">{year}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex item-center justify-center mt-10">
          <button
            onClick={onLogout}
            type="button"
            className="flex items-center justify-center text-blue-700 bg-white font-semibold rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
