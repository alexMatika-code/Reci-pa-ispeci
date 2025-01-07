import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecipeComment = ({ rating }) => {
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await fetch(`/api/people/${rating.personId}`);
                const data = await response.json();
                setAuthor(data);
            } catch (error) {
                console.error('Error fetching author:', error);
            }
        };

        if (rating.personId) {
            fetchAuthor();
        }
    }, [rating.personId]);

    const renderStars = (grade) => {
        return "★".repeat(grade) + "☆".repeat(5-grade);
    };

    return (
        <div className="border-bottom py-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <Link 
                    to={`/profile/${author?.username}`}
                    className="text-decoration-none"
                >
                    <span className="fw-bold text-dark">
                        {author?.username || 'Korisnik'}
                    </span>
                </Link>
                <span className="text-warning">{renderStars(rating.grade)}</span>
            </div>
            <p className="text-muted mb-0">{rating.comment}</p>
        </div>
    );
};

export default RecipeComment; 