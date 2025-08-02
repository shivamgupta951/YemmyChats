import { ArrowBigLeft, MoveLeft } from "lucide-react";
import React from "react";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
const CommunitySection = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div>
        <div className="flex justify-end items-end my-5">
          <button
            className="btn btn-outline btn-accent btn-sm flex items-center gap-2 tracking-tight"
            onClick={() => navigate("/")}
          >
            <Home size={20} />
            Back To Home
          </button>
        </div>
        <h1 className="p-10 border rounded-ss-2xl rounded-ee-2xl px-60 border-success bg-base-300 text-3xl font-bold ">
          Comming Soon!
        </h1>
      </div>
    </div>
  );
};

export default CommunitySection;
