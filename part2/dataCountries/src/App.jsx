import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const api_key = import.meta.env.VITE_SOME_KEY;
  const [searchCountry, setSearchCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState([]);
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);


  const countriesToShow =
    searchCountry.length > 0
      ? countries.filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(searchCountry.toLowerCase())
        )
      : [];

  useEffect(() => {
    if(countriesToShow.length === 1) {
      axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${countriesToShow[0].capitalInfo.latlng[0]}&lon=${countriesToShow[0].capitalInfo.latlng[1]}&appid=${api_key}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      });
    }
  }, [countriesToShow]);
  return (
    <>
      <div>
        find countries{" "}
        <input
          value={searchCountry}
          onChange={(e) => setSearchCountry(e.target.value)}
        />
      </div>
      <div>
        {countriesToShow.length > 10
          ? "Too many matches, specify another filter"
          : countriesToShow.length === 1
          ? countriesToShow.map((country) => (
              
              <div key={country.alpha2Code}>
                <h1>{country.name.common}</h1>
                <>capital {country.capital}</>
                <br />
                <>area {country.area}</>
                <h3>languages:</h3>
                <ul>
                  {Object.values(country.languages).map((language) => (
                    <li key={language.iso639_1}>{language}</li>
                  ))}
                </ul>
                <br />
                <img
                  src={country.flags.svg}
                  alt={country.flags.alt}
                  height={140}
                />
                <h2>Weather in {country.capital}</h2>
                {
                weather ? (
                  <div>
                    <p>temperature {weather.main.temp} Celcius</p>
                    <img
                      src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                      alt={weather.weather[0].description}
                      width={100}
                    />
                    <p>wind {weather.wind.speed} m/s</p>
                  </div>
                ) : (
                  <p>Loading weather...</p>
                )}
              </div>
            ))
          : countriesToShow.map((country) => (
              <div key={country.name.official}>
                <>
                  {country.name.common}{" "}
                  <button
                    onClick={() => setSearchCountry(country.name.common)}
                  >
                    show
                  </button>
                </>
              </div>
            ))}
      </div>
    </>
  );
  };


export default App;
