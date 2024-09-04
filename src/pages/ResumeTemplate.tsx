import { enqueueSnackbar } from "notistack";
import SlickButton from "../components/SlickButton";
import { templates } from "../db/templates";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectTemplate } from "../redux/slices/userSlice";
const ResumeTemplate = () => {
  const dispatch = useAppDispatch();
  const { template: selected } = useAppSelector((store) => store.user);

  return (
    <div>
      <div className="flex flex-row flex-wrap gap-2 justify-between items-center mb-3 px-6 sm:px-12 md:px-[60px]">
        <div className="text-2xl text-blue-900 min-w-[160px]">
          <p>Resume Templates</p>
        </div>
      </div>

      <div className="px-6 sm:px-12 md:px-[60px]">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map((template, index) => (
            <div>
              <div
                key={index}
                className={`border relative rounded-md shadow ${
                  index === selected ? "outline-3 outline outline-blue-900" : ""
                }`}
              >
                <img
                  className="object-contain w-full"
                  src={template.image}
                  alt=""
                />

                <div
                  className={`absolute top-0 left-0 w-full h-full bg-[#00000022] flex items-center justify-center opacity-0 transition-all ${
                    index === selected ? "" : "hover:opacity-100"
                  }`}
                >
                  <SlickButton
                    title="Use"
                    onClick={() => {
                      dispatch(selectTemplate(index));
                      enqueueSnackbar({
                        message: `You are now using ${templates[index].name}`,
                        variant: "success",
                      });
                    }}
                  />
                </div>
              </div>

              <p>{template.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate;
