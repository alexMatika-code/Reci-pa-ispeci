import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route index element={<HomePage />} />
            <Route path='/recipe/:id' element={<RecipePage />} />
            <Route path='*' element={<NotFoundPage />} />
        </>
    )
);

const App = () => {
    return <RouterProvider router={router} />
}

export default App
