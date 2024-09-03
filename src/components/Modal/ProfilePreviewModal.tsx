import { useEffect, useMemo, useRef } from "react";
import { UserProfile } from "../../pages/CreateProfile";
import SlickButton from "../SlickButton";
import DefaultTemplate from "../Template/DefaultTemplate";
import { useReactToPrint } from "react-to-print";
import useClickOutside from "../../hooks/useClickOutside";
import { useAppSelector } from "../../redux/hooks";
import { templates } from "../../db/templates";

const ProfilePreviewModal = ({
  close,
  open,
  print = false,
  setPrint,
  data: profile,
}: {
  open: boolean;
  close: any;
  print?: boolean;
  setPrint?: any;
  data?: UserProfile;
}) => {
  const { template } = useAppSelector((store) => store.user);
  const previewRef = useRef<any>(null);
  const modalRef = useRef<any>(null);
  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
  });

  useClickOutside(modalRef, () => close());

  useEffect(() => {
    if (print && previewRef.current) {
      handlePrint();
      setPrint(false);
    }
  }, [print, previewRef.current]);

  const Template = useMemo(() => {
    return templates[template].component;
  }, [template]);

  return profile ? (
    <div
      className={`${
        open ? " " : "hidden "
      }fixed left-0 top-0 z-50 w-screen h-screen bg-[#00000044] px-5 py-6 overflow-y-auto`}
    >
      <div ref={modalRef} className="w-full max-w-[1024px] mx-auto">
        <div className="flex justify-between items-center gap-2 mb-2">
          <button
            onClick={close}
            className="text-red-800 text-xl w-8 h-8 rounded-full bg-white flex items-center hover:text-2xl transition-all justify-center"
          >
            <div className="fa fa-times"></div>
          </button>
          <SlickButton
            onClick={handlePrint}
            icon={<div className="fa fa-download"></div>}
            title="Download"
          />
        </div>

        <div ref={previewRef} className="p-4 bg-white">
          <Template profile={profile} />
        </div>
      </div>
    </div>
  ) : (
    <div className={`${open ? "text-center " : "text-center hidden "}`}>
      <h2>Loading resume...</h2>
    </div>
  );
};

export default ProfilePreviewModal;
