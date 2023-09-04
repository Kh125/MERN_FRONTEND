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
      <div class="w-full  bg-white py-5  shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col items-center pb-10">
          <img
            class="w-24 h-24 mb-3 rounded-full shadow-lg border-2 border-cyan-700 p-1"
            src={avatar}
            alt="Bonnie image"
          />
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user.username}
          </h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {user.studentId}
          </span>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
