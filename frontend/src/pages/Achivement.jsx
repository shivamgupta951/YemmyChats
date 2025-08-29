import React from "react";
import Lanyard from "../components/Lanyard";
import CommingSoon from "../components/CommingSoon";
const Achivement = () => {
  return (
    <div className="relative">
      <CommingSoon title="Achivement Section" />
      <div className="absolute bottom-20 w-full">
        <Lanyard />
      </div>
    </div>
  );
};

export default Achivement;
