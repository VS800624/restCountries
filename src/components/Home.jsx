
import SearchBar from "./SearchBar";
import SelectMenu from "./SelectMenu";
import CountriesList from "./CountriesList";
import { useContext, useEffect, useState } from "react";
// import { useOutletContext } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";




const Home = () => {
    const [query, setQuery] = useState('')
    const [isDark]  = useTheme()
   
    return <>
        <main className= {`${isDark? 'dark' : ''}`}>
            <div className="search-filter-container">
            <SearchBar setQuery={setQuery} />
            <SelectMenu setQuery={setQuery}/>
            </div>
            
            {/* {query === 'unmount' ? '' : <CountriesList query= {query}/> } */}
            <CountriesList query= {query}/>
        </main>
    </>
}

export default Home;