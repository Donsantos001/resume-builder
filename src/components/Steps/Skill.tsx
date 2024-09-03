import React, { useState } from "react";
import FormInput from "../FormInput";

export type SkillType = {
  name: string;
};

export const skillInitialState = {
  name: "",
};

const Skill = ({
  data: skills,
  setData,
}: {
  data: SkillType[];
  setData: any;
}) => {
  const [showValid, setShowValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    setData(
      "skills",
      skills.map((skill, index) => {
        if (index === i) {
          return { ...skill, [e.target.name]: e.target.value };
        }
        return skill;
      })
    );
  };

  return (
    <div className="px-4 sm:px-8 py-0 md:px-10 md:py-2">
      <div className="md:p-5 p-4 relative">
        <div className="mb-2">
          <div className="input-con mb-4 flex flex-wrap justify-start gap-3 relative">
            {skills.map((skill, index) => (
              <div key={index} className="flex-1 max-w-1/3 mt-2">
                <label
                  className="block mb-2 h-6 text-gray-500"
                  htmlFor="category"
                >
                  {index === 0 && "Skill"}
                </label>

                <div className="flex flex-wrap justify-between gap-3">
                  <FormInput
                    className={showValid && !skill.name ? "border-red-400" : ""}
                    placeholder="Data Structures and Algorithms"
                    value={skill.name}
                    type="text"
                    name="name"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute flex gap-2 bottom-0 right-[20px]">
          <button
            disabled={skills.length <= 1}
            onClick={() => {
              if (skills.length > 1) {
                setData("skills", skills.slice(0, -1));
              }
            }}
            className=""
          >
            <div
              className={`rounded-full w-[30px] h-[30px] flex justify-center items-center text-blue-900 hover:bg-gray-300 bg-gray-200`}
            >
              <div className="fa fa-minus"></div>
            </div>
          </button>

          <button
            onClick={() => setData("skills", [...skills, skillInitialState])}
            className=""
          >
            <div
              className={`rounded-full w-[30px] h-[30px] flex justify-center items-center text-blue-900 hover:bg-gray-300 bg-gray-200`}
            >
              <div className="fa fa-add"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Skill;
