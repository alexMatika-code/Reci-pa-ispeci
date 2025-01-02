

const RecipePageTextBox = ({ header, text }) => {

    return (

        <div className={" ptb-10-20 m-3 mb-5 text-align-left bg-white b-radius-30 shadow-lg"}>
            <h5 className={"color-coral mt-3 ml-16 color-dsg font-weight-600"}>{header}</h5>
            <p> {text} </p>
        </div>


    )
        ;
};

export default RecipePageTextBox;