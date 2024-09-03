import React, { useState } from "react";
import FormInput from "../FormInput";
import SlickButton from "../SlickButton";
import GoogleButton from "../GoogleButton";

export type UserType = {
  firstname: string;
  lastname: string;
  email: string;
  phoneno: string;
  address: string;
};

export const userInitialState = {
  firstname: "",
  lastname: "",
  email: "",
  phoneno: "",
  address: "",
};

const PersonalInfo = ({
  data: user,
  setData,
}: {
  data: UserType;
  setData: any;
}) => {
  const [showValid, setShowValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData("user", {
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="px-4 sm:px-8 py-0 md:px-10 md:py-2 md:overflow-y-auto">
      <form action="" method="post" className="md:p-5 p-4">
        <div className="mb-2">
          <div className="input-con mb-4 flex flex-wrap justify-between gap-3">
            <div className="flex-1 mt-2">
              <label className="block mb-2 text-gray-500" htmlFor="category">
                Firstname
              </label>

              <div className="flex flex-wrap justify-between gap-3">
                <FormInput
                  className={
                    showValid && !user.firstname ? "border-red-400" : ""
                  }
                  placeholder="Demetrous"
                  value={user.firstname}
                  type="text"
                  name="firstname"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex-1 mt-2">
              <label className="block mb-2 text-gray-500" htmlFor="category">
                Lastname
              </label>

              <div className="flex flex-wrap justify-between gap-3">
                <FormInput
                  className={
                    showValid && !user.lastname ? "border-red-400" : ""
                  }
                  placeholder="Johnson"
                  value={user.lastname}
                  type="text"
                  name="lastname"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="input-con mb-4">
            <label className="block mb-2 text-gray-500" htmlFor="category">
              Address
            </label>

            <div className="flex flex-wrap justify-between gap-3">
              <FormInput
                className={showValid && !user.address ? "border-red-400" : ""}
                name="address"
                placeholder="8, Lockwoods New Orleans"
                value={user.address}
                type="address"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-con mb-4 flex flex-wrap justify-between gap-3">
            <div className="flex-1 mt-2">
              <label className="block mb-2 text-gray-500" htmlFor="category">
                Phone Number
              </label>

              <div className="flex flex-wrap justify-between gap-3">
                <FormInput
                  className={showValid && !user.phoneno ? "border-red-400" : ""}
                  name="phoneno"
                  placeholder="324567867"
                  value={user.phoneno}
                  type="number"
                  onChange={(e) => {
                    if (+e.target.value < 0) return;
                    handleChange(e);
                  }}
                />
              </div>
            </div>

            <div className="flex-1 mt-2">
              <label className="block mb-2 text-gray-500" htmlFor="category">
                Email Address
              </label>

              <div className="flex flex-wrap justify-between gap-3">
                <FormInput
                  className={showValid && !user.email ? "border-red-400" : ""}
                  name="email"
                  placeholder="test@gmail.com"
                  value={user.email}
                  type="email"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
