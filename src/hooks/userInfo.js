import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const getUserInfo = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUserInfo(JSON.parse(storedUser));
            }
        };

        getUserInfo();
    }, []);

    useEffect(() => {
        if(userInfo && (!userInfo.major || !userInfo.studentId || !userInfo.academicYear)) {
            navigate("/info-setup")
        }
    }, [userInfo])


}