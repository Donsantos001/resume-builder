import React from "react";
import FormInput from "../FormInput";

export type EducationType = {
  course: string;
  college: string;
  location: string;
  startdate: string;
  enddate: string;
};

export const educationInitialState = {
  course: "",
  college: "",
  location: "",
  startdate: "2016",
  enddate: "2022",
};

const Education = ({
  data: educations,
  showValid = false,
  setData,
}: {
  data: EducationType[];
  showValid?: boolean;
  setData: any;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    setData(
      "educations",
      educations.map((education, index) => {
        if (index === i) {
          return { ...education, [e.target.name]: e.target.value };
        }
        return education;
      })
    );
  };

  return (
    <div className="px-4 sm:px-8 py-0 md:px-10 md:py-2">
      <div className="md:p-5 p-4 relative">
        {educations.map((education, index) => (
          <div key={index} className="mb-2">
            <div className="input-con mb-4 flex flex-wrap justify-between gap-3 relative">
              <div className="absolute top-0 -translate-y-[5px]">
                <div className="bg-blue-900 w-6 h-1 rounded"></div>
              </div>
              <div className="flex-1 mt-2">
                <label className="block mb-2 text-gray-500" htmlFor="category">
                  College/School
                </label>

                <div className="flex flex-wrap justify-between gap-3">
                  <FormInput
                    name="college"
                    className={
                      showValid && !education.college ? "border-red-400" : ""
                    }
                    placeholder="Careerkit Institute of Technology"
                    value={education.college}
                    type="text"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>

              <div className="flex-1 mt-2">
                <label className="block mb-2 text-gray-500" htmlFor="category">
                  Course Name
                </label>

                <div className="flex flex-wrap justify-between gap-3">
                  <FormInput
                    className={
                      showValid && !education.course ? "border-red-400" : ""
                    }
                    name="course"
                    placeholder="Computer Engineering"
                    value={education.course}
                    type="text"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>
            </div>

            <div className="input-con mb-4 flex flex-wrap justify-between gap-3">
              <div className="flex-1 mt-2">
                <label className="block mb-2 text-gray-500" htmlFor="category">
                  Location
                </label>

                <div className="flex flex-wrap justify-between gap-3">
                  <FormInput
                    className={
                      showValid && !education.location ? "border-red-400" : ""
                    }
                    name="location"
                    placeholder="8, Lockwoods New Orleans"
                    value={education.location}
                    type="text"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>

              <div className="flex-1 mt-2 flex justify-between gap-3">
                <div className="flex-1">
                  <label
                    className="block mb-2 text-gray-500"
                    htmlFor="category"
                  >
                    Start date
                  </label>

                  <div className="flex flex-wrap justify-between gap-3">
                    <FormInput
                      className={
                        showValid && !education.startdate
                          ? "border-red-400 min-w-[90px]"
                          : "min-w-[90px]"
                      }
                      name="startdate"
                      placeholder="1900"
                      value={education.startdate}
                      type="number"
                      min="1900"
                      max="2099"
                      step="1"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <label
                    className="block mb-2 text-gray-500"
                    htmlFor="category"
                  >
                    End date
                  </label>

                  <div className="flex flex-wrap justify-between gap-3">
                    <FormInput
                      className={
                        showValid && !education.enddate
                          ? "border-red-400 min-w-[90px]"
                          : "min-w-[90px]"
                      }
                      name="enddate"
                      placeholder="1901"
                      value={education.enddate}
                      type="number"
                      min="1901"
                      max="2099"
                      step="1"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute flex gap-2 bottom-0 right-[20px]">
          <button
            disabled={educations.length <= 1}
            onClick={() => {
              if (educations.length > 1) {
                setData("educations", educations.slice(0, -1));
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
            onClick={() =>
              setData("educations", [...educations, educationInitialState])
            }
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

export default Education;
