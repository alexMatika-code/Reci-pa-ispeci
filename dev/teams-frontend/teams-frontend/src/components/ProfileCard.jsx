import {Badge, Row} from "react-bootstrap";
import placeholder from "../assets/placeholder.jpg";
import {BsClipboard2HeartFill, BsClipboard2PulseFill} from "react-icons/bs";
import StarRating from "./StarRating.jsx";

const ProfileCard = ({user}) => {
    return (
        <div className={"text-center bg-white profile-card mb-4 shadow-sm"}>
            <img src={user.image || placeholder}
                 alt="img"
                 id={'recipeImg'}
                 className={'border border-4 rounded-circle max-w-85 min-w-85 mt-3 shadow-sm'}
            />
            <h2 className={"mb-2 mt-4 color-dsg bold"}>{(user.firstName || "") + " " + (user.lastName || "")}</h2>
            <h5 className={"color-lsg"}>@{user.username} <Badge bg="info">{user.role}</Badge></h5>
            <Row className={'w-75 m-auto mt-5'}>
                <div className={'col-md-3 col-lg-6 mb-3 color-dsg'}>
                    <h4 className={"bold"}>{user.recipes.length}</h4>
                    <span className={"font-1-2rem"}>
                    <BsClipboard2HeartFill/> recepata
                </span>
                </div>
                <div className={'col-md-3 col-lg-6 mb-5 color-dsg'}>
                    <h4 className={"bold"}>{user.ratings.length}</h4>
                    <span className={"font-1-2rem"}>
                        <BsClipboard2PulseFill/> recenzija
                    </span>
                </div>
                <div className={"mb-5 col-md-6 col-lg-12 color-dsg"}>
                    <div className={'mb-2 font-1-4rem'}>
                        <StarRating rating={user.avgRating}/>
                    </div>
                    <div>
                        Prosječna ocjena: <span className={"bold"}>{user.avgRating || '0'}</span> od <span className={"bold"}>5</span>
                    </div>
                </div>
            </Row>
        </div>
    );
};

export default ProfileCard;