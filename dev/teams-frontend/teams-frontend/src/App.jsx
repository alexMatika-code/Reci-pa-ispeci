import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MainLayout from "./layouts/MainLayout.jsx";
import ErrorPage from './pages/ErrorPage.jsx';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import EditRecipePage from './pages/EditRecipePage';
import ProfilePage from "./pages/ProfilePage.jsx";
import IngredientsPage from "./pages/IngredientsPage";
import UserControlPage from "./pages/UserControlPage.jsx";
import ApproveRecipesPage from "./pages/ApproveRecipesPage.jsx";

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

    const editRecipe = async (recipeId, formData) => {
        const res = await fetch(`/api/recipes/${recipeId}`, {
            method: 'PUT',
            body: formData
        });
        return res.json();
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
                {/* Home page */}
                <Route index element={<HomePage />} />
                {/* Ingredient related pages */}
                <Route path='/ingredients' element={<IngredientsPage />}/>
                {/* Recipe related pages */}
                <Route path='/recipe/:recipeId' element={<RecipePage />} />
                <Route path='/recipe/add' element={<EditRecipePage addRecipeSubmit={addRecipe} />} />
                <Route path='/recipe/approve' element={<ApproveRecipesPage />} />
                <Route path='/recipe/:recipeId/edit' element={<EditRecipePage editRecipeSubmit={editRecipe} />} />
                {/* User related pages */}
                <Route path='/profile/:username' element={<ProfilePage />} />
                {/* User control page */}
                <Route path='/user-control' element={<UserControlPage />} />
                {/* Not found page */}
                <Route path='*' element={<ErrorPage code={404} text={"Page not found :("} />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />

}

export default App
