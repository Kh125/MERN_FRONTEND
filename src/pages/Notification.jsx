import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/auth";
import RedirectComponent from "../components/Redirect";
import { useUserInfo } from "../hooks/userInfo";
import { getPeriodData } from "../utils/indexDB";
import NotiWidget from "../components/NotiWidget";

const Notification = () => {
  const user = useAuth();
  const userInfo = useUserInfo();
  const [notifiedPeriods, setNotifiedPeriods] = useState(null);
  const getNotifiedPeriods = async () => {
    const periods = await getPeriodData();
    setNotifiedPeriods(periods);
  };
  useEffect(() => {
    getNotifiedPeriods();
  }, []);

  return (
    <>
      {user ? (
        <div className="max-w-md mx-auto font-sans bg-blue-100 h-screen px-2 overflow-hidden">
          <div className="w-full pt-20 px-4 my-10 font-mono">
            <p className="text-3xl font-semibold space-x-5 text-blue-500">
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
