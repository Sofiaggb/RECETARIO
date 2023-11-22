import { useForm } from 'react-hook-form';
import { useRecipes } from '../context/RecipeContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function FormRecipePage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm();
  const { createRecipe, errors: loginErrors, getRecipe, updateRecipe } = useRecipes();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const loadRecipe = async () => {
      if (params.id) {
        const res = await getRecipe(params.id);
        setValue('title', res.title);
        setValue('ingredients', res.ingredients);
        setValue('preparation', res.preparation);
        setValue('type', res.type);

      }
    }
    loadRecipe()
  }, []);

  const onSubmit = handleSubmit(async (data) => {

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('ingredients', data.ingredients);
    formData.append('preparation', data.preparation);
    formData.append('type', data.type);

    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }

    try {
      if (params.id) {
        await updateRecipe(params.id, formData)

      } else {
        await createRecipe(formData);
      }

    } catch (error) {
      alert(error.message)
    } finally {
      navigate('/menu')
    }

    // for (let entry of formData.entries()) {
    //   console.log(entry[0] + ": " + entry[1]);
    // }
  });


  return (
    <div>
      {isSubmitting && (
        <div className=" bg-slate-500 fixed  top-0 bg-opacity-30 z-10  h-screen  max-h-max w-full flex items-center justify-center">
          <div className="flex items-center">
            <span className="text-3xl mr-4 font-mono">Loading</span>
            <div className="flex items-center justify-center h-screen">
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-t-8 border-b-8 border-lime-500 animate-spin">
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className=' m-auto bg-zinc-800 mt-4  max-w-2xl w-full p-10 rounded-md'>
        <h1 className=" text-2xl font-mono text-center">Add a New Recipe</h1>
        {
          loginErrors.map((error, i) => (
            <div className=" p-2 text-red-500" key={i}>{error}</div>
          ))
        }

        <form onSubmit={onSubmit} encType="multipart/form-data">

          <label htmlFor="title" className=' font-mono'>Title</label>
          <input type="text"  {...register("title", { required: true })}
            className=' w-full bg-zinc-500 text-white px-4 py-2  my-2 rounded-md ' autoFocus
            placeholder="Title" />
          {
            errors.title && (
              <p className=" text-red-500">Title is required</p>
            )
          }

          <label htmlFor="ingredients" className=' font-mono'>Ingredients</label>
          <textarea rows="6"  {...register("ingredients", { required: true })}
            className=' w-full bg-zinc-500 text-white px-4 py-2 my-2 rounded-md'
            placeholder="Ingredients"></textarea>
          {
            errors.ingredients && (
              <p className=" text-red-500">Ingredients is required</p>
            )
          }

          <label htmlFor="preparation" className=' font-mono'>Preparation</label>
          <textarea rows="6"  {...register("preparation", { required: true })}
            className=' w-full bg-zinc-500 text-white px-4 py-2 my-2 rounded-md'
            placeholder="Preparation"></textarea>
          {
            errors.preparation && (
              <p className=" text-red-500">Preparation is required</p>
            )
          }

          <label htmlFor="type" className=' font-mono'>Type</label>
          <input type="text" {...register("type", { required: true })}
            className=' w-full bg-zinc-500 text-white px-4 py-2 my-2 rounded-md'
            placeholder="Typo" />
          {
            errors.type && (
              <p className=" text-red-500">Type is required</p>
            )
          }

          <label htmlFor="image" className=' font-mono'>Image</label>
          <input type="file" accept="image/*" {...register("image")}
            className="w-full mt-2 text-sm text-grey-500  file:mx-5 file:py-2 file:px-6  file:rounded-full file:border-0  file:text-sm file:font-medium  file:bg-lime-50 file:text-lime-700  hover:file:cursor-pointer hover:file:bg-green-50  hover:file:text-green-700  " />

          <div className='flex items-center justify-center'>
            <button type="submit" {...handleSubmit} disabled={isSubmitting}
              className="group relative inline-block overflow-hidden border border-lime-600 px-10 py-2 mt-5 focus:outline-none focus:ring">
              <span
                className="absolute inset-x-0 top-0 h-[2px] bg-lime-600 transition-all group-hover:h-full group-active:bg-lime-500"
              ></span>
              <span
                className="relative text-base font-medium text-lime-500 transition-colors group-hover:text-white"
              >
                save
              </span>
            </button>
          </div>
        </form>
      </div>


    </div>
  )
}
