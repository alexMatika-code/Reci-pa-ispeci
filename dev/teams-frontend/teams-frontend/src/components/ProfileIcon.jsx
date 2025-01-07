import { useState, useEffect } from 'react';
import placeholder from "../assets/placeholder.jpg";
import { Link } from 'react-router-dom';

const ProfileIcon = ({ authorId }) => {
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                if (!authorId) {
                    throw new Error('No author ID provided');
                }
                
                const response = await fetch(`/api/people/${authorId}`, {
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Author not found');
                    }
                    throw new Error('Failed to fetch author data');
                }
                
                const personDTO = await response.json();
                setAuthor({
                    username: personDTO.username,
                    image: personDTO.image,
                    personId: personDTO.personId
                });
            } catch (error) {
                console.error('Error fetching author:', error);
                setError(error.message);
                setAuthor(null);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthor();
    }, [authorId]);

    if (loading) {
        return (
            <div className="d-inline-flex mt-3 px-3 py-1 d-flex align-items-center rounded-pill bg-white shadow-sm">
                <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-inline-flex mt-3 px-3 py-1 d-flex align-items-center rounded-pill bg-white shadow-sm">
                <span className="text-muted">Author unavailable</span>
            </div>
        );
    }

    return (
        <Link 
            to={`/profile/${author?.username || ''}`}
            className="text-decoration-none"
        >
            <div className="d-inline-flex mt-3 px-3 py-1 d-flex align-items-center rounded-pill bg-white cursor-pointer shadow-sm">
                <img 
                    src={author?.image ? `data:image/jpeg;base64,${author.image}` : placeholder}
                    alt="profile"
                    style={{
                        width: '35px',
                        height: '35px',
                        objectFit: 'cover'
                    }}
                    className="rounded-circle"
                />
                <span className="ms-2 fw-bold color-dsg">
                    {author?.username || 'name'}
                </span>
            </div>
        </Link>
    );
};

export default ProfileIcon;
