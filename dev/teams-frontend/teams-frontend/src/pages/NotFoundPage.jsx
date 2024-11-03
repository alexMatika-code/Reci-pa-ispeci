import { BiErrorAlt } from "react-icons/bi";

const NotFoundPage = () => {
    return (
        <>
            <BiErrorAlt className={'d-inline mx-2'} />
            <div className={'d-inline'}>page not found :(</div>
        </>
    );
};

export default NotFoundPage;