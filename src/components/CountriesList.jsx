import React, { useEffect, useState } from "react";
// import { countriesData } from "../data";
import CountryCard from "./CountryCard";
import CountriesListShimmer from "./CountriesListShimmer";

const CountriesList = ({query}) => {
    const [countriesData, setCountriesData] = useState([])
    

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,subregion,capital,tld,currencies,languages')
            .then((res) => res.json())
            .then((data) => {
                setCountriesData(data);
            });
    }, []);
        
    //     return () => {
    //         console.log('Cleaning Up');
    //     }
    // },[])
    
    // useEffect(() => {
    //     console.log('Hi');
    // }, [count, countriesData])

    // if (!countriesData.length) {
    //  return <CountriesListShimmer/>
    // }


    return <>
        {/* <h1 >{count}</h1>
        <button  onClick={(e) => setCount(count + 1)}>Increase Count</button> */}       
        {!countriesData.length ? <CountriesListShimmer/>: <div className="countries-container">{
        countriesData.filter((country) => country.name.common.toLowerCase().includes(query) || country.region.toLowerCase().includes(query)
            )
            .map((country, i) => {
            return (
                <CountryCard
                key={i}
                name={country.name.common}
                flag={country.flags.svg}
                population={country.population.toLocaleString("en-IN")}
                region={country.region}
                capital={country.capital?.[0]}
                data={country}
                />
            )})
        }</div>}
    </>
};

export default CountriesList;
