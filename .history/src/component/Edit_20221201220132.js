import React from "react";

const Edit = ({ name, length }) => {
  return (
    <div className="border relative text-left p-4 max-w-[500px] w-full">
      <h4 className="font-medium mb-2">{name}</h4>
      <p className="absolute w-8 h-8 justify-center right-2 flex items-center top-2 rounded-full bg-slate-600 text-white text-center">
        {length}
      </p>
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-lg"
        onClick={() => navigate("/chude")}
      >
        Edit
      </button>
    </div>
  );
};

export default Edit;
