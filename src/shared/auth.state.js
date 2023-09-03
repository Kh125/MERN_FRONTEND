import axios from "axios";
import { atom } from "recoil";

const fetchCurrentUser = ({ onSet }) => {
  onSet(async (newValue) => {
    if (newValue) {
      try {
        const response = await axios.get("/api/routes/getcurrentuser");

        if (response.statusText == "OK") {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      localStorage.clear();
    }
  });
};

export const auth = atom({
  key: "auth",
  default: false,
  effects: [fetchCurrentUser],
});
