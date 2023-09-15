import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/auth";
import RedirectComponent from "../components/Redirect";
import { useUserInfo } from "../hooks/userInfo";
import { getPeriodData } from "../utils/indexDB";
import NotiWidget from "../components/NotiWidget";
import logo from "../assets/logo.svg";

const Notification = () => {
  const user = useAuth();
  const userInfo = useUserInfo();
  const [notifiedPeriods, setNotifiedPeriods] = useState(null);
  const getNotifiedPeriods = async () => {
    const periods = await getPeriodData();
    setNotifiedPeriods(periods.sort((a, b) => b.timestamp - a.timestamp));
  };

  useEffect(() => {
    getNotifiedPeriods();
  }, []);

  return (
    <>
      {user ? (
        <div className="max-w-md mx-auto font-mono bg-blue-500 h-screen px-2 overflow-hidden">
          <div className="px-2 mt-4  flex items-center">
            <img src={logo} className="w-14" alt="" />
            <p className="pl-2 text-lg text-white font-semibold"> Notify U</p>
          </div>
          <div className="w-full pt-20 px-4 my-10 font-mono">
            <p className="text-3xl font-semibold space-x-5 text-white">
              {" "}
              Notifications
            </p>
          </div>
          {notifiedPeriods &&
            notifiedPeriods.map((n) => <NotiWidget key={n.id} period={n} />)}
        </div>
      ) : (
        <RedirectComponent />
      )}
    </>
  );
};
export default Notification;
