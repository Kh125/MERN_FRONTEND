import Weather from "../components/Weather";
import UpcomingClass from "../components/UpcomingClass";
import { useAuth } from "../hooks/auth";
import { useUserInfo } from "../hooks/userInfo";

const Home = () => {
  const user = useAuth()
  const userInfo = useUserInfo()

  return (
    <>
      <Weather />
      {user && <UpcomingClass />}
    </>
  );
};
export default Home;
