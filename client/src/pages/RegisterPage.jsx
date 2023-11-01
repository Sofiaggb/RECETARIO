import { useForm } from "react-hook-form"
import { useAuth } from "../context/authContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { singup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/menu');
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (value) => { singup(value) })

  return (
    <div className=" flex h-[calc(100vh-100px)] items-center justify-center">

      <div className=" bg-zinc-900 max-w-md p-10 rounded-md">

      <h1 className=" text-2xl font-mono text-center">Register</h1>

        {
          registerErrors.map((error, i) => (
            <div className=" p-2 text-red-500" key={i}>{error}</div>
          ))
        }

        <form onSubmit={onSubmit}>
          <input type="text" {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2  rounded-md"
            placeholder="username" />
          {
            errors.username && (
              <p className=" text-red-500">user name is required</p>
            )
          }

          <input type="email" {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
            placeholder="email" />
          {
            errors.username && (
              <p className=" text-red-500">Email is required</p>
            )
          }

          <input type="password" {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
            placeholder="password" />
          {
            errors.username && (
              <p className=" text-red-500">password is required</p>
            )
          }

          <button type="submit" {...handleSubmit}
           className="flex w-full justify-center rounded-md bg-lime-800 px-3 py-1.5 my-1 text-sm font-semibold transition hover:bg-lime-500">
            Register
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500 ">
          Already have an account?  
          <Link to={'/login'} className=" ps-2 font-semibold leading-6 text-lime-600 hover:text-lime-500">
               Login</Link>
        </p>
      </div>
    </div>
  )
}
