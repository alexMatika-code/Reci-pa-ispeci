import React, { useState, useEffect } from 'react';
import placeholder from "../assets/placeholder.jpg";
import { Link } from 'react-router-dom';

const ProfileIcon = ({ authorId }) => {
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await fetch(`/api/people/${authorId}`);
                const data = await response.json();
                setAuthor(data);
            } catch (error) {
                console.error('Error fetching author:', error);
            } finally {
                setLoading(false);
            }
        };

        if (authorId) {
            fetchAuthor();
        }
    }, [authorId]);

    return (
        <Link 
            to={`/profile/${author?.username}`}
            className="text-decoration-none"
        >
            <div className="d-inline-flex mt-3 px-3 py-1 d-flex align-items-center
             rounded-pill bg-white cursor-pointer b-radius-30 shadow-sm"
                 >
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
