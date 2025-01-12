import React from "react";
import Button from "@mui/material/Button";

export default function Submit({ onClick }) {
  const handleClick = () => {
    console.log("pressed");
    onClick();
  };

  return (
    <div className="w-full">
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        fullWidth
      >
        Submit
      </Button>
    </div>
  );
}
