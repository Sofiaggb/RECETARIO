import { useRecipes } from '../context/RecipeContext';
import { useEffect } from "react";
import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';


export default function HomePage() {

  const { getPublicMenu, recipes } = useRecipes();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    getPublicMenu();
  }, [])

  return (
    <>
      <section className="relative 
    bg-[url(https://res.cloudinary.com/do1xfb26d/image/upload/v1700516051/foodPage/food-1898194_1920_vyjrvd.jpg)]
     bg-cover bg-center bg-no-repeat">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center" >
          <div className="mx-auto max-w-6xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Welcome to C&C.
              <strong className="font-extrabold text-lime-300 sm:block">
                Save your recipes
              </strong>
              <strong className="font-extrabold text-lime-300 sm:block">
                so they will never be forgotten!
              </strong>
            </h1>

            {!isAuthenticated && (
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to={'/register'}
                  className="block w-full rounded bg-lime-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-lime-700 focus:outline-none focus:ring active:bg-lime-500 sm:w-auto"
                >
                  Join Us
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {recipes.length > 0 && (
        <div className="flex items-center justify-center min-h-screen container mx-auto">
          <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4">
            {
              recipes.map(recipe => (
                <RecipeCard recipe={recipe} key={recipe._id} />
              ))
            }
          </div>
        </div>
      )}
    </>
  )
}