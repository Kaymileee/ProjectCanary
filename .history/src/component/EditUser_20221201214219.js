import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditUser = () => {
  const form = document.querySelector("#form");
  const formRm = document.querySelector("#frmRm");
  const [userId, setUserId] = useState();
  const [firstName, setFirstName] = useState();
  const [email, setEmail] = useState();
  const [lastName, setLastName] = useState();
  const [saveWords, setSaveWords] = useState([]);
  const [avatar, setAvatar] = useState();
  const [id, setId] = useState();
  const [users, setUsers] = useState();
  const [hide, setHide] = useState(false);
  const navigate = useNavigate();
  const colRef = collection(db, "user");
  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setUsers(users);
      console.log(users);
    });
  }, []);
  const handleAddUser = (e) => {
    e.preventDefault();
    addDoc(colRef, {
      avatar,
      email,
      firstName,
      lastName,
      SaveWords: saveWords,
    }).then(() => {
      toast.success("🦄 Tạo thành công !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      form.reset();
    });
  };
  const handleRemove = async (e) => {
    e.preventDefault();

    const colRefUser = doc(db, "user", id);
    await deleteDoc(colRefUser);
    toast.success(" Xóa thành công !");

    formRm.reset();
  };
  return (
    <>
      <div className="flex mt-10 p-10">
        <div className="max-w-[500px] mx-auto w-full bg-white shadow-lg p-5 mb-10 rounded-lg">
          <form onSubmit={handleAddUser} id="form">
            <input
              type="text"
              className="p-3 rounded-lg border border-gray-200 w-full mb-5 outline-none focus:border-green-500 border-x-2"
              placeholder="Nhập email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="url"
              className="p-3 rounded-lg border border-gray-200 w-full mb-5 outline-none focus:border-green-500 border-x-2"
              placeholder="Đường dẫn hình ảnh"
              name="avatar"
              onChange={(e) => setAvatar(e.target.value)}
            />
            <input
              type="text"
              className="p-3 rounded-lg border border-gray-200 w-full mb-5 outline-none focus:border-green-500 border-x-2"
              placeholder="Nhập họ"
              name="firstname"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              className="p-3 rounded-lg border border-gray-200 w-full mb-5 outline-none focus:border-green-500 border-x-2"
              placeholder="Nhập tên"
              name="lastname"
              onChange={(e) => setLastName(e.target.value)}
            />
            <button
              type="submit"
              className="p-3 bg-blue-500 text-white rounded-lg text-sm font-semibold"
            >
              Thêm người dùng
            </button>
          </form>
        </div>
        {/* remove by id */}
        <div className="max-w-[500px] mx-auto w-full bg-white shadow-lg p-5 mb-10 rounded-lg">
          <form onSubmit={handleRemove} id="frmRm">
            <input
              type="text"
              className="p-3 rounded-lg border border-gray-200 w-full mb-5 outline-none focus:border-green-500 border-x-2"
              placeholder="Mã người dùng"
              name="UserID"
              onChange={(e) => setId(e.target.value)}
            />

            <button
              type="submit"
              className="p-3 bg-red-500 text-white rounded-lg text-sm font-semibold"
            >
              Xóa người dùng
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center gap-x-3 mb-5">
        <button
          className="bg-slate-500 p-4 text-white rounded-lg mb-5"
          onClick={(e) => navigate("/dashboard")}
        >
          Quay lại
        </button>
        <button
          className="bg-slate-500 p-4 text-white rounded-lg mb-5"
          onClick={() => setHide(!hide)}
        >
          {hide ? "Ẩn bớt" : "Hiển thị"}
        </button>
      </div>
      <div className="p-10">
        {hide && (
          <div className="w-full mx-auto justify-between bg-white shadow-lg flex flex-wrap rounded-lg">
            <table cellspacing="0" className="w-full" id="tv">
              <tr className="">
                <th className="font-semibold py-4 bg-slate-300">Mã</th>
                <th className="font-semibold py-4 bg-slate-300">Hình</th>

                <th className="font-semibold py-4 bg-slate-300">Email</th>
                <th className="font-semibold py-4 bg-slate-300">Họ </th>
                <th className="font-semibold py-4 bg-slate-300">
                  Tên người dùng
                </th>
                <th className="font-semibold py-4 bg-slate-300">
                  Từ vựng đã lưu
                </th>

                {/* <th width="230">Comments</th> */}
              </tr>
              {users &&
                users.map((user) => (
                  <tr key={user.id} className="">
                    <td className="font-semibold">{user.id}</td>
                    <td className="w-[100px] h-[100px]  overflow-hidden text-center p-3">
                      <img
                        src={
                          user.avatar
                            ? user.avatar
                            : "https://i.pinimg.com/564x/20/5a/c8/205ac833d83d23c76ccb74f591cb6000.jpg"
                        }
                        alt=""
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </td>
                    <td className="text-left">{user.email}</td>

                    <td>{user.fristname}</td>
                    <td>{user.lastname}</td>
                    <td width={""}>{user.SaveWords?.length}</td>
                  </tr>
                ))}
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default EditUser;
