import React, { FC } from "react";

interface IAuthImagePatternProps {
  title: string;
  subtitle: string;
  bgImage: string;
}

const AuthImagePattern: FC<IAuthImagePatternProps> = ({
  title,
  subtitle,
  bgImage,
}) => {
  return (
    <div className="flex justify-center items-center gap-2 flex-col">
      <img src={bgImage} alt="ChatIt" width={500} />
      <h1 className="text-3xl font-semibold">{title}</h1>
      <h4 className="text-xl text-center">{subtitle}</h4>
    </div>
  );
};

export default AuthImagePattern;
