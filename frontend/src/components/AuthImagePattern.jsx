import React from "react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex justify-center items-center p-10 bg-base-200 mr-4">
      <div className="text-center">
        {/* Pattern box */}
        <div className="flex justify-center m-2">
          <div className="bg-black p-4 rounded-3xl">
            <div className="flex max-w-md justify-around h-96 w-96 flex-wrap">
              <div className="aspect-square size-28 bg-[#2E1C1C] mt-2 rounded-2xl animate-pulse"></div>
              <div className="aspect-square size-28 bg-[#2E1C1C] mt-2 rounded-2xl"></div>
              <div className="aspect-square size-28 bg-[#2E1C1C] mt-2 rounded-2xl animate-pulse"></div>
              <div className="aspect-square size-28 bg-[#2E1C1C] mt-2 rounded-2xl"></div>
              <div className="aspect-square size-28 bg-[#2E1C1C] mt-2 rounded-2xl animate-pulse"></div>
              <div className="aspect-square size-28 bg-[#2E1C1C] mt-2 rounded-2xl"></div>
              <div className="aspect-square size-28 bg-[#2E1C1C] mt-2 rounded-2xl animate-pulse"></div>
              <div className="aspect-square size-28 bg-[#2E1C1C] mt-2 rounded-2xl"></div>
              <div className="aspect-square size-28 bg-[#2E1C1C] mt-2 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="text-2xl font-bold mb-4">{title}</div>
        <div className="text-base-content/60 break-words whitespace-normal px-24">
          {subtitle}
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
