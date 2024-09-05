import { useEffect, useMemo, useRef, useState } from "react";
import { UserProfile } from "../../pages/CreateProfile";
import SlickButton from "../SlickButton";
import { jsPDF } from "jspdf";
import { useReactToPrint } from "react-to-print";
import useClickOutside from "../../hooks/useClickOutside";
import { useAppSelector } from "../../redux/hooks";
import { templates } from "../../db/templates";
import html2canvas from "html2canvas";

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
  const [loaded, setLoaded] = useState(false);
  const previewRef = useRef<any>(null);
  const modalRef = useRef<any>(null);

  const handleDownload = () => {
    const elem = document.getElementById("preview");
    elem &&
      html2canvas(elem).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(
          `${profile?.user.firstname || ""}-${
            profile?.user.lastname || ""
          }-Resume.pdf`
        );
      });
  };

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
  });

  useClickOutside(modalRef, () => close());

 
  useEffect(() => {
    if (print && previewRef.current && loaded) {
      handleDownload();
      setPrint && setPrint(false);
      setLoaded(false);
    }
  }, [print, previewRef.current, loaded]);

  const Template = useMemo(() => {
    return templates[template].component;
  }, [template]);

  return profile ? (
    <div
      className={`${
        open ? "z-50 " : "opacity-0 -z-10 "
      }fixed left-0 top-0 w-screen h-screen bg-[#00000044] px-5 py-6 overflow-y-auto`}
    >
      <div ref={modalRef} className="w-full min-w-[900px] max-w-[1024px] mx-auto">
        <div className="flex justify-between items-center gap-2 mb-2">
          <button
            onClick={close}
            className="text-red-800 text-xl w-8 h-8 rounded-full bg-white flex items-center hover:text-2xl transition-all justify-center"
          >
            <div className="fa fa-times"></div>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="text-blue-800 text-xl px-5 py-3 bg-white rounded-lg flex items-center hover:bg-gray-100 transition-all justify-center"
            >
              <div className="fa fa-print"></div>
            </button>
            <SlickButton
              onClick={handleDownload}
              icon={<div className="fa fa-download"></div>}
              title="Download"
            />
          </div>
        </div>

        <div ref={previewRef} id="preview" className="p-4 bg-white">
          <Template setLoaded={setLoaded} profile={profile} />
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
