import React, { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [userInfo, setUserInfo] = useState("");
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  // onAuthStateChanged(auth, (currentUser) => {
  //   if (currentUser) {
  //     setUserInfo(currentUser);
  //   } else {
  //     setUserInfo("");
  //   }
  // });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cred = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    setUserInfo(cred);
    navigate("/dashboard");
    // await updateProfile(auth.currentUser, { displayName: "AdminPro" });
    // setUserInfo(user);
    // const adminRef = collection(db, "admin");
    // await addDoc(adminRef, {
    //   email: values.email,
    //   password: values.password,
    //   id: user.user.uid,
    // });
  };

  return (
    <div className=" w-full max-w-[940px] mx-auto my-10 rounded-lg flex shadow-xl overflow-hidden gap-x-3">
      <div className=" flex-1 pl-2 pt-8">
        <h1 className="font-semibold text-3xl mb-3">Welcome Back</h1>
        <h4 className="text-slate-400">
          Welcome back! Please enter your details
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="w-full flex-col text-left mb-4">
            <label htmlFor="email" className="font-semibold text-slate-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-4 rounded-lg bg-white border-slate-400 border outline-none mt-2 font-medium"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex-col text-left mb-4">
            <label htmlFor="password" className="font-semibold text-slate-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your email"
              className="w-full p-4 rounded-lg bg-white border-slate-400 border outline-none mt-2 font-medium"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <button className="w-full p-4 rounded-lg bg-purple-500 text-white font-medium">
            Đăng Nhập
          </button>
        </form>
      </div>

      <div className="bg-slate-400  flex-1">
        <img
          src="https://blog.spoongraphics.co.uk/wp-content/uploads/2017/landscape-illustrations/3.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignIn;
