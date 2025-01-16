import {useContext, useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import placeholder from "../assets/placeholder.jpg";
import RecipeAddIngredients from '../components/RecipeAddIngredients';
import {Form, Row, Button, InputGroup} from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroupText";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AuthContext} from "../Contexts.jsx";
import Spinner from "../components/Spinner.jsx";
import ErrorPage from "./ErrorPage.jsx";

const EditRecipePage = () => {
    const { recipeId } = useParams();
    const currentUser = useContext(AuthContext);
    const navigate = useNavigate();
    const isEditing = Boolean(recipeId);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [procedure, setProcedure] = useState("");
    const [timeToCook, setTimeToCook] = useState("");
    const [publicity, setPublicity] = useState("private");
    const [ingredients, setIngredients] = useState([]);
    const [image, setImage] = useState(null);
    const [hasImage, setHasImage] = useState(false);

    const [loading, setLoading] = useState(isEditing);

    useEffect(() => {
        const fetchData = async () => {
            if (!isEditing) {
                setLoading(false);
                return;
            }

            try {
                const [recipeResponse, ingredientsResponse] = await Promise.all([
                    fetch(`/api/recipes/${recipeId}`),
                    fetch(`/api/ingredients/recipe/${recipeId}`)
                ]);

                const recipeData = await recipeResponse.json();
                const ingredientsData = await ingredientsResponse.json();

                // Set recipe data
                setTitle(recipeData.title);
                setDescription(recipeData.description);
                setProcedure(recipeData.procedure);
                setTimeToCook(recipeData.timeToCook);
                setPublicity(recipeData.publicity ? "public" : "private");
                setIngredients(ingredientsData);
                setHasImage(true);

                // Handle image
                if (recipeData.imageBase64) {
                    const response = await fetch(`data:image/jpeg;base64,${recipeData.imageBase64}`);
                    const blob = await response.blob();
                    const file = new File([blob], 'recipe.jpg', { type: 'image/jpeg' });
                    setImage(file);

                    const selectedImage = document.getElementById('recipeImg');
                    if (selectedImage) {
                        selectedImage.src = `data:image/jpeg;base64,${recipeData.imageBase64}`;
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Error loading recipe data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [recipeId, isEditing]);

    const addRecipe = async (formData) => {
        try {
            setLoading(true);
            const response = await fetch('/api/recipes/create', {
                method: 'POST',
                body: formData
            });
            if (response.ok){
                toast.success('Recept uspješno spremljen!');
            }
            else{
                toast.error('Greška prilikom spremanja recepta.');
            }
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
        finally {
            setLoading(false);
            navigate('/');
        }
    }

    const editRecipe = async (recipeId, formData) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/recipes/${recipeId}`, {
                method: 'PUT',
                body: formData
            });
            if (response.ok){
                toast.success('Recept uspješno uređen!');
            }
            else{
                toast.error('Greška prilikom spremanja recepta.');
            }
        } catch (error) {
            console.error('Error editing recipe:', error);
        }
        finally {
            setLoading(false);
            navigate(`/recipe/${recipeId}`);
        }
    }

    const displaySelectedImage = (event) => {
        const selectedImage = document.getElementById('recipeImg');
        const fileInput = event.target;

        if (fileInput.files && fileInput.files[0]) {
            if(fileInput.files[0].size > 2097152) {
                toast.warn("Slika je prevelika");
                return false;
            }
            const reader = new FileReader();
            reader.onload = function(e) {
                selectedImage.src = e.target.result;
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
        setImage(fileInput.files[0]);
        setHasImage(true);
    }

    const submitForm = (e) => {
        e.preventDefault();

        console.log(ingredients.count);
        console.log(ingredients);
        if(ingredients.length === 0){
            toast.warn("Minimalan broj sastojaka je 1");
            return;
        }

        if (hasImage === false) {
            toast.warn("Priložite sliku jela");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('timeToCook', timeToCook);
        formData.append('procedure', procedure);
        // formData.append('publicity', publicity);
        (publicity === "private" ?
                formData.append('publicity', false)
                :
                formData.append('publicity', true)
        );
        formData.append('image', image);

        const ingIds = ingredients.map(item => item.ingredientId);
        formData.append('ingredientIds', ingIds);

        try {
            if (recipeId) {
                editRecipe(recipeId, formData);

            } else {
                addRecipe(formData);

            }
        } catch (error) {
            toast.error('Error saving recipe: ' + error);
        }
    }

    if (loading) {
        return <Spinner loading={loading}/>
    }

    return (
        <>
            {currentUser ? (
                <div className={"w-75 m-auto pt-40"}>
                    <Form className={'form-group'} onSubmit={submitForm}>
                        <h5 className={"mb-4"}>Unesite podatke o jelu</h5>

                        <Row className={"d-flex h-100"}>
                            <div className={"col-md-12 col-lg-3"}>
                                <img src={placeholder}
                                     alt="img"
                                     id={'recipeImg'}
                                     style={{maxWidth: "100%"}}
                                     className={'border border-4 rounded mb-3'}/>
                                <div className="mb-3 text-align-right">
                                    <Form.Control className="form-control-sm"
                                                  type="file"
                                                  accept=".jpg,.png"
                                                  onChange={displaySelectedImage}/>
                                </div>

                                <RecipeAddIngredients ingredients={ingredients}
                                                      setIngredients={setIngredients}/>

                                <Form.Floating className={"mb-4"}>
                                    <Form.Select id="publicitySelect"
                                                 value={publicity}
                                                 onChange={(e) => setPublicity(e.target.value)}>
                                        <option value="private">Privatno</option>
                                        <option value="public">Javno</option>
                                    </Form.Select>
                                    <label htmlFor="publicitySelect">Dostupnost</label>
                                </Form.Floating>
                            </div>
                            <div className={"col-md-12 col-lg-9"}>
                                <Row>
                                    <div className="form-outline mb-4 col-md-12 col-lg-8">
                                        <Form.Control type="name"
                                                      placeholder="Naziv jela"
                                                      required
                                                      value={title}
                                                      onChange={(e) => setTitle(e.target.value)}/>
                                    </div>
                                    <div className={'form-outline mb-4 col-md-12 col-lg-4'}>
                                        <InputGroup>
                                            <Form.Control type="number"
                                                          placeholder="Vrijeme pripreme"
                                                          required
                                                          value={timeToCook}
                                                          onChange={(e) => setTimeToCook(e.target.value)}/>
                                            <InputGroupText>minuta</InputGroupText>
                                        </InputGroup>
                                    </div>
                                </Row>

                                <div className="form-outline mb-4">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Opis"
                                        rows={'3'}
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}/>
                                </div>
                                <div className="form-outline mb-4">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Priprema"
                                        rows='11'
                                        required
                                        value={procedure}
                                        onChange={(e) => setProcedure(e.target.value)}/>
                                </div>
                                <div className="w-100 d-flex align-items-center justify-content-md-end mb-5">
                                    <div className={"text-secondary font-0-8rem mx-3 h-100"}> Slika može biti maksimalno
                                        2MB
                                    </div>
                                    <Button type="submit" variant="primary" className="w-25">
                                        {recipeId ?  'Uredi' : (publicity === "private" ? 'Dodaj' : 'Predloži')} recept
                                    </Button>
                                </div>
                            </div>
                        </Row>
                    </Form>
                </div>
            ) : (
                <>
                    <ErrorPage code={401} text={"Unauthorized :("} />
                </>
            )}
        </>

    );
};

export default EditRecipePage;