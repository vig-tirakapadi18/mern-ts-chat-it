import React, { FC, FormEvent, useState } from "react";

interface IFormDataState {
  fullName: string;
  email: string;
  password: string;
}

const SignUp: FC = (): React.JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>();
  const [formData, setFormData] = useState<IFormDataState>({
    fullName: "",
    email: "",
    password: "",
  });

  const validateFromData = () => {};

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <section className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
