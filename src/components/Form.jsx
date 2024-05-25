// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { usePosition } from "../hooks/usePosition";
import { useGeolocation } from "../hooks/useGeolocation";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const Base_Url = "https://api.bigdatacloud.net/data/reverse-geocode-client/";

function Form() {
  const { mapLat, mapLng } = usePosition();
  const [isLoadingGro, setIsLoadingGeo] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [windowError, setWindowError] = useState("");
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        setIsLoadingGeo(true);
        setWindowError("");
        const res = await fetch(
          `${Base_Url}?latitude=${mapLat}&longitude=${mapLng}`
        );
        const data = await res.json();
        if (!data.countryCode) throw new Error("No such ciy exists");
        setCityName(data.city || data.locality || "");
        setCountry(data.country);
        console.log(data);
        setEmoji(data.countryCode);
      } catch (err) {
        setWindowError(err.message);
      } finally {
        setIsLoadingGeo(false);
      }
    }

    getData();
  }, [mapLat, mapLng]);
  if (isLoadingGro) return <Spinner />;
  if (windowError) return <Message message={windowError} />;
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
      </div>
      <div>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
