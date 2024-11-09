import searchLogo from '../assets/search-svgrepo-com.svg'


const SearchBar = ({query, setQuery}) => {
    return (
        <div
            style={{
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #ccc",
                width: "40%",
                height: "4%",
                display: "flex",
                backgroundColor: "white",
                justifyContent: "start",
                gap: "0.5em",
                alignItems: "center",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
        >

            <img src={searchLogo} alt="looking-glass" height={16} width={16}/>
            <input
                placeholder={"U potrazi za dobrim jelom..."}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                    width: "100%",
                    border: 'none',
                    zIndex: "1",
                }}
            />
        </div>
    );
}
export default SearchBar