import { useAppDispatch, useAppSelector } from "../redux/hooks";
import SlickLightButton from "../components/SlickLightButton";
import { useNavigate } from "react-router-dom";
import ProfilePreviewModal from "../components/Modal/ProfilePreviewModal";
import { useState } from "react";
import { UserProfile } from "./CreateProfile";
import { removeProfile } from "../redux/slices/userSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { profiles } = useAppSelector((store) => store.user);
  const [openPreview, setOpenPreview] = useState(false);
  const [print, setPrint] = useState(false);
  const [previewData, setPreviewData] = useState<UserProfile | undefined>();

  return (
    <div>
      <div className="flex flex-row flex-wrap gap-2 justify-between items-center mb-3 pl-4 pr-8 sm:px-12 md:px-[60px]">
        <div className="text-2xl text-blue-900 min-w-[160px]">
          <p>Profiles</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 pl-4 pr-8 sm:px-12 md:px-[60px]">
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="shadow bg-gray-100 rounded-lg p-4 relative"
          >
            <div className="absolute left-full top-[50%] translate-x-2 -translate-y-1/2">
              <button
                onClick={() => {
                  if (window.confirm("This item will be deleted")) {
                    dispatch(removeProfile(index));
                  }
                }}
                className=""
              >
                <div
                  className={`rounded-full w-[24px] h-[24px] flex justify-center items-center text-white bg-gray-500`}
                >
                  <div className="fa fa-minus"></div>
                </div>
              </button>
            </div>

            <div className="flex justify-between items-center ">
              <p className="max-w-[40%]">
                {profile.user.firstname} {profile.user.lastname}
              </p>

              <p className="max-w-[30%] text-sm">
                {profile?.date ? new Date(profile.date).toLocaleString() : ""}
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    navigate("/createprofile", { state: { profile } });
                  }}
                >
                  <div className="fa fa-edit"></div>
                </button>

                <button
                  onClick={() => {
                    setOpenPreview(true);
                    setPreviewData(profiles[index]);
                  }}
                >
                  <div className="fa fa-eye"></div>
                </button>

                <button
                  onClick={() => {
                    setPrint(true);
                    // setOpenPreview(true);
                    // setTimeout(() => {
                    //   setOpenPreview(false);
                    // }, 2000)
                    setPreviewData(profiles[index]);
                  }}
                >
                  <div className="fa fa-download"></div>
                </button>
              </div>
            </div>
          </div>
        ))}

        {profiles.length === 0 && (
          <div className="flex flex-center">
            <SlickLightButton
              onClick={() => {
                navigate("/createprofile");
              }}
              showIcon={true}
              icon={<div className="fa fa-plus"></div>}
              title="Add Profile"
            />
          </div>
        )}
      </div>

      <ProfilePreviewModal
        open={openPreview}
        print={print}
        data={previewData}
        setPrint={setPrint}
        close={() => {
          setOpenPreview(false);
          setPreviewData(undefined);
          setPrint(false);
        }}
      />
    </div>
  );
};

export default Profile;
