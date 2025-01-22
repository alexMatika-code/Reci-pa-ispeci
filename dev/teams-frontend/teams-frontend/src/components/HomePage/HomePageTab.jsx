const HomePageTab = ({ showRecommended, setShowRecommended }) => {
    const handleTabClick = (isRecommended) => {
        setShowRecommended(isRecommended);
    };

    return (
        <div className="d-flex justify-content-center align-items-center mb-3">
            <div className={`mx-3 color-dsg cursor-pointer ${!showRecommended ? "bg-coral text-white bold px-2 py-1 rounded-2 shadow-sm" : ""}`}
                 onClick={() => handleTabClick(false)}>
                Javno
            </div>
            <div className={`mx-3 color-dsg cursor-pointer ${showRecommended ? "bg-coral text-white bold px-2 py-1 rounded-2 shadow-sm" : ""}`}
                 onClick={() => handleTabClick(true)}>
                Za tebe
            </div>
        </div>
    );
};

export default HomePageTab;
