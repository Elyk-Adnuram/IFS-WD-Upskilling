import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {readJson, writeJson} from '../utils/storage.js';
import {useAuth} from './AuthContext.jsx';

const EventContext = createContext(null);

const storageKeyFor = (userId) => `planner_events_${userId}`;

export function EventProvider({children}) {
  const {user} = useAuth();
  const userId = user?.id;
  const [events, setEvents] = useState([]);

  // Load the signed-in user's events; clear them on logout.
  useEffect(() => {
    setEvents(userId ? readJson(storageKeyFor(userId), []) : []);
  }, [userId]);

  // Applies a change to state and persists it in one step.
  const commit = useCallback((updater) => {
    setEvents((current) => {
      const next = updater(current);
      if (userId) writeJson(storageKeyFor(userId), next);
      return next;
    });
  }, [userId]);

  const addEvent = useCallback((details) => {
    commit((current) => [...current, {...details, id: crypto.randomUUID()}]);
  }, [commit]);

  const updateEvent = useCallback((id, details) => {
    commit((current) => current.map(
        (event) => (event.id === id ? {...event, ...details} : event)));
  }, [commit]);

  const deleteEvent = useCallback((id) => {
    commit((current) => current.filter((event) => event.id !== id));
  }, [commit]);

  const value = useMemo(
      () => ({events, addEvent, updateEvent, deleteEvent}),
      [events, addEvent, updateEvent, deleteEvent]);
  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) throw new Error('useEvents must be used inside EventProvider');
  return context;
}
