import { useForm } from "react-hook-form"
import { useRecipes } from "../context/RecipeContext"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Search(props) {

    const { register, handleSubmit } = useForm();
    const { searchRecipes, searchPrivRecipes, errors } = useRecipes();
    const navigate = useNavigate();
    const params = useParams();
    const [sear, setSear] = useState(null)
    const [barFood, setBarFood] = useState(false);
    const [selectTypeFood, setSelectTypeFood] = useState('');

    const typeFood = ['Desserts', 'Juices', 'Soups', 'Salads', 'Meat and Chicken', 'Seafood and Fish'];
    const showBarFood = () => {
        setBarFood(!barFood);
      };

    const onSubmit = handleSubmit((data) => {
        setSear(data.search);
    })

    const handleTypeFood = (e) => {
        setSelectTypeFood(e)
        setSear(e)
    }

    useEffect(() => {
        const loadSerch = async () => {
            if (sear) {
                if (props.searchPriv === 'true') {
                    navigate('/searcher/' + sear);
                } else {
                    navigate('/search/' + sear);
                }
            }
        }
        loadSerch()
    }, [sear])

    useEffect(() => {
        const loadSerch = async () => {

            if (params.search) {
                await searchRecipes(params.search);
            }

            if (params.searcher) {
                await searchPrivRecipes(params.searcher);
            }
        }
        loadSerch()
    }, [params])

 

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="absolute top-20 right-7 w-11/12 sm:w-3/4 md:w-2/4 lg:right-16">

                    <div className="flex">
                        <div className="flex-none">
                            <button onClick={() => showBarFood()} data-dropdown-toggle="dropdown-search-city" className="flex-shrink-0 z-10 mr-0.5 inline-flex items-center py-2.5 pt-2 px-4 text-sm font-medium text-center  bg-neutral-900 border-2 border-lime-900 rounded-s-lg hover:bg-neutral-700 focus:ring-1 focus:outline-none focus:ring-lime-700 " type="button">
                                {selectTypeFood ? (selectTypeFood) : ("Type")}
                                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <div id="dropdown-search-city" className={`${barFood ? 'visible' : 'hidden'} z-10 absolute mt-1 bg-neutral-800 divide-y divide-gray-100 rounded-lg shadow w-36 `}>
                                <ul className="py-2 text-sm " aria-labelledby="dropdown-button-2">
                                    {typeFood.map((type, i) => (
                                        <li key={i}>
                                            <button  type="button" value={type}  onClick={() => handleTypeFood(type)} className="inline-flex w-full px-4 py-2 text-sm  hover:bg-lime-900 " role="menuitem">
                                                <div className="inline-flex items-center">
                                                    {type}
                                                </div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="relative w-full">
                            <input type="search"
                                {...register('search')}
                                //  value={selectTypeFood} onChange={handleTypeFood}
                                className="block ring-2 ring-lime-700 focus:ring-2  focus:outline-none focus:ring-lime-500 focus:border-lime-500 pl-5 p-2.5 w-full z-20 text-sm font-medium  bg-neutral-800 rounded-e-full border-gray-900  "
                                placeholder="Search" required />
                            <button {...handleSubmit} 
                                type="submit" className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-lime-700 rounded-e-full border border-lime-700 hover:bg-lime-800 focus:ring-2 focus:outline-none focus:ring-grey-900">
                                <svg className="w-5 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {
                errors.map((error, i) => (
                    <div role="alert" key={i} className="rounded absolute  top-32 left-1/4 w-2/4 border-s-4 border-red-500 bg-red-100 p-4">
                        <div className="flex items-center gap-2 text-red-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                    clipRule="evenodd"
                                />
                            </svg>

                            <strong className="block font-medium"> Something went wrong </strong>
                        </div>

                        <p className="mt-2 text-sm text-red-700">{error}
                        </p>
                    </div>
                ))
            }

        </>
    )
}
