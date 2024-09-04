import React from "react";
import FormInput from "../FormInput";
import FormTextArea from "../FormTextArea";

export type ProjectType = {
  name: string;
  stack: string;
  description: string;
  startdate: string;
  enddate: string;
};

export const projectInitialState = {
  name: "",
  stack: "",
  description: "",
  startdate: "2016",
  enddate: "2022",
};

const Project = ({
  data: projects,
  showValid = false,
  setData,
}: {
  data: ProjectType[];
  showValid?: boolean;
  setData: any;
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    i: number
  ) => {
    setData(
      "projects",
      projects.map((project, index) => {
        if (index === i) {
          return { ...project, [e.target.name]: e.target.value };
        }
        return project;
      })
    );
  };

  return (
    <div className="px-4 sm:px-8 py-0 md:px-10 md:py-2">
      <div className="md:p-5 p-4 relative">
        {projects.map((project, index) => (
          <div key={index} className="mb-2">
            <div className="input-con mb-4 flex flex-wrap justify-between gap-3 relative">
              <div className="absolute top-0 -translate-y-[5px]">
                <div className="bg-blue-900 w-6 h-1 rounded"></div>
              </div>
              <div className="flex-1 mt-2">
                <label className="block mb-2 text-gray-500" htmlFor="category">
                  Project/Experience
                </label>

                <div className="flex flex-wrap justify-between gap-3">
                  <FormInput
                    className={
                      showValid && !project.name ? "border-red-400" : ""
                    }
                    name="name"
                    placeholder="Careerkit Portfolio Builder"
                    value={project.name}
                    type="text"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>

              <div className="flex-1 mt-2">
                <label className="block mb-2 text-gray-500" htmlFor="category">
                  Tech Stacks
                </label>

                <div className="flex flex-wrap justify-between gap-3">
                  <FormInput
                    className={
                      showValid && !project.stack ? "border-red-400" : ""
                    }
                    name="stack"
                    placeholder="React, Typescript, Redux, Tailwindcss"
                    value={project.stack}
                    type="text"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>
            </div>

            <div className="input-con mb-4 flex flex-wrap justify-between gap-3">
              <div className="flex-1 mt-2">
                <label className="block mb-2 text-gray-500" htmlFor="category">
                  Description
                </label>

                <div className="flex flex-wrap justify-between gap-3">
                  <FormTextArea
                    className={
                      showValid && !project.description ? "border-red-400" : ""
                    }
                    name="description"
                    placeholder="A project created to solve automation problem for the One Hacks IV hackathon"
                    value={project.description}
                    type="text"
                    onChange={(e) => handleChange(e, index)}
                  ></FormTextArea>
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
                        showValid && !project.startdate
                          ? "border-red-400 min-w-[90px]"
                          : "min-w-[90px]"
                      }
                      name="startdate"
                      placeholder="1900"
                      value={project.startdate}
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
                        showValid && !project.enddate
                          ? "border-red-400 min-w-[90px]"
                          : "min-w-[90px]"
                      }
                      name="enddate"
                      placeholder="1901"
                      value={project.enddate}
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
            disabled={projects.length <= 1}
            onClick={() => {
              if (projects.length > 1) {
                setData("projects", projects.slice(0, -1));
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
              setData("projects", [...projects, projectInitialState])
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

export default Project;
