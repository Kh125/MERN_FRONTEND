import axios from "axios";
import { atom } from "recoil";

const fetchCurrentUser = ({ onSet }) => {
  onSet(async (newValue) => {
    if (newValue) {
      try {
        const response = await axios.get("/api/routes/getcurrentuser");
        console.log(response);
        if (response.statusText == "OK") {
          localStorage.setItem("user", JSON.stringify(response.data));
          const scheduleRes = await axios.get("/api/routes/getSchedules")
          if (scheduleRes.status == 200) {
            const scheduleData = scheduleRes.data[0]
            // storeDataInIndexedDB(scheduleData.Schedule)
          }
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      localStorage.clear();
      // deleteIndexedDBDatabase("uniNotify")
    }
  });
};

export const auth = atom({
  key: "auth",
  default: false,
  effects: [fetchCurrentUser],
});
