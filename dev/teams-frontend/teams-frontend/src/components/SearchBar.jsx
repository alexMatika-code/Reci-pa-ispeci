import searchLogo from '../assets/search-svgrepo-com.svg'


const SearchBar = ({query, setQuery}) => {
    return (
        <div className={"search-bar-main d-flex justify-content-start gap-1 align-items-center"}>

            <img src={searchLogo} alt="looking-glass" height={16} width={16}/>
            <input
                className={"search-input w-100"}
                placeholder={"U potrazi za dobrim jelom..."}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
}
export default SearchBar