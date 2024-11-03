import Button from "react-bootstrap/Button";
import {useState} from "react";

const HomePage = () => {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className={'card w-50 mx-auto p-0'}>
                <h1 className={'card-header'}>Reci pa ispeci</h1>
                <h3 className={'py-2'}>Interaktivna stranica za recepte</h3>
                <Button
                    className={'btn-success w-25 mx-auto my-2'}
                    onClick={() => setCount((count) => count + 1)}>
                    Count is {count}
                </Button>
            </div>
        </>
    )
}

export default HomePage