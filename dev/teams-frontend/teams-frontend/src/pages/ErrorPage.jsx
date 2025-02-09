import { BiErrorAlt } from "react-icons/bi";

const ErrorPage = ({code, text}) => {
    return (
        <div>
            <div className={"m-auto text-center justify-content-center pt-120 px-4"}>
                <h2 className={"bold color-lsg font-8rem"}>{code}</h2>
                <span className={"color-dsg font-2-2rem d-flex align-items-center justify-content-center"}>
                    <BiErrorAlt className={'d-inline mx-2'}/>
                    <span className={'d-inline'}>{text}</span>
                </span>
                <h5 className={"pt-4 color-lsg"}>Ne znam zašto smo ovdje, ali ne bi trebali biti...</h5>
            </div>
        </div>
    );
};

export default ErrorPage;