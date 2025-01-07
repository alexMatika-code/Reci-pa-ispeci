import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import Spinner from "../components/Spinner.jsx";

const EditRecipePage = () => {
    const { recipeId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        recipeId: null,
        title: '',
        description: '',
        procedure: '',
        publicity: true,
        timeToCook: 0,
        chefId: null,
        userId: null,
        imageBase64: null,
        ingredients: []
    });

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await fetch(`/api/recipes/${recipeId}`);
                const data = await res.json();
                setFormData({
                    recipeId: data.recipeId,
                    title: data.title,
                    description: data.description,
                    procedure: data.procedure,
                    publicity: data.publicity,
                    timeToCook: data.timeToCook,
                    chefId: data.chefId,
                    userId: data.userId,
                    imageBase64: data.imageBase64,
                    ingredients: data.ingredients || []
                });
            } catch (error) {
                console.error('Error fetching recipe:', error);
            } finally {
                setLoading(false);
            }
        };

        if (recipeId) {
            fetchRecipe();
        }
    }, [recipeId]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                setFormData(prev => ({
                    ...prev,
                    imageBase64: base64String
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`/api/recipes/${recipeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                navigate(`/recipe/${recipeId}`);
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(`/recipe/${recipeId}`);
    };

    if (loading) {
        return <Spinner loading={loading} />;
    }

    return (
        <Container className="py-5">
            <h2 className="mb-4">Uredi Recept</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Naslov</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Slika</Form.Label>
                    <Form.Control 
                        type="file" 
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Postupak</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="procedure"
                        value={formData.procedure}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Vrijeme pripreme (minute)</Form.Label>
                    <Form.Control
                        type="number"
                        name="timeToCook"
                        value={formData.timeToCook}
                        onChange={handleInputChange}
                        min="0"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="Javni recept"
                        name="publicity"
                        checked={formData.publicity}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <div className="d-flex gap-2 justify-content-end">
                    <Button variant="secondary" onClick={handleCancel}>
                        Odustani
                    </Button>
                    <Button variant="primary" type="submit">
                        Spremi Promjene
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default EditRecipePage;