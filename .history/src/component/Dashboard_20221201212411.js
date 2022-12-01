import { signOut } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { auth, db } from "../firebase/firebaseConfig";

const Dashboard = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [topics, setTopics] = useState();
  const [tuvung, setTuvung] = useState();
  const colRef = collection(db, "Chude");
  const colRefTuVung = collection(db, "tuvung");

  useEffect(() => {
    if (!userInfo.displayName) {
      navigate("/");
    }
  }, [navigate, userInfo.displayName]);

  // chu de
  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setTopics(users);
    });
  }, []);

  // tuvung
  useEffect(() => {
    onSnapshot(colRefTuVung, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setTuvung(users);
    });
  }, []);
  const handleSignOut = (e) => {
    signOut(auth);
    navigate("/");
  };
  return (
    <div className="">
      <div className="max-w-[1240px] bg-white h-full w-full mx-auto mt-10  p-5 rounded-lg relative">
        <div>
          <div className="avatar w-[60px] h-[60px] rounded-full mb-2">
            <img
              src="https://i.pinimg.com/236x/71/80/e3/7180e3298141fc4533bc4cd6e70ee9e7.jpg"
              alt=""
              className="w-full h-full object-cover rounded-full "
            />
          </div>
          <h3 className="text-lg font-semibold text-left mb-7">
            {userInfo.displayName}
          </h3>
        </div>
        <div
          className="logout  h-10 rounded-lg bg-red-600 flex justify-center items-center text-white absolute right-0 top-0 cursor-pointer p-3"
          onClick={handleSignOut}
        >
          Đăng xuất
        </div>
        <div className="line w-full h-[0.5px] bg-slate-600 my-2 rounded-md"></div>
        {/* edits */}
        <div className="w-full flex flex-wrap gap-x-5 items-center justify-between">
          <div className="border relative text-left p-4 max-w-[500px] w-full">
            <h4 className="font-medium mb-2">Chủ đề</h4>
            <p className="absolute  right-2 top-2 py-1 rounded-full px-2  text-center  bg-slate-600  text-white ">
              {topics?.length}
            </p>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => navigate("/chude")}
            >
              Edit
            </button>
          </div>

          <div className="border relative text-left p-4 max-w-[500px] w-full">
            <h4 className="font-medium mb-2">Từ vựng</h4>
            <p className="absolute px-2 py-1 right-2 top-2 rounded-full bg-slate-600 text-white text-center">
              {tuvung?.length}
            </p>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => navigate("/tuvung")}
            >
              Edit
            </button>
          </div>

          <div className="border relative text-left p-4 max-w-[500px] w-full ">
            <h4 className="font-medium mb-2">Người dùng</h4>
            <p className="absolute px-2 py-1 right-2 top-2 rounded-full bg-slate-600 text-white text-center">
              {tuvung?.length}
            </p>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => navigate("/user")}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
