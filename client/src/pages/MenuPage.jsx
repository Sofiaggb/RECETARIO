/* eslint-disable react/no-unescaped-entities */
import { useRecipes } from '../context/RecipeContext';
import { useEffect } from "react";
import { useAuth } from '../context/authContext';
import { Link } from 'react-router-dom';

// components
import RecipeCard from '../components/RecipeCard';
import Search from '../components/Search';

export default function MenuPage() {

  const { getMenu, recipes } = useRecipes();
  const { user } = useAuth()

  useEffect(() => {
    getMenu();
  }, [])

  if (recipes.length === 0) return (

    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Welcome to C&C {user.username}.
            <strong className="font-extrabold text-lime-700 sm:block">
              Create your first recipe!
            </strong>
          </h1>

          <p className="mt-4 sm:text-base/relaxed">
            "In every recipe you save, you store not only ingredients and steps, but also moments of joy,
            love and creativity. Each recipe is a culinary journey waiting to be explored, so go ahead,
            spread your culinary wings and create dishes that delight the palate and feed the soul!"
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to={'/add-recipe'}
              className="block w-full rounded bg-lime-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-lime-700 focus:outline-none focus:ring active:bg-lime-500 sm:w-auto"
              href="/get-started"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>

  );

  return (
    <>
      <header>
        <div className="mx-auto max-w-screen-xl px-4 py-8 pt-20 sm:px-6 md:py-12 lg:px-8 lg:py-4">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl font-bold  sm:text-3xl">
                Welcome Back, {user.username} !
              </h1>
              <p className="mt-1.5 text-sm text-gray-500">
                Let's write a new recipe post! 🎉
              </p>
            </div>
          </div>
        </div>
      </header>

      <Search searchPriv='true' />

      <div className="flex items-center justify-center  container mx-auto">
        <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {
            recipes.map(recipe => (
              <RecipeCard recipe={recipe} key={recipe._id} />
            ))
          }
        </div>
      </div>
    </>
  )
}
