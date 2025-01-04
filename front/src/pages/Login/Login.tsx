import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axiosConfig/axiosInstance";
import {login} from "../../services/Authentication/AuthenticationService";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const body = {
      email: data.email,
      password: data.password,
    };
    setIsLoading(true);
    axiosInstance
      .post("/login", body)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        login();
        navigate("/");
      })
      .catch(() => {
        alert("Wrong creds or server down, check console");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                className="input input-bordered"
                defaultValue={"test1@test.com"}
                required
                type="email"
                placeholder="email"
                {...register("email")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                className="input input-bordered"
                defaultValue={"0000"}
                required
                type="password"
                placeholder="password"
                {...register("password")}
              />
              <label className="label">
                <span className="label-text-alt link link-hover">
                  Forgot password?
                </span>
              </label>
            </div>
            <div className="form-control mt-6">
              {isLoading ? (
                <span className={"loading loading-lg mx-auto"} />
              ) : (
                <input
                  type={"submit"}
                  value={"Login"}
                  className="btn btn-primary"
                ></input>
              )}
            </div>
            <div className="form-control mt-6">
              {isLoading ? (
                <span className={"loading loading-lg mx-auto"} />
              ) : (
                <Link to={"/register"} className="btn btn-secondary">
                  Register
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
