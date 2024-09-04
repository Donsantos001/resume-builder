import React from "react";
import FormInput from "../FormInput";
import FormTextArea from "../FormTextArea";
import SlickLabel from "../SlickLabel";
import ImageWithFallback from "../ImageWithFallback";

export type UserType = {
  firstname: string;
  lastname: string;
  email: string;
  phoneno: string;
  address: string;
  bio: string;
  image?: string;
};

export const userInitialState = {
  firstname: "",
  lastname: "",
  email: "",
  phoneno: "",
  address: "",
  bio: "",
  image: "",
};

const PersonalInfo = ({
  data: user,
  showValid = false,
  setData,
}: {
  data: UserType;
  showValid?: boolean;
  setData: any;
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData("user", {
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="px-4 sm:px-8 py-0 md:px-10 md:py-2 md:overflow-y-auto">
      <div className="md:p-5 p-4">
        <div className="mb-2">
          <div className="w-[200px] h-[200px] rounded-xl overflow-hidden relative">
            <ImageWithFallback
              primaryUrl={user.image}
              fallbackUrl={"https://placeholder.co/200"}
              className="w-full h-full object-cover"
              alt=""
            />
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setData("user", {
                  ...user,
                  image: e.target.files
                    ? URL.createObjectURL(e.target.files[0])
                    : "",
                });
              }}
              className="hidden"
            />
            <div className="absolute transition-all opacity-0 hover:opacity-100 top-0 left-0 w-full h-full flex items-center justify-center bg-[#00000022]">
              <label htmlFor="image" className="w-min">
                <SlickLabel title="Choose" />
              </label>
            </div>
          </div>

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

          <div className="input-con mb-4 flex flex-wrap justify-between gap-3">
            <div className="flex-1 mt-2">
              <label className="block mb-2 text-gray-500" htmlFor="category">
                Address
              </label>

              <div className="flex flex-wrap justify-between gap-3">
                <FormInput
                  className={showValid && !user.address ? "border-red-400" : ""}
                  name="address"
                  placeholder="8, Lockwoods New Orleans"
                  value={user.address}
                  type="text"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex-1 mt-2">
              <label className="block mb-2 text-gray-500" htmlFor="category">
                Bio
              </label>

              <div className="flex flex-wrap justify-between gap-3">
                <FormTextArea
                  // className={showValid && !user.bio ? "border-red-400" : ""}
                  name="bio"
                  placeholder="Experienced Software Developer with X years in React, Javascript,and Typescript. Passionate about integrating embedded systems with machine learning. Seeking to innovate and create impactful technology solutions"
                  value={user.bio}
                  type="text"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
