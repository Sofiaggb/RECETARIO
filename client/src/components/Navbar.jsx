import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Navbar() {

  const { isAuthenticated, logout } = useAuth()

  return (
    <nav className=" bg-zinc-900 flex justify-between py-5 px-10">
      <Link to={'/'}>
        <h1 className=" text-2xl font-bold">C&C</h1>
      </Link>
      <ul className=" flex gap-x-2">
        
        {isAuthenticated ? (
          <>
            <li>
              <Link 
              className=" px-2 hover:text-lime-500 transition"
              to={'/menu'}>My Menu</Link>
            </li>
            <li>
              <Link to={'/add-recipe'}
              className=" px-2 hover:text-lime-500 transition"
              >Add Recipe</Link>
            </li>
            <li>
              <Link to={'/'} onClick={() => logout()} 
              className=" px-2 hover:text-lime-500 transition"
              >Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={'/login'}
              className=" px-2 hover:text-lime-500 transition"
              >Login</Link>
            </li>
            <li>
              <Link to={'/register'}
              className=" px-2 hover:text-lime-500 transition"
              >Register</Link>
            </li>
          </>
        )

        }
      </ul>
    </nav>
  )
}
