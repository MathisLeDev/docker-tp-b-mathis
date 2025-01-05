import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../../axiosConfig/axiosInstance";
import { useNavigate } from "react-router-dom";

type Inputs = {
  password: string;
  email: string;
  passwordConfirmation: string;
};

const Register = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const body = {
      password: data.password,
      email: data.email,
      role: 1,
    };
    setIsLoading(true);
    axiosInstance
      .post("/users", body)
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch(() => {
        alert("Error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
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
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm password</span>
              </label>
              <input
                className="input input-bordered"
                defaultValue={"0000"}
                required
                type="password"
                placeholder="confirm password"
                {...register("passwordConfirmation")}
              />
            </div>
            <div className="form-control mt-6">
              {isLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <button className="btn btn-primary">+ Create</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
