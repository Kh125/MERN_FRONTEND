import { adventurerNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import React, { useMemo } from "react";

const ProfileSection = ({ user }) => {
  const avatar = useMemo(() => {
    return createAvatar(adventurerNeutral, {
      seed: user._id,
    }).toDataUriSync();
  }, []);
  return (
    <>
      <div>
        <p>Profile</p>
      </div>
      <div className="w-full flex justify-center items-center  bg-white py-5  shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col">
          <div className="flex w-full flex-row items-center justify-evenly ">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg border-2 border-cyan-700 p-1"
              src={avatar}
              alt="User Profile"
            />
            <div>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {user.username}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user.studentId}
              </span>
            </div>
          </div>
          <div>
            <p>{user.major}</p>
            <p>{user.academicYear}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
