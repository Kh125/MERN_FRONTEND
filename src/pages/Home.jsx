import Weather from "../components/Weather";
import UpcomingClass from "../components/UpcomingClass";
import { useAuth } from "../hooks/auth";

const Home = () => {
  const user = useAuth()
  
  return (
    <>
      <Weather />
      {user && (<UpcomingClass />)}
    </>
  );
};
export default Home;
