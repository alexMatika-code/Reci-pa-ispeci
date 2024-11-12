import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import EditRecipePage from './pages/EditRecipePage';
import RecipeCard from "./components/RecipeCard.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import EditProfile from "./pages/EditProfilePage.jsx";

const App = () => {

    // Authentication
    const signUp = async (user) => {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user})
        });
        return res.json();
    }

    const signIn = async (user) => {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user})
        });
        return res.json();
    }

    // Recipe manipulation
    const addRecipe = async (formData) => {
        const res = await fetch('/api/recipes/create', {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'multipart/form-data',
            // },
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
                {/* Auth page */}
                <Route path='sign-in' element={<SignInPage signInSubmit={signIn} />} />
                <Route path='sign-up' element={<SignUpPage signUpSubmit={signUp} />} />
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
