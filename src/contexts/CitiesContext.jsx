/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const BASE_URL = "http://localhost:8000/";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
  countries: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "loaded": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "cities/loaded": {
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
        countries: action.payload,
      };
    }
    case "city/loaded": {
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    }

    case "cities/created": {
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        countries: [...state.countries, action.payload],
      };
    }

    case "cities/deleted": {
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        countries: state.countries.filter(
          (country) => country.id !== action.payload
        ),
        currentCity: {},
      };
    }
    case "rejected": {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
  }
}

function CitiesProvider({ children }) {
  const [{ countries, cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: "loaded" });
      try {
        // setIsLoading(true);
        const response = await fetch(`${BASE_URL}cities`);
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
        // setCities(data);
      } catch {
        dispatch({ type: "rejected", payload: "Error loading Data" });
      }
    }
    fetchData();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loaded" });
      try {
        // setIsLoading(true);
        const response = await fetch(`${BASE_URL}cities/${id}`);
        const data = await response.json();
        dispatch({
          type: "city/loaded",
          payload: data,
        });
        // setCurrentCity(data);
      } catch {
        dispatch({ type: "rejected", payload: "Error loading City Data" });
      }
    },
    [currentCity.id]
  );
  async function createCity(newCity) {
    dispatch({ type: "loaded" });
    try {
      // setIsLoading(true);
      const response = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();

      // setCities((cities) => [...cities, data]);
      dispatch({ type: "cities/created", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "Error creating city" });
    } finally {
      // setIsLoading(false);
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loaded" });
    try {
      // setIsLoading(true);
      await fetch(`${BASE_URL}cities/${id}`, {
        method: "DELETE",
      });

      // setCities(cities.filter((city) => city.id !== id));
      dispatch({
        type: "cities/deleted",
        payload: id,
      });
    } catch {
      dispatch({ type: "rejected", payload: "Error Deleting City" });
      // alert("Error Deleting City");
    } finally {
      // setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        countries,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("Cities context being used outside the CitiesContext");
  }
  return context;
}

export { CitiesProvider, useCities };
