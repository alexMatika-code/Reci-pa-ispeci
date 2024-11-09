import {BeatLoader} from "react-spinners";

const Spinner = ({loading}) => {
    return (
        <div className={"text-center"}>
            <BeatLoader
                loading={loading}
                className={"d-inline-block my-5 color-dsg"}
                size={15}
            />
        </div>
    );
};

export default Spinner;