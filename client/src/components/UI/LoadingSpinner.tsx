import React, { FC } from "react";
import loadingSpinner from "../../assets/spinner.svg";

interface ILoadingSpinnerProps {
  height?: number;
  width?: number;
}

const LoadingSpinner: FC<ILoadingSpinnerProps> = ({
  height,
  width,
}): React.JSX.Element => {
  return (
    <div className="flex justify-center items-center h-screen">
      <img
        src={loadingSpinner}
        alt="Loading..."
        width={width}
        height={height}
      />
    </div>
  );
};

export default LoadingSpinner;
