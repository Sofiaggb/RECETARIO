import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import logo from "../assets/images/logo.png"

export default function Navbar() {

  const { isAuthenticated, logout } = useAuth()
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  return (
    <header >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link to={'/'} className="block text-lime-600" >
              <span className="sr-only">Home</span>
              <img src={logo} alt="logo"  className="h-10"/>
              C&C
            </Link>
          </div>


          <div className="md:flex md:items-center md:gap-12">
          {isAuthenticated ? (
            <>
            <nav aria-label="Global" className={`md:block  ${mobileMenuVisible ?  'block max-md:absolute max-md:p-4 max-md:bg-neutral-900 bg  max-md:top-12 max-md:right-0 max-md:z-10' : 'hidden' }`} >
              <ul className="md:flex items-center  max-md:gap-y-6 md:gap-6 text-sm">
                <li className="max-md:py-4 max-md:my-4 text-center">
                  <Link to={'/menu'}
                    className=" transition hover:text-lime-400/75 max-md:p-4 max-md:my-4 max-md:text-base"
                  >
                    My Menu
                  </Link>
                </li>

                <li className="max-md:py-4 max-md:my-4 text-center">
                  <Link to={'/add-recipe'}
                    className=" transition hover:text-lime-400/75 max-md:p-4 max-md:my-4 max-md:text-base"
                  >
                    Add Recipe
                  </Link>
                </li>

                <li className="max-md:py-4 max-md:my-4">

                  <Link to={'/'} onClick={() => logout()}
                  className="rounded-md bg-lime-600 px-4 py-2.5 max-md:m-4 text-sm max-md:text-base font-medium text-white shadow"
                  // className=" transition hover:text-lime-400/75"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </nav>

            <div className=" absolute top-2 right-3 block md:hidden">
              <button
                className="rounded  p-2 text-gray-400 transition hover:text-gray-500/75"
                onClick={() => toggleMobileMenu()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            </>
            ): (
            <div className="flex items-center gap-4">
              <div className="flex gap-4">
                <Link to={'/login'}
                  className="rounded-md bg-lime-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                >
                  Login
                </Link>

                <div className="gap-4 flex">
                  <Link to={'/register'}
                    className="rounded-md bg-gray-200 px-5 py-2.5 text-sm font-medium text-lime-600"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
            )}

          </div>
        </div>
      </div>
    </header>




    // <nav className=" bg-zinc-900 flex justify-between py-5 px-10">
    //   <Link to={'/'}>
    //     <h1 className=" text-2xl font-bold">C&C</h1>
    //   </Link>
    //   <ul className=" flex gap-x-2">

    //     {isAuthenticated ? (
    //       <>
    //         <li>
    //           <Link 
    //           className=" px-2 hover:text-lime-500 transition"
    //           to={'/menu'}>My Menu</Link>
    //         </li>
    //         <li>
    //           <Link to={'/add-recipe'}
    //           className=" px-2 hover:text-lime-500 transition"
    //           >Add Recipe</Link>
    //         </li>
    //         <li>
    //           <Link to={'/'} onClick={() => logout()} 
    //           className=" px-2 hover:text-lime-500 transition"
    //           >Logout</Link>
    //         </li>
    //       </>
    //     ) : (
    //       <>
    //         <li>
    //           <Link to={'/login'}
    //           className=" px-2 hover:text-lime-500 transition"
    //           >Login</Link>
    //         </li>
    //         <li>
    //           <Link to={'/register'}
    //           className=" px-2 hover:text-lime-500 transition"
    //           >Register</Link>
    //         </li>
    //       </>
    //     )

    //     }
    //   </ul>
    // </nav>
  )
}
