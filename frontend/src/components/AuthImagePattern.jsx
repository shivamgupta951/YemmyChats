import { Cookie } from "lucide-react";
import React from "react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex justify-center items-center p-10 bg-base-300 rounded-lg mr-4 border border-gray-800">
      <div className="text-center">
        {/* Pattern box */}
        <div className="flex justify-center m-2">
          <div className="bg-black p-4 rounded-3xl shadow-md shadow-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-90">
            <div className="flex max-w-md justify-around h-96 w-96 flex-wrap">
              <div className="aspect-square size-28 bg-[#221d35] mt-2 rounded-2xl animate-pulse"></div>
              <div className="aspect-square size-28 bg-[#221d35] mt-2 rounded-2xl"></div>
              <div className="aspect-square size-28 bg-[#221d35] mt-2 rounded-2xl animate-pulse"></div>
              <div className="aspect-square size-28 bg-[#221d35] mt-2 rounded-2xl"></div>
              <div className="aspect-square size-28 bg-[#221d35] mt-2 rounded-2xl animate-pulse"></div>
              <div className="aspect-square size-28 bg-[#221d35] mt-2 rounded-2xl"></div>
              <div className="aspect-square size-28 bg-[#221d35] mt-2 rounded-2xl animate-pulse"></div>
              <div className="aspect-square size-28 bg-[#221d35] mt-2 rounded-2xl"></div>
              <div className="aspect-square size-28 bg-[#221d35] mt-2 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="text-2xl font-bold mb-4">{title} <span className="text-yellow-700 shadow-md">Yemmy Chats</span></div>
          <Cookie className="text-yellow-500"/>
        </div>
        <div className="text-base-content/60 break-words whitespace-normal px-24">
          {subtitle}
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
