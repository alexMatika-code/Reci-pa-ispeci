import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

const StarRating = ({rating}) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push(<BsStarFill key={i} className={'mx-1'}/>);
        } else if (rating >= i - 0.5) {
            stars.push(<BsStarHalf key={i} className={'mx-1'}/>);
        } else {
            stars.push(<BsStar key={i} className={'mx-1'}/>);
        }
    }

    return stars;
};

export default StarRating;