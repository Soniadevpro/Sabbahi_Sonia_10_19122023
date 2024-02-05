import PropTypes from "prop-types";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
    } catch (err) {
      setError(err);
    }
  }, []);
  const events = data?.events; // extraire la liste des événements de data. Si data ? alors events existe sinon undefined
  const eventsSort = events?.sort((evtA, evtB) => (new Date(evtA.date) > new Date(evtB.date) ? -1 : 1)); // Si events? alors on tri (sort) fonction si evtA est plus récent que evtB retourne -1 SINON (:) retourne 1 (evtB avant evA)
  const last = eventsSort?.[0]; // Si eventsSort ? alors on récupère le [0] (celui qui sera affiché et donc le plus récent)
  useEffect(() => {
    if (data) return;
    getData();
  });

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
