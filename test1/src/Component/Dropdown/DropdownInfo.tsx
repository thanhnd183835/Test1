import React, { useState } from "react";
import "./DropdownInfo.css";
import LockIcon from "@mui/icons-material/Lock";
const DropdownInfo = () => {
  return (
    <div className="dropdown">
      <div className="Item">
        <span>
          <LockIcon color="error" />
        </span>
        <span style={{ marginLeft: "5px" }}>Đăng xuất</span>
      </div>
    </div>
  );
};
export default DropdownInfo;
