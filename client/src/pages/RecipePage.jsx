import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import { useAuth } from "../context/authContext";
import Swal from "sweetalert2";
import noImagen from "../assets/images/noImagen.jpg";
import ErrorPage from "./ErrorPage";

export default function RecipePage() {

  const params = useParams();
  const { getRecipe, recipe, deleteRecipe } = useRecipes();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getRecipe(params.id);
  }, [])

  const deleteRes = async (recipe) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      color: "#fff",
      confirmButtonColor: "#187a1d",
      cancelButtonColor: "#a30606",
      confirmButtonText: "Yes, delete it!",
      background: '#3a3737'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteRecipe(recipe);
        await navigate('/menu');
        Swal.fire({
          title: "Deleted!",
          text: "Your recipe has been deleted.",
          icon: "success",
          color: "#fff",
          confirmButtonColor: "#187a1d",
          background: '#3a3737'

        });
      }
    });

  }

  if (!recipe) return (<ErrorPage />);

  return (
    <section>
      <div
        className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
      >

        {isAuthenticated && recipe.user == user.id && (
          <div className="inline-flex rounded-lg border border-gray-800  bg-zinc-700 00 p-1">
            <Link to={'/update-recipe/' + recipe._id}
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-base text-white hover:text-lime-500 focus:relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>

              Edit
            </Link>

            <button
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-base text-red-500 hover:text-red-600 shadow-sm focus:relative"
              onClick={() => { deleteRes(recipe._id) }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>

              Delete
            </button>
          </div>
        )}


        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div
            className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-96"
          >
            {!recipe.image ? (
              <img
                alt="no hay imagen"
                src={noImagen}
                className="absolute inset-0 h-96 w-full object-cover"
              />
            ) : (
              <img
                alt="Party"
                src={recipe.image.secure_url}
                className="absolute inset-0  h-96 w-full object-cover"
              />
            )}

          </div>

          <div className="lg:py-24 space-y-4 " style={{whiteSpace: "pre-wrap"}}>
            <h1 className="text-3xl font-bold sm:text-4xl pb-8">{recipe.title}</h1>
            <h2 className="text-2xl text-lime-400 sm:text-3xl">Ingredientes</h2>
            
              <p className="mt-4 font-serif" >{recipe.ingredients}</p>
          
            <h2 className="text-2xl text-lime-400 sm:text-3xl">Preparación</h2>
            
              <p> {recipe.preparation}</p>
            
          </div>
        </div>
      </div>
    </section>
  )
}
