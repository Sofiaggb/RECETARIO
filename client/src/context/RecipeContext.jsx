import { createContext, useContext, useState, useEffect } from "react";
import { createRecipeRequest, deleteRecipeRequest, getMenuRequest, getPublicMenuRequest, getRecipeRequest, updateRecipeRequest } from "../api/recipes";

export const RecipeContext = createContext();

export const useRecipes = () => {
    const context = useContext(RecipeContext);

    if (!context) {
        throw new Error('useRecipe must be used within an RecipeProvider')

    } return context
};

// eslint-disable-next-line react/prop-types
export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const [recipe, setRecipe ] = useState(null)
    const [errors, setErrors] = useState([]);

    const getPublicMenu = async () => {
        try {
            const res = await getPublicMenuRequest();
            setRecipes(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getMenu = async () => {
        try {
            const res = await getMenuRequest();
            setRecipes(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const createRecipe = async (recipe) => {
        try {
            const res = await createRecipeRequest(recipe);
            console.log(res)

        } catch (error) {
            if (Array.isArray(error.response.data)) {
                setErrors(error.response.data)
                return
            }
            setErrors([error.response.data.message])
        }
    }

    const deleteRecipe = async (id) => {
        try {
            const res = await deleteRecipeRequest(id)
            if (res.status === 200) setRecipes(recipes.filter(recipe => recipe._id != id))
        } catch (error) {
            console.log(error)
        }
    }

    const getRecipe = async (id) => {
        try {
            const res = await getRecipeRequest(id);
            setRecipe(res.data)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const updateRecipe = async (id, recipe) => {
       try {
        const res = await updateRecipeRequest(id, recipe)
        console.log(res)
       } catch (error) {
        console.log(error);
       }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 10000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    return (
        <RecipeContext.Provider
            value={{
                recipes, createRecipe, getMenu, getPublicMenu, recipe,
                deleteRecipe, updateRecipe, getRecipe , errors
            }}>
            {children}
        </RecipeContext.Provider>
    );
}