import noImagen from "../assets/images/noImagen.jpg"
import { Link } from 'react-router-dom'
// import { useRecipes } from "../context/RecipeContext"
// eslint-disable-next-line react/prop-types
export default function RecipeCard({ recipe }) {

    // const {deleteRecipe} = useRecipes()

    return (


        <div className="card">
    
            <div className='p-2 flex flex-col' >
             
            <Link to={'/recipe/' + recipe._id}
                // className=" text-center bg-lime-600 py-2 rounded-lg font-medium mt-4 hover:bg-lime-500 
                //      focus:scale-95 transition-all duration-200 ease-out"
                >
                    <div className=" rounded-xl overflow-hidden h-44 ">
                        {!recipe.image ? (
                            <img src={noImagen} alt="no imagen" className=" h-full w-full object-cover"/>
                        ) : (
                            <img src={recipe.image.secure_url} alt="image" className=" h-full w-full object-cover" />

                        )}
                    </div>
                    <p className=" text-xs text-slate-600 p-2 sm:p-2">{new Date(recipe.date).toLocaleDateString()}</p>

                    <h1 className="md:text-2xl font-normal mt-0.5 m-2 text-lg">{recipe.title}</h1>
                    </Link>
                    {/* <div >
                    <button className=" text-center  bg-red-700 py-2 rounded-lg font-medium mt-4 hover:bg-red-500
                 focus:scale-95 transition-all duration-200 ease-out"
                 onClick={() => {deleteRecipe(recipe._id)}}>delete</button> */}

                    {/* <Link to={'/update-recipe/' + recipe._id} className=" text-center  bg-orange-600 py-2 rounded-lg font-medium mt-4 hover:bg-orange-500
                 focus:scale-95 transition-all duration-200 ease-out">edit</Link> */}
                {/* </div> */}
                

            </div>
            

        </div>


    )
}
