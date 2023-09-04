import axios from "axios";
import { atom, useRecoilState } from "recoil";

import { useEffect } from "react";
const schedulesState = atom({
  key: "schedulesState",
  default: null,
});

export const useSchedule = () => {
  const [schedules, setSchedules] = useRecoilState(schedulesState);
  const fetchSchedule = async () => {
    const response = await axios.get("/api/routes/getSchedules");
    if (response.status == 200) setSchedules(response.data);
  };
  useEffect(() => {
    fetchSchedule();
  }, []);
  return schedules;
};
