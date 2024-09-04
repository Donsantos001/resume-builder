import { useEffect, useMemo, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addProfile } from "../redux/slices/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import ProfilePreviewModal from "../components/Modal/ProfilePreviewModal";
import { enqueueSnackbar } from "notistack";

export interface UserProfile {
  user: UserType;
  educations: EducationType[];
  skills: SkillType[];
  projects: ProjectType[];
  socials: SocialType[];
  date?: Date;
}

const initialProfile = {
  user: userInitialState,
  educations: [educationInitialState],
  skills: [skillInitialState],
  projects: [projectInitialState],
  socials: [socialInitialState],
};

const CreateProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = useAppSelector((store) => store.user);
  const [showValid, setShowValid] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  useEffect(() => {
    if (state && state.profile) {
      setProfile(state.profile);
    }
  }, [state]);

  useEffect(() => {
    if (state?.profile) return;
    if (user) {
      setProfile({
        ...profile,
        user: {
          ...profile.user,
          ...user,
        },
      });
    }
  }, [user]);

  const handleInvalid = () => {
    enqueueSnackbar("Fields required", { variant: "warning" });
    setShowValid(true);
    setTimeout(() => {
      setShowValid(false);
    }, 2000);
    return false;
  };

  const validStep = () => {
    switch (step) {
      case 0:
        if (
          !(
            profile.user.firstname &&
            profile.user.lastname &&
            profile.user.email &&
            profile.user.phoneno &&
            profile.user.address
          )
        )
          return handleInvalid();
        break;
      case 1:
        if (profile.educations.length === 0) return handleInvalid();
        for (let edu of profile.educations) {
          for (let k of Object.keys(edu)) {
            if (!edu[k as keyof EducationType]) return handleInvalid();
          }
        }
        break;
      case 2:
        if (profile.skills.length === 0) return handleInvalid();
        for (let skill of profile.skills) {
          for (let k of Object.keys(skill)) {
            if (!skill[k as keyof SkillType]) return handleInvalid();
          }
        }
        break;
      case 3:
        if (profile.projects.length === 0) return handleInvalid();
        for (let project of profile.projects) {
          for (let k of Object.keys(project)) {
            if (!project[k as keyof ProjectType]) return handleInvalid();
          }
        }
        break;
      case 4:
        if (profile.socials.length === 0) return handleInvalid();
        for (let social of profile.socials) {
          for (let k of Object.keys(social)) {
            if (!social[k as keyof SocialType]) return handleInvalid();
          }
        }
        break;
      default:
        break;
    }
    return true;
  };

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
    enqueueSnackbar({
      message: "Profile created",
      variant: "success",
    });
    navigate("/");
  };

  const stepPage = useMemo(() => {
    return [
      {
        title: "Personal Info",
        page: (
          <PersonalInfo
            data={profile.user}
            setData={setData}
            showValid={showValid}
          />
        ),
      },
      {
        title: "Education",
        page: (
          <Education
            data={profile.educations}
            setData={setData}
            showValid={showValid}
          />
        ),
      },
      {
        title: "Skill",
        page: (
          <Skill
            data={profile.skills}
            setData={setData}
            showValid={showValid}
          />
        ),
      },
      {
        title: "Projects/Experience",
        page: (
          <Project
            data={profile.projects}
            setData={setData}
            showValid={showValid}
          />
        ),
      },
      {
        title: "Socials",
        page: (
          <Social
            data={profile.socials}
            setData={setData}
            showValid={showValid}
          />
        ),
      },
    ];
  }, [profile, showValid]);

  return (
    <div>
      <div className="flex flex-row flex-wrap gap-2 justify-between items-center mb-3 px-6 sm:px-12 md:px-[60px]">
        <div className="text-2xl text-blue-900 min-w-[160px]">
          {stepPage[step].title}
        </div>
        <div className="flex flex-row gap-2">
          {stepPage.map((_, id) => (
            <button
              key={id}
              onClick={() => {
                if (step < id && !validStep()) return;
                setStep(id);
              }}
              className=""
            >
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

      <div className="flex justify-between flex-wrap gap-2 items-center px-6 sm:px-12 md:px-[60px] ">
        <div className="flex gap-2">
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
              if (!validStep()) return;
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

        {step === stepPage.length - 1 && (
          <SlickLightButton
            onClick={() => {
              setOpenPreview(true);
            }}
            showIcon={true}
            icon={<div className="fa fa-eye"></div>}
            title="Preview"
          />
        )}
      </div>

      <ProfilePreviewModal
        open={openPreview}
        print={false}
        data={profile}
        close={() => {
          setOpenPreview(false);
        }}
      />
    </div>
  );
};

export default CreateProfile;
