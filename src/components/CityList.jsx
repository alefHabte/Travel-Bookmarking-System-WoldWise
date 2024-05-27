import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import PropTypes from "prop-types";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
// import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add a city by clicking on the map" />;
  return (
    <div className={styles.CityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </div>
  );
}
CityList.propTypes = { cities: PropTypes.array, isLoading: PropTypes.bool };

export default CityList;
