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

const EditTVung = () => {
  const [vocabularies, setVocabularies] = useState();
  // state
  const [idTopic, setIdTopic] = useState();
  const [idVoc, setIdVoc] = useState();
  const [urlVoc, setUrlVoc] = useState();
  const [vocName, setVocName] = useState();
  const [vocDefine, setVocDefine] = useState();
  const [phienAm, setPhienAm] = useState();
  const [idRm, setIdRm] = useState();
  const [listTopic, setListTopic] = useState();
  const colRef = collection(db, "tuvung");
  const colRefTopic = collection(db, "Topic");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      let vocs = [];
      snapshot.docs.forEach((doc) => {
        vocs.push({ id: doc.id, ...doc.data() });
      });
      setVocabularies(vocs);
    });
  }, [colRef]);
  useEffect(() => {
    onSnapshot(colRefTopic, (snapshot) => {
      let newAr = [];

      snapshot.docs.forEach((doc) => {
        newAr.push({ id: doc.id, data: doc.data().Name });
      });
      setListTopic(newAr);
    });
  }, [colRefTopic]);

  const form = document.querySelector("form");
  const handleAddVoc = (e) => {
    e.preventDefault();
    addDoc(colRef, {
      Hinh: urlVoc,
      IdTopic: idTopic,
      MaTV: idVoc,
      Name: vocName,
      Nghia: vocDefine,
      Phienam: phienAm,
    })
      .then(() => {
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
      })
      .catch((err) => {
        toast.error("Thất bại !!!");
      });
  };
  const formRm = document.querySelector("#frm");
  const handleRemoveVoc = async (e) => {
    e.preventDefault();
    const colRefVoc = doc(db, "tuvung", idRm);
    await deleteDoc(colRefVoc);
    toast.success(" Xóa thành công !");
    formRm.reset();
  };

  return (
    <>
      <div className="p-10 flex">
        <div className="max-w-[500px] mx-auto w-full bg-white shadow-lg p-5 mb-10 rounded-lg">
          <form onSubmit={handleAddVoc}>
            {/* <input
            type="text"
            className="p-3 rounded-lg border border-gray-200 w-full mb-5 outline-none focus:border-green-500 border-x-2"
            placeholder="Nhập mã chủ đề "
            name="MaChuDe"
            onChange={(e) => setIdTopic(e.target.value)}
          /> */}
            <input
              type="text"
              className="p-3 rounded-lg border border-gray-200 w-full mb-5 outline-none focus:border-green-500 border-x-2"
              placeholder="Nhập mã từ vựng"
              name="MaTuVung"
              onChange={(e) => setIdVoc(e.target.value)}
            />
            <input
              type="url"
              className="p-3 rounded-lg border border-gray-200 w-full mb-5 outline-none focus:border-green-500 border-x-2"
              placeholder="Nhập url hình ảnh"
              name="Url"
              onChange={(e) => setUrlVoc(e.target.value)}
            />
            <span
              onClick={(e) => setOpen(!open)}
              className="block my-2 bg-white text-black p-4 rounded-lg shadow-lg w-full font-semibold text-left"
            >
              {idTopic ? title : "Ma chu de"}
            </span>
            {open &&
              listTopic.map((topic) => (
                <div
                  className="w-full bg-blue-400 text-left pl-3 cursor-pointer font-normal mb-1 rounded-lg text-white"
                  key={topic.id}
                  onClick={() => {
                    console.log(topic.id);
                    setOpen(false);
                    setTitle(topic.data);
                    setIdTopic(topic.id);
                  }}
                >
                  {topic.data}
                </div>
              ))}
            <input
              type="text"
              className="p-3 rounded-lg border border-gray-200 w-full mb-5 outline-none focus:border-green-500 border-x-2"
              placeholder="Tên từ  vựng"
              name="Name"
              onChange={(e) => setVocName(e.target.value)}
            />
            <input
              type="text"
              className="p-3 rounded-lg border border-gray-200 w-full mb-5 outline-none focus:border-green-500 border-x-2"
              placeholder="Nghĩa"
              name="Define"
              onChange={(e) => setVocDefine(e.target.value)}
            />
            <input
              type="text"
              className="p-3 rounded-lg border border-gray-200 w-full mb-5 outline-none focus:border-green-500 border-x-2"
              placeholder="Phiên âm"
              name="Phienam"
              onChange={(e) => setPhienAm(e.target.value)}
            />
            <button
              type="submit"
              className="p-3 bg-blue-500 text-white rounded-lg text-sm font-semibold"
            >
              Thêm từ vựng
            </button>
          </form>
        </div>
        <div className="max-w-[500px] mx-auto w-full bg-white shadow-lg p-5 mb-10 rounded-lg">
          <form onSubmit={handleRemoveVoc} id="frm">
            <input
              type="text"
              className="p-3 rounded-lg border border-gray-200 w-full mb-5 outline-none focus:border-green-500 border-x-2"
              placeholder="Nhập mã từ vựng"
              name="MaTuVung"
              onChange={(e) => setIdRm(e.target.value)}
            />
            <button className="p-3 rounded-lg bg-red-500 text-white ">
              Xóa Từ vựng
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center gap-x-3">
        <button
          className="bg-slate-500 p-4 text-white rounded-lg mb-5"
          onClick={(e) => navigate("/dashboard")}
        >
          Quay lại
        </button>
        <button
          className="bg-slate-500 p-4 text-white rounded-lg mb-5"
          onClick={() => setShow(!show)}
        >
          {show ? "Ẩn bớt" : "Hiển thị"}
        </button>
      </div>

      {/* table */}
      {show && (
        <div className="rounded-lg  shadow-lg  max-w-[1280px] mx-auto">
          <table cellspacing="0" className="w-full" id="tv">
            <tr className="">
              <th className="font-semibold py-4 bg-slate-300">Hình</th>
              <th className="font-semibold py-4 bg-slate-300">Mã chủ đề</th>
              <th className="font-semibold py-4 bg-slate-300">Mã từ vựng</th>
              <th className="font-semibold py-4 bg-slate-300">Tên từ vựng</th>
              <th className="font-semibold py-4 bg-slate-300">Nghĩa </th>
              <th className="font-semibold py-4 bg-slate-300">Phiên âm</th>

              {/* <th width="230">Comments</th> */}
            </tr>
            {vocabularies.length > 0 &&
              vocabularies.map((voc) => (
                <tr key={voc.id} className="">
                  <td className="max-w-[100px] h-[100px]  overflow-hidden text-center p-3">
                    <img
                      src={voc.Hinh}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </td>
                  <td>{voc.IdTopic}</td>
                  <td>{voc.MaTV}</td>
                  <td>{voc.Name}</td>
                  <td>{voc.Nghia} </td>
                  <td>{voc.Phienam} </td>
                </tr>
              ))}
          </table>
        </div>
      )}
    </>
  );
};

export default EditTVung;
