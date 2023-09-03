import React from "react";

const Profile = () => {
  return (
    <>
      <div>
        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li class="mr-2">
            <a
              href="#"
              aria-current="page"
              class="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
            >
              User Profile
            </a>
          </li>
          <li class="mr-2">
            <a
              href="#"
              class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >
              Major
            </a>
          </li>
          <li class="mr-2">
            <a
              href="#"
              class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >
              Settings
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Profile;
