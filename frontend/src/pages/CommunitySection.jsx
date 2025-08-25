import { ArrowBigLeft, MoveLeft } from "lucide-react";
import React from "react";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CommingSoon from "../components/CommingSoon";
const CommunitySection = () => {
  const navigate = useNavigate();
  return (
    <div>
      <CommingSoon title="Community Section"/>
    </div>
  );
};

export default CommunitySection;
