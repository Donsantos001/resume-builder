import { UserProfile } from "../../pages/CreateProfile";
import Image from "../../asset/imgs/res-builder.png";
import ImageWithFallback from "../ImageWithFallback";

const BasicTemplate = ({
  profile,
  setLoaded,
}: {
  profile: UserProfile;
  setLoaded?: any;
}) => {
  return (
    <div className="px-4">
      <div className="flex justify-between mb-4">
        <div className="personal">
          <h2 className="text-5xl font-medium pt-4 uppercase">
            {profile.user.firstname}
          </h2>
          <h2 className="text-5xl font-medium uppercase">
            {profile.user.lastname}
          </h2>

          <p className="pt-1">Address: {profile.user.address}</p>
          <p>Phone Number: {profile.user.phoneno}</p>
        </div>

        <div className="h-[160px]">
          <ImageWithFallback
            setLoaded={setLoaded}
            alt={"Profile picture"}
            primaryUrl={profile.user.image}
            fallbackUrl={Image}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <hr />

      <div className="grid gap-6 grid-cols-[30%,_2px,_auto]">
        <div className="left">
          <div className="socials py-4">
            <h3 className="text-2xl uppercase">Socials</h3>

            {profile.socials.map((social, index) => (
              <div key={index} className="mt-2 flex items-center gap-1">
                <div className="fa fa-link text-sm"></div>

                <a
                  href={social.link}
                  className="text-blue-800 text-sm"
                  style={{ wordWrap: "break-word" }}
                >
                  {social.link}
                </a>
              </div>
            ))}
          </div>

          <hr />

          <div className="py-4">
            <h3 className="text-2xl mb-2 uppercase">Skills</h3>
            {profile?.skills.map((item, id) => (
              <div key={id} className="flex items-center gap-2 mb-1">
                <div className="fa fa-dot-circle"></div>
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[1px] bg-gray-300 h-full"></div>

        <div className="flex flex-col">
          {profile.user.bio && (
            <>
              <div className="bio mb-4 pt-4">
                <p className="mt-1">{profile.user.bio}</p>
              </div>

              <hr />
            </>
          )}

          <div className="education mb-4 pt-4">
            <h3 className="text-2xl uppercase">Education</h3>

            {profile.educations.map((education, index) => (
              <div key={index} className="mt-3">
                <p className="text-xl">{education.college}</p>
                <p className="text-sm">{education.location}</p>
                <p className="">
                  <span>Course: </span>
                  <span>{education.course}</span>
                </p>
                <p className="">
                  <span>Duration: </span>
                  <span>
                    {education.startdate} - {education.enddate}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <hr />

          <div className="projects mb-4 pt-4">
            <h3 className="text-2xl uppercase">Projects/Experience</h3>

            {profile.projects.map((project, index) => (
              <div key={index} className="mt-3">
                <p className="text-xl">{project.name}</p>
                <p className="">
                  Stacks: <span>{project.stack}</span>
                </p>
                <p className="">{project.description}</p>
                <p className="text-sm">
                  <span>Duration: </span>
                  <span>
                    {project.startdate} - {project.enddate}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicTemplate;
