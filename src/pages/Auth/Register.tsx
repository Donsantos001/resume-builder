import React, { useEffect, useState } from "react";
import GoogleButton from "../../components/GoogleButton";
import SlickButton from "../../components/SlickButton";
import FormInput from "../../components/FormInput";
import Logo from "../../asset/imgs/logo.png";
import LogoBlue from "../../asset/imgs/res-builder.png";
import { reviews } from "../../db/reviews";
import { useNavigate } from "react-router-dom";
import { authUser } from "../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { enqueueSnackbar } from "notistack";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user: storedUser } = useAppSelector((store) => store.user);
  const [user, setUser] = useState<{ [key: string]: string }>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (user.password !== user.confirmPassword) {
      enqueueSnackbar("password does not match", { variant: "warning" });
    }

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
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      })
    );

    enqueueSnackbar({
      message: "Registeration successful",
      variant: "success",
    });

    return navigate("/");
  };

  useEffect(() => {
    console.log(storedUser);
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
      <div className="h-screen grid xl:grid-cols-[450px_minmax(450px,_1fr)] md:grid-cols-[350px_minmax(450px,_1fr)] grid-cols-1 py-3 pl-3">
        <aside className="bg-blue-900 rounded-xl h-full hidden md:block">
          <div className="h-full flex flex-col justify-between p-8">
            <div className="app-logo">
              <div className="w-full">
                <img src={Logo} className="h-28 w-fit object-contain" alt="" />
              </div>
            </div>

            <div className="middle">
              <h1 className="mb-3 text-white text-5xl">
                Start building your career.
              </h1>
              <p className="text-gray-200">
                Create your profile and resume with us today, get offer tomorrow{" "}
                <i className="text-blue-300"> career kit</i>
              </p>
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
                      className="card text-gray-100 p-5 bg-blue-800 rounded-lg"
                    >
                      <p className="mb-3">{review.content}</p>

                      <div className="flex gap-2">
                        <div className="w-12 h-12 bg-white rounded-full">
                          <img src={review.img} alt="" />
                        </div>

                        <div className="flex-1 text-sm">
                          <h4>{review.user}</h4>
                          <i>{review.role}</i>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 justify-center mt-3">
                {reviews.map((_item, index) => (
                  <i
                    onClick={() => setReviewTracker(index)}
                    key={index}
                    className={`w-2 h-2 ${
                      index === reviewTracker
                        ? "bg-white"
                        : "bg-gray-300 opacity-60"
                    } rounded-full cursor-pointer`}
                  ></i>
                ))}
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
              <h3 className="text-2xl font-bold mb-2">Register</h3>
              <p>
                Have an account?{" "}
                <a className="text-blue-600" href="/login">
                  Login
                </a>
              </p>
            </div>

            <div className="mb-2">
              <div className="input-con mb-4 flex flex-wrap justify-between gap-3">
                <div className="flex-1 mt-2">
                  <label
                    className="block mb-2 text-gray-500"
                    htmlFor="category"
                  >
                    Firstname
                  </label>

                  <div className="flex flex-wrap justify-between gap-3">
                    <FormInput
                      className={
                        showValid && !user.firstname ? "border-red-400" : ""
                      }
                      placeholder="Demetrous"
                      value={user.firstname}
                      type="text"
                      name="firstname"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex-1 mt-2">
                  <label
                    className="block mb-2 text-gray-500"
                    htmlFor="category"
                  >
                    Lastname
                  </label>

                  <div className="flex flex-wrap justify-between gap-3">
                    <FormInput
                      className={
                        showValid && !user.lastname ? "border-red-400" : ""
                      }
                      placeholder="Johnson"
                      value={user.lastname}
                      type="text"
                      name="lastname"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

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

              <div className="input-con mb-4 flex flex-wrap justify-between gap-3">
                <div className="flex-1 mt-2">
                  <label
                    className="block mb-2 text-gray-500"
                    htmlFor="category"
                  >
                    New Password
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

                <div className="flex-1 mt-2">
                  <label
                    className="block mb-2 text-gray-500"
                    htmlFor="category"
                  >
                    Confirm Password
                  </label>

                  <div className="flex flex-wrap justify-between gap-3">
                    <FormInput
                      className={
                        showValid && !user.confirmPassword
                          ? "border-red-400"
                          : ""
                      }
                      name="confirmPassword"
                      placeholder="Abcdef123#"
                      value={user.confirmPassword}
                      type="password"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <SlickButton
                  onClick={handleSubmit}
                  type="submit"
                  title="Create account"
                />

                <p className="text-gray-400 m-2">or</p>

                <GoogleButton
                  type="button"
                  title="Sign up with Google"
                  onClick={() => {
                    enqueueSnackbar({
                      message: "Feature is currently unavailable",
                      variant: "info",
                    });
                  }}
                />
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default SignUp;
