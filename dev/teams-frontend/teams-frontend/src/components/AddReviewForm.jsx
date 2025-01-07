import  { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddReviewForm = ({ recipeId, onReviewAdded, onCancel }) => {
    const [formData, setFormData] = useState({
        ratingId: null,
        grade: 5,
        comment: '',
        personId: null,
        recipeId: parseInt(recipeId)
    });
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        try {
            const response = await fetch('/api/ratings/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grade: formData.grade,
                    comment: formData.comment,
                    recipeId: formData.recipeId
                }),
                credentials: 'include'
            });

            if (!response.ok) {
                // Try to parse as JSON first
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to submit review');
                } else {
                    // If not JSON, get text
                    const errorText = await response.text();
                    throw new Error(errorText || 'Failed to submit review');
                }
            }

            // Try to parse success response
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                console.log('Review submitted successfully:', data);
            }
            
            await onReviewAdded();
            onCancel();
        } catch (error) {
            console.error('Error adding review:', error);
            setError(error.message || 'Failed to submit review');
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm mb-4">
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            
            <Form.Group className="mb-3">
                <Form.Label>Ocjena</Form.Label>
                <Form.Select
                    value={formData.grade}
                    onChange={(e) => setFormData(prev => ({ ...prev, grade: parseInt(e.target.value) }))}
                >
                    <option value="5">★★★★★</option>
                    <option value="4">★★★★</option>
                    <option value="3">★★★</option>
                    <option value="2">★★</option>
                    <option value="1">★</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Komentar</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.comment}
                    onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder="Napišite svoj komentar..."
                    required
                />
            </Form.Group>

            <div className="d-flex gap-2 justify-content-end">
                <Button variant="secondary" onClick={onCancel}>
                    Odustani
                </Button>
                <Button variant="primary" type="submit">
                    Objavi
                </Button>
            </div>
        </Form>
    );
};

export default AddReviewForm; 