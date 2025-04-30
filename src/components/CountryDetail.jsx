import {  useEffect, useState } from "react";
import './CountryDetail.css';
import { Link, useLocation, useParams } from "react-router-dom";
import CountriesDetailShimmer from "./CountryDetailShimmer";
import { useTheme } from "../hooks/useTheme";

const CountryDetail = () => {
    const [isDark]  = useTheme()
    const params = useParams()
    // console.log(params);
    const countryName = params.country
    const {state} = useLocation()

    const [countryData, setCountryData] = useState(null)
    const [notFound, setNotFound] = useState(false)

  function updateCountryData(data) {
    setCountryData({
      name: data.name.common,
     nativeName: Object.values(data.name.nativeName || {})[0]?.common,
     population: data.population,
     region: data.region,
     subregion: data.subregion,
     capital: data.capital,
     flag: data.flags.svg,
     tld: data.tld,
     languages: Object.values(data.languages || {}).join(', '),
     currencies: Object.values(data.currencies || {})
       .map((currency) => currency.name)
       .join(', '),
     borders: []
       })

       if (!data.borders) {
           data.borders = []
       }
       
       Promise.all(data.borders.map((border) => {
           return  fetch(`https://restcountries.com/v3.1/alpha/${border}`)
             .then((res) => res.json())
             .then(([borderCountry]) => borderCountry.name.common)
         })).then ((borders) => {
           setTimeout(() => setCountryData((prevState) => ({...prevState, borders})))
         })
  }

    useEffect(() => {
      if (state) {
        updateCountryData(state)
        return
      }
        fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then(res => res.json())
        .then(([data]) => {   
            updateCountryData(data)
        }).catch(err => {
            setNotFound(true)
        })
    }, [countryName])
    if (notFound) {
        return <div>Country Not Found</div>
    }

    if (!countryData) {
     return <CountriesDetailShimmer/>
    }

     return countryData === null ? (
    'loading...'
  ) : (
    <main className={`${isDark ? 'dark' : ''}`}>
      <div className="country-details-container">
        <span className="back-button " onClick={() => history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        <div className="country-details">
          <img className="h-[340px] w-[478px] object-cover " src={countryData.flag} alt={`${countryData.name} flag`} />
          <div className="details-text-container">
            <h1 className="font-semibold text-[2rem] mb-[24px]">{countryData.name}</h1>
            <div className="details-text">
              <p>
                <strong>Native Name: </strong>
                <span className="native-name"> {countryData.nativeName || countryData.name}</span>
              </p>
              <p>
                <strong>
                  Population: 
                </strong>
                <span className="population"> {countryData.population.toLocaleString('en-IN')}</span>
              </p>
              <p>
                <strong>Region: </strong>
                <span className="region"> {countryData.region}</span>
              </p>
              <p>
                <strong>Sub Region: </strong>
                <span className="sub-region"> {countryData.subregion}</span>
              </p>
              <p>
                <strong>Capital: </strong>
                <span className="capital"> {countryData.capital?.join(', ')}</span>
              </p>
              <p>
                <strong>Top Level Domain: </strong>
                <span className="top-level-domain"> {countryData.tld}</span>
              </p>
              <p>
                <strong>Currencies: </strong>
                <span className="currencies"> {countryData.currencies}</span>
              </p>
              <p>
                <strong>Languages: </strong>
                <span className="languages"> {countryData.languages} </span>
              </p>
            </div>
            {countryData.borders.length !== 0 && <div className="border-countries">
              <strong>Border Countries: </strong>&nbsp;
              {
                countryData.borders.map((border) => <Link key={border} to={`/${border}`}>{border}</Link>)
              }
            </div>}
          </div>
        </div>
      </div>
    </main>
  )
}


export default CountryDetail;