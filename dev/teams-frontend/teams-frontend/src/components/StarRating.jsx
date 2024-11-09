import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

const StarRating = ({rating}) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push(<BsStarFill key={i} className={'mx-1'}/>); // Full star if the AvgRating is greater or equal to the index
        } else if (rating >= i - 0.5) {
            stars.push(<BsStarHalf key={i} className={'mx-1'}/>); // Half star if AvgRating is between index - 0.5 and index
        } else {
            stars.push(<BsStar key={i} className={'mx-1'}/>); // Empty star if AvgRating is less than index - 0.5
        }
    }

    return stars;
};

export default StarRating;