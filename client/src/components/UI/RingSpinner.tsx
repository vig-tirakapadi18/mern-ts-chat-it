import React, { FC } from "react";
import ringSpinner from "../../assets/ring-spinner.svg";

interface IRingSpinnerProps {
  width?: number;
  height?: number;
}

const RingSpinner: FC<IRingSpinnerProps> = ({ width, height }) => {
  return (
    <div className="fle justify-center items-center">
      <img src={ringSpinner} alt="Loading..." height={height} width={width} />
    </div>
  );
};

export default RingSpinner;
