/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form"
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { singin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    singin(data);
  });
  useEffect(() => {
    if (isAuthenticated) return navigate('/menu')
  }, [isAuthenticated])

  return (
    <div className=" mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto  max-w-md text-center bg-zinc-900 p-4 rounded-md">

        <h1 className=" text-2xl mt-4 font-mono text-center">Login</h1>

        {loginErrors && loginErrors.length > 0 && (
          <div
            role="alert"
            className="rounded border-s-4 p-4 border-red-600 bg-red-900"
          >
            <strong className="block font-medium  text-red-100">
              Something went wrong
            </strong>
            {
              loginErrors.map((error, i) => (
                <div className="mt-2 text-sm text-left dark:text-red-200" key={i}>{error}</div>
              ))
            }
          </div>
        )}

        <form onSubmit={onSubmit} className="mx-auto mt-4 p-4 max-w-md space-y-4">

          <label
            htmlFor="email"
            className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-lime-500"
          >
            <input type="email" {...register("email", { required: true })}
              className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              placeholder="email" />

            <span
              className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-300 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
            >
              Email
            </span>
          </label>
          {
            errors.email && (
              <div className="w-full p-2 text-red-500">Email is required</div>
            )
          }

          <label
            htmlFor="password"
            className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-lime-500"
          >
            <input type="password" {...register("password", { required: true })}
              className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              placeholder="password" />

            <span
              className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-300 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
            >
              Password
            </span>
          </label>
          {
            errors.password && (
              <p className=" text-red-500">password is required</p>
            )
          }

          <button type="submit" {...handleSubmit}
            className="flex w-full justify-center rounded-md bg-lime-800 px-3 py-1.5 my-1 text-sm font-semibold transition hover:bg-lime-500">
            Login
          </button>

        </form>
        <p className=" text-center text-sm text-gray-500">
          Don't have account?
          <Link to={'/register'} className=" ps-2 font-semibold leading-6 text-lime-600 hover:text-lime-50">
            Sing Up</Link>
        </p>
      </div>
    </div >
  )
}
