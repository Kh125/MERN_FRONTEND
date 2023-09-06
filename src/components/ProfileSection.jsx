import { adventurerNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import React, { useMemo } from "react";
import { convert } from "../utils/expend";

const ProfileSection = ({ user }) => {
  const avatar = useMemo(() => {
    return createAvatar(adventurerNeutral, {
      seed: user._id,
    }).toDataUriSync();
  }, []);
  const year = convert(user.academicYear);
  const major = convert(user.major);

  return (
    <>
      <div className="w-full pt-20 px-4 my-10 font-mono">
        <p className="text-3xl font-semibold space-x-5"> Student Profile</p>
      </div>
      <div className="border shadow-md rounded-lg border-amber-500 px-4 m-1 py-4 bg-blue-200 font-mono">
        <div className="flex items-center justify-start">
          <img
            src={avatar}
            className="w-28 h-28 rounded-full border-2 border-sky-500"
            alt="user profile"
          />
          <div className="pl-10 flex flex-col h-full justify-around">
            <p className="text-2xl font-semibold text-stone-900 space-x-2 capitalize ">
              {user.username}
            </p>
            <span
              className="text-lg text-gray-600 font-semibold capitalize
            "
            >
              {user.studentId}
            </span>
          </div>
        </div>
        <div className="flex w-full justify-around items-center pt-4">
          <div>
            <p className="text-lg font-semibold text-stone-600">Major</p>
            <p className="text-lg font-semibold text-stone-600">Year</p>
            <p className="text-lg font-semibold text-stone-600">Email</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-stone-900">{major}</p>
            <p className="text-lg font-semibold text-stone-900">{year}</p>
            <p className="text-lg font-semibold text-stone-900">{user.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
