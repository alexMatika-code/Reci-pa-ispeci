import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import EditRecipePage from './pages/EditRecipePage';
import RecipeCard from "./components/RecipeCard.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import EditProfile from "./pages/EditProfilePage.jsx";
import IngredientsPage from "./pages/IngredientsPage";

const App = () => {
    // Recipe manipulation
    const addRecipe = async (formData) => {
        const res = await fetch('/api/recipes/create', {
            method: 'POST',
            body: formData
        });
        console.log(res.json());
        return res.json();
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                {/* Home page */}
                <Route index element={<HomePage />} />
                {/* Ingredient related pages */}
                <Route path='/ingredients' element={<IngredientsPage />}/>
                {/* Recipe related pages */}
                <Route path='/recipe/:recipeId' element={<RecipePage />} />
                <Route path='/recipe/add' element={<EditRecipePage addRecipeSubmit={addRecipe} />} />
                <Route path='/card' element={<RecipeCard />} />
                {/* User related pages */}
                {/*<Route path='/profile' element={<ProfilePage />} />*/}
                <Route path='/profile/:username' element={<ProfilePage />} />
                {/* Not found page */}
                <Route path='*' element={<NotFoundPage />} />
                <Route path='/profile/edit' element={<EditProfile />} />
            </>
        )
    );

    return <RouterProvider router={router} />

}

export default App
