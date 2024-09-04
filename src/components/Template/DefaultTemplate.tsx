import { UserProfile } from "../../pages/CreateProfile";
import Image from "../../asset/imgs/res-builder.png";

const DefaultTemplate = ({ profile }: { profile: UserProfile }) => {
  return (
    <div className="grid grid-cols-[30%,_70%] gap-3">
      <div className="flex flex-col">
        <div className="w-full p-4">
          <img
            src={profile.user.image || Image}
            alt="profile picture"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4">
          <h3 className="text-2xl mb-2">Skills</h3>
          {profile?.skills.map((item, id) => (
            <div key={id} className="flex items-center gap-2 mb-1">
              <div className="fa fa-dot-circle"></div>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col px-2">
        <div className="personal mb-4">
          <h2 className="text-4xl font-medium mb-4 pt-4">
            {profile.user.firstname} {profile.user.lastname}
          </h2>

          <p>Address: {profile.user.address}</p>
          <p>Phone Number: {profile.user.phoneno}</p>
        </div>

        <div className="bio mb-4">
          <p className="">{profile.user.bio}</p>
        </div>

        <div className="education mb-4">
          <h3 className="text-2xl">Education</h3>
          <hr />

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

        <div className="projects mb-4">
          <h3 className="text-2xl">Projects/Experience</h3>
          <hr />

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
        <div className="socials mb-4">
          <h3 className="text-2xl">Socials</h3>
          <hr />

          {profile.socials.map((social, index) => (
            <div key={index} className="mt-3 flex items-center gap-2">
              <div className="fa fa-link text-sm"></div>

              <a href={social.link} className="text-blue-800">
                {social.link}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DefaultTemplate;
