import { useState, useEffect } from 'react';
import placeholder from "../../assets/placeholder.jpg";
import { Link } from 'react-router-dom';

const RecipeProfileIcon = ({ username }) => {
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                if (!username) {
                    throw new Error('No author ID provided');
                }

                const response = await fetch(`/api/people/profile/${username}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch author data');
                }
                
                const data = await response.json();
                setAuthor(data);

            } catch (error) {
                console.error('Error fetching author:', error);
                setAuthor(null);
            }
        };

        if (username) {
            fetchAuthor();
        }
    }, [username]);

    return (
        <Link 
            to={`/profile/${username}`}
            className="text-decoration-none"
        >
            <div className="d-inline-flex mt-1 px-3 py-1 d-flex align-items-center
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
                    {username}
                </span>
            </div>
        </Link>
    );
};

export default RecipeProfileIcon;
