import styles from "./CountryItem.module.css";
import PropTypes from "prop-types";
import Message from "./Message";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { countries, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!countries.length)
    return <Message message="Add a by country clicking on the map" />;

  // const countries = cities.reduce((arr, city) => {
  //   if (!arr.map((el) => el.country).includes(city.country))
  //     return [...arr, { country: city.country, emoji: city.emoji }];
  //   else return arr;
  // }, []);

  return (
    <div className={styles.countriesList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </div>
  );
}
CountryList.propTypes = { cities: PropTypes.array, isLoading: PropTypes.bool };
export default CountryList;
