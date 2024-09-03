import React, { useEffect, useState } from "react";
import GoogleButton from "../../components/GoogleButton";
import SlickButton from "../../components/SlickButton";
import FormInput from "../../components/FormInput";
import Logo from "../../asset/imgs/logo.png";
import LogoBlue from "../../asset/imgs/res-builder.png";
import DesktopImage from "../../asset/imgs/logo.png";
import { reviews } from "../../db/reviews";
import { useNavigate } from "react-router-dom";
import { authUser } from "../../redux/slices/userSlice";
import { enqueueSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Login = () => {
  const { user: storedUser } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
  });
  const [showValid, setShowValid] = useState(false);
  const [reviewTracker, setReviewTracker] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    for (let key of Object.keys(user)) {
      if (!user[key]) {
        enqueueSnackbar("fill required fields", { variant: "warning" });
        setShowValid(true);
        setTimeout(() => {
          setShowValid(false);
        }, 2000);
        return;
      }
    }

    dispatch(
      authUser({
        firstname: "User",
        lastname: "",
        email: user.email,
      })
    );
    return navigate("/");
  };

  useEffect(() => {
    if (storedUser) {
      return navigate("/");
    }
  }, [storedUser]);

  useEffect(() => {
    const interval = setTimeout(() => {
      setReviewTracker(
        reviewTracker + 1 < reviews.length ? reviewTracker + 1 : 0
      );
    }, 5000);

    return () => clearTimeout(interval);
  }, [reviewTracker]);

  return (
    <div className="wrapper">
      <div className="h-screen grid md:grid-cols-[minmax(350px,_1fr)_400px] lg:grid-cols-[minmax(450px,_1fr)_450px] grid-cols-1 py-3 pl-3">
        <aside
          className={` bg-blue-900 rounded-tr-3xl rounded-bl-3xl h-full hidden md:block`}
        >
          <div className="h-full relative flex flex-col justify-between p-8">
            <div className="app-logo">
              <div className="w-full">
                <img src={Logo} className="h-28 w-fit object-contain" alt="" />
              </div>
            </div>

            <div className="middle absolute left-0 top-0 w-full h-full flex items-center justify-center">
              <img
                src={DesktopImage}
                alt=""
                className="w-fit h-[450px] object-contain mx-auto"
              />
            </div>

            <div className="bottom">
              <div className="cards overflow-x-hidden">
                <div
                  style={{
                    transform: `translateX(${reviewTracker * -100 + "%"})`,
                  }}
                  className={`grid grid-cols-[repeat(3,_100%)] xl:grid-cols-[repeat(3,_100%)] relative transition-transform`}
                >
                  {reviews.map((review, index) => (
                    <div
                      key={index}
                      className="card text-gray-100 p-5 rounded-lg"
                    >
                      <p className="mb-3 md:text-lg lg:text-xl">
                        {review.content}
                      </p>

                      <div className="flex gap-2">
                        <div className="w-12 h-12 bg-white rounded-full">
                          <img src={review.img} alt="" />
                        </div>

                        <div className="flex-1">
                          <h4>{review.user}</h4>
                          <i>{review.role}</i>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end mt-3">
                <div className="grid grid-cols-2 gap-4">
                  <div
                    onClick={() =>
                      setReviewTracker(
                        reviewTracker - 1 >= 0
                          ? reviewTracker - 1
                          : reviews.length - 1
                      )
                    }
                    className={`w-8 h-8 text-white border-[1px] rotate-45 transition-colors border-r-transparent hover:border-r-white border-white rounded-full cursor-pointer flex justify-center items-center`}
                  >
                    <div className="fa fa-arrow-left -rotate-45"></div>
                  </div>

                  <div
                    onClick={() =>
                      setReviewTracker(
                        reviewTracker + 1 < reviews.length
                          ? reviewTracker + 1
                          : 0
                      )
                    }
                    className={`w-8 h-8 text-white border-[1px] rotate-45 transition-colors border-l-transparent hover:border-l-white border-white rounded-full cursor-pointer flex justify-center items-center`}
                  >
                    <div className="fa fa-arrow-right -rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="px-4 sm:px-8 py-6 md:p-10 md:overflow-y-auto">
          <div className="w-full block md:hidden">
            <img src={LogoBlue} className="h-28 w-fit object-contain" alt="" />
          </div>

          <form action="" method="post" className="md:p-5 p-4">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Login</h3>
              <p>
                New here?{" "}
                <a className="text-blue-600" href="/register">
                  Register
                </a>
              </p>
            </div>

            <div className="mb-2">
              <div className="input-con mb-4">
                <label className="block mb-2 text-gray-500" htmlFor="category">
                  Email
                </label>

                <div className="flex flex-wrap justify-between gap-3">
                  <FormInput
                    className={showValid && !user.email ? "border-red-400" : ""}
                    name="email"
                    placeholder="test@gmail.com"
                    value={user.email}
                    type="email"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="input-con mb-4">
                <label className="block mb-2 text-gray-500" htmlFor="category">
                  Password
                </label>

                <div className="flex flex-wrap justify-between gap-3">
                  <FormInput
                    className={
                      showValid && !user.password ? "border-red-400" : ""
                    }
                    name="password"
                    placeholder="Abcdef123#"
                    value={user.password}
                    type="password"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-4">
                <SlickButton
                  onClick={handleSubmit}
                  type="submit"
                  title="Sign In"
                />

                <p className="text-gray-400 m-2">or</p>

                <GoogleButton type="button" title="Sign in with Google" />
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Login;
