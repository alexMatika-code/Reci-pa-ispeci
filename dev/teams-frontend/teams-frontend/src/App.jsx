import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import EditRecipePage from './pages/EditRecipePage';


const App = () => {
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

    const addRecipe = async (formData) => {
        const res = await fetch('/api/recipes', {
            method: 'POST',
            body: formData
        });
        return res.json();
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route index element={<HomePage />} />
                <Route path='/recipe/:id' element={<RecipePage />} />
                <Route path='sign-in' element={<SignInPage signInSubmit={signIn} />} />
                <Route path='sign-up' element={<SignUpPage signUpSubmit={signUp} />} />
                <Route path='/recipe/add' element={<EditRecipePage addRecipeSubmit={addRecipe} />} />
                <Route path='*' element={<NotFoundPage />} />
            </>
        )
    );

    return <RouterProvider router={router} />
}

export default App
