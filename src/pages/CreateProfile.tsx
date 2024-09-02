import React, { useState } from "react";
import PersonalInfo from "../components/Steps/PersonalInfo";
import Education from "../components/Steps/Education";
import Skill from "../components/Steps/Skill";
import Project from "../components/Steps/Project";
import Social from "../components/Steps/Social";

const CreateProfile = () => {
  const [step, setStep] = useState(0);

  const stepPage = [
    {
      title: "Personal Info",
      page: <PersonalInfo />,
    },
    {
      title: "Education",
      page: <Education />,
    },
    {
      title: "Skill",
      page: <Skill />,
    },
    {
      title: "Projects",
      page: <Project />,
    },
    {
      title: "Socials",
      page: <Social />,
    },
  ];

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-3">
        <div className="text-2xl text-blue-900">{stepPage[step].title}</div>
        <div className="flex flex-row gap-2">
          {stepPage.map((_, id) => (
            <button key={id} onClick={() => setStep(id)} className="">
              <div
                className={`rounded-full w-[30px] h-[30px] flex justify-center items-center text-white ${
                  step === id ? "bg-gray-800" : "bg-gray-500"
                }`}
              >
                <p>{id + 1}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {stepPage[step].page}
    </div>
  );
};

export default CreateProfile;
