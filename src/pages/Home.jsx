import Weather from "../components/Weather";
import UpcomingClass from "../components/UpcomingClass";
import { useAuth } from "../hooks/auth";
import { useUserInfo } from "../hooks/userInfo";

const Home = () => {
  const user = useAuth()
  const userInfo = useUserInfo()

  return (
    <>
      <div className="bg-blue-500 min-h-screen pb-16">
        <Weather />
        {user && <UpcomingClass />}
      </div>
    </>
  );
};
export default Home;
