import { signOut } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { auth, db } from "../firebase/firebaseConfig";
import Edit from "./Edit";

const Dashboard = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [topics, setTopics] = useState();
  const [tuvung, setTuvung] = useState();
  const [users, setUsers] = useState();
  const colRef = collection(db, "Chude");
  const colRefTuVung = collection(db, "tuvung");
  const colRefUser = collection(db, "user");
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
  // nguoi dung
  useEffect(() => {
    onSnapshot(colRefUser, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data() });
      });
      setUsers(users);
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
              src="https://i.pinimg.com/236x/a7/80/80/a7808059330f062de8a90e844d0558d1.jpg"
              alt=""
              className="w-full h-full object-cover rounded-full "
            />
          </div>
          <h3 className="text-lg font-semibold text-left mb-7">
            {userInfo?.displayName}
          </h3>
        </div>
        <div
          className="logout  h-10 rounded-lg bg-red-600 flex justify-center items-center text-white absolute right-2 top-0 cursor-pointer p-3 mt-3 "
          onClick={handleSignOut}
        >
          Đăng xuất
        </div>
        <div className="line w-full h-[0.5px] bg-slate-600 my-2 rounded-md"></div>
        {/* edits */}
        <div className="w-full flex flex-wrap gap-x-5 gap-y-3 items-center justify-between">
          <Edit name={"Chủ đề"} length={topics?.length} url="/chude"></Edit>
          <Edit name={"Từ vựng"} length={tuvung?.length} url={"/tuvung"}></Edit>
          <Edit name={"Người dùng"} length={users?.length} url={"/user"}></Edit>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
