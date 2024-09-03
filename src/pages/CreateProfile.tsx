import React, { useMemo, useState } from "react";
import PersonalInfo, {
  userInitialState,
  UserType,
} from "../components/Steps/PersonalInfo";
import Education, {
  educationInitialState,
  EducationType,
} from "../components/Steps/Education";
import Skill, { skillInitialState, SkillType } from "../components/Steps/Skill";
import Project, {
  projectInitialState,
  ProjectType,
} from "../components/Steps/Project";
import Social, {
  socialInitialState,
  SocialType,
} from "../components/Steps/Social";
import SlickButton from "../components/SlickButton";
import SlickLightButton from "../components/SlickLightButton";
import { useAppDispatch } from "../redux/hooks";
import { addProfile } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export interface UserProfile {
  user: UserType;
  educations: EducationType[];
  skills: SkillType[];
  projects: ProjectType[];
  socials: SocialType[];
  date?: Date;
}

const CreateProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({
    user: userInitialState,
    educations: [educationInitialState],
    skills: [skillInitialState],
    projects: [projectInitialState],
    socials: [socialInitialState],
  });

  const setData = (
    name: keyof UserProfile,
    data:
      | UserType
      | EducationType[]
      | SkillType[]
      | ProjectType[]
      | SocialType[]
  ) => {
    setProfile({
      ...profile,
      [name]: data,
    });
  };

  const handleSave = () => {
    dispatch(addProfile({ ...profile, date: new Date() }));
    navigate("/");
  };

  const stepPage = useMemo(() => {
    return [
      {
        title: "Personal Info",
        page: <PersonalInfo data={profile.user} setData={setData} />,
      },
      {
        title: "Education",
        page: <Education data={profile.educations} setData={setData} />,
      },
      {
        title: "Skill",
        page: <Skill data={profile.skills} setData={setData} />,
      },
      {
        title: "Projects/Experience",
        page: <Project data={profile.projects} setData={setData} />,
      },
      {
        title: "Socials",
        page: <Social data={profile.socials} setData={setData} />,
      },
    ];
  }, [profile]);

  return (
    <div>
      <div className="flex flex-row flex-wrap gap-2 justify-between items-center mb-3 px-8 sm:px-12 md:px-[60px]">
        <div className="text-2xl text-blue-900 min-w-[160px]">
          {stepPage[step].title}
        </div>
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

      <div className="px-8 sm:px-12 md:px-[60px] flex gap-2">
        {step > 0 && (
          <SlickLightButton
            onClick={() => {
              if (step > 0) {
                setStep(step - 1);
              }
            }}
            title="Prev"
          />
        )}
        <SlickButton
          onClick={() => {
            if (step === stepPage.length - 1) {
              handleSave();
            }

            if (step < stepPage.length - 1) {
              setStep(step + 1);
            }
          }}
          title={`${step === stepPage.length - 1 ? "Save" : "Next"}`}
        />
      </div>
    </div>
  );
};

export default CreateProfile;
