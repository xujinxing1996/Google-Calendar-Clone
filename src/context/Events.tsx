import { ReactNode, createContext, useEffect, useState } from "react";
import { UnionOmit } from "../utils/types";
import { EVENT_COLORS } from "./useEvent";

export type Event = {
  id: string;
  name: string;
  color: (typeof EVENT_COLORS)[number];
  date: Date;
} & (
  | { allDay: false; startTime: string; endTime: string }
  | { allDay: true; startTime?: never; endTime?: never }
);

type EventContext = {
  events: Event[];
  addEvent: (eventDetails: UnionOmit<Event, "id">) => void;
  updateEvent: (id: string, eventDetails: UnionOmit<Event, "id">) => void;
  deleteEvent: (id: string) => void;
};

export const Context = createContext<EventContext | null>(null);

type EventsProps = {
  children: ReactNode;
};

const EventsProvider = ({ children }: EventsProps) => {
  const [events, setEvents] = useLocalStorage("EVENTS", []);

  const addEvent = (event: UnionOmit<Event, "id">) => {
    setEvents((e) => [...e, { ...event, id: crypto.randomUUID() }]);
  };

  const updateEvent = (id: string, eventDetails: UnionOmit<Event, "id">) => {
    setEvents((e) =>
      e.map((item) => (item.id === id ? { id, ...eventDetails } : item))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((e) => e.filter((item) => item.id !== id));
  };

  return (
    <Context.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </Context.Provider>
  );
};

function useLocalStorage(key: string, initialState: Event[]) {
  const [value, setValue] = useState<Event[]>(() => {
    const jsonData = localStorage.getItem(key);

    if (jsonData == null) return initialState;

    return (JSON.parse(jsonData) as Event[]).map((event) => {
      if (event.date instanceof Date) return event;

      return { ...event, date: new Date(event.date) };
    });
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // 不加as const会报错，因为不加const，TS推导useLocalStorage的返回值是(Event[] | React.Dispatch<React.SetStateAction<Event[]>>)[], 应该使用const把类型限制为[Event[], React.Dispatch<React.SetStateAction<Event[]>>]
  return [value, setValue] as const;
}

export default EventsProvider;
