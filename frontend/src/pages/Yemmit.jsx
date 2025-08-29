import React from "react";
import Lanyard from "../components/Lanyard";
import CommingSoon from "../components/CommingSoon";
const Yemmit = () => {
  return (
    <div className="relative">
      <CommingSoon title="Yemmit Section" />
      <div className="absolute bottom-20 w-full">
        <Lanyard />
      </div>
    </div>
  );
};

export default Yemmit;
