import { FormEvent, Fragment, useMemo, useRef, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
  parse,
} from "date-fns";
import { formatDate } from "../utils/formatDate";
import { cc } from "../utils/cc";
import Modal, { ModalProps } from "./Modal";
import { Event } from "../context/Events";
import { UnionOmit } from "../utils/types";
import { EVENT_COLORS, useEvents } from "../context/useEvent";
import OverflowContainer from "./OverflowContainer";

const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const calendarDays = useMemo(() => {
    const firstWeekStart = startOfWeek(startOfMonth(selectedMonth));
    const lastWeekEnd = endOfWeek(endOfMonth(selectedMonth));
    return eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd });
  }, [selectedMonth]);

  const { events } = useEvents();

  return (
    <div className="calendar">
      <div className="header">
        <button className="btn" onClick={() => setSelectedMonth(new Date())}>
          Today
        </button>
        <div>
          <button
            className="month-change-btn"
            onClick={() => setSelectedMonth((m) => subMonths(m, 1))}
          >
            &lt;
          </button>
          <button
            className="month-change-btn"
            onClick={() => setSelectedMonth((m) => addMonths(m, 1))}
          >
            &gt;
          </button>
        </div>
        <span className="month-title">
          {formatDate(selectedMonth, { month: "long" })}{" "}
          {formatDate(selectedMonth, { year: "numeric" })}
        </span>
      </div>
      <div className="days">
        {calendarDays.map((day, index) => (
          <CalendarDay
            key={day.getTime()}
            day={day}
            events={events.filter((event) => isSameDay(event.date, day))}
            showWeekName={index < 7}
            selectedMonth={selectedMonth}
          />
        ))}
      </div>
    </div>
  );
};

type CalendarDayProps = {
  day: Date;
  showWeekName: boolean;
  events: Event[];
  selectedMonth: Date;
};

const CalendarDay = ({
  day,
  showWeekName,
  events,
  selectedMonth,
}: CalendarDayProps) => {
  const { addEvent } = useEvents();
  const [isOpenEventFormModal, setIsOpenEventFormModal] = useState(false);
  const [isViewMoreEventModalOpen, setIsViewMoreEventModalOpen] =
    useState(false);

  const sortedEvents = useMemo(() => {
    const timeToNumber = (time: string) => {
      return parseFloat(time.replace(":", "."));
    };

    return events.sort((a, b) => {
      if (a.allDay && b.allDay) {
        return 0;
      } else if (a.allDay) {
        return -1;
      } else if (b.allDay) {
        return 1;
      } else {
        return timeToNumber(a.startTime) - timeToNumber(b.startTime);
      }
    });
  }, [events]);

  return (
    <div
      className={cc(
        "day",
        !isSameMonth(day, selectedMonth) && "non-month-day ",
        isBefore(endOfDay(day), new Date()) && "old-month-day"
      )}
    >
      <div className="day-header">
        {showWeekName && (
          <div className="week-name">
            {formatDate(day, { weekday: "short" })}
          </div>
        )}
        <div className="day-number">{formatDate(day, { day: "numeric" })}</div>
        <button
          className="add-event-btn"
          onClick={() => setIsOpenEventFormModal(true)}
        >
          +
        </button>
      </div>
      <EventFormModal
        onSubmit={addEvent}
        isOpen={isOpenEventFormModal}
        onClose={() => setIsOpenEventFormModal(false)}
        date={day}
      />
      {sortedEvents.length > 0 && (
        <OverflowContainer
          className="events"
          items={sortedEvents}
          getKey={(event) => event.id}
          renderItem={(event) => <CalendarEvent key={event.id} event={event} />}
          renderOverflow={(amount) => (
            <>
              <button
                className="events-view-more-btn"
                onClick={() => setIsViewMoreEventModalOpen(true)}
              >
                +{amount} More
              </button>
              <ViewMoreEventModal
                events={sortedEvents}
                isOpen={isViewMoreEventModalOpen}
                onClose={() => setIsViewMoreEventModalOpen(false)}
              />
            </>
          )}
        />
      )}
    </div>
  );
};

type CalendarEventProps = {
  event: Event;
};

const CalendarEvent = ({ event }: CalendarEventProps) => {
  const { updateEvent, deleteEvent } = useEvents();
  const [isOpenEditEventFormModal, setIsOpenEditEventFormModal] =
    useState(false);

  return (
    <>
      <button
        key={event.id}
        className={cc("event", event.color, event.allDay && "all-day-event")}
        onClick={() => setIsOpenEditEventFormModal(true)}
      >
        {event.allDay ? (
          <div className="event-name">{event.name}</div>
        ) : (
          <>
            <div className={cc("color-dot", event.color)}></div>
            <div className="event-time">
              {formatDate(parse(event?.startTime, "HH:mm", event.date), {
                timeStyle: "short",
              })}
            </div>
            <div className="event-name">{event.name}</div>
          </>
        )}
      </button>
      <EventFormModal
        onSubmit={(e) => updateEvent(event.id, e)}
        onDelete={() => deleteEvent(event.id)}
        event={event}
        isOpen={isOpenEditEventFormModal}
        onClose={() => setIsOpenEditEventFormModal(false)}
      />
    </>
  );
};

type ViewMoreEventModalProps = {
  events: Event[];
} & Omit<ModalProps, "children">;

const ViewMoreEventModal = ({
  events,
  ...modalProps
}: ViewMoreEventModalProps) => {
  if (events.length === 0) return null;

  return (
    <Modal {...modalProps}>
      <div className="modal-title">
        <small>{formatDate(events[0].date, { dateStyle: "short" })}</small>
        <button className="close-btn" onClick={modalProps.onClose}>
          &times;
        </button>
      </div>
      <div className="events">
        {events.map((event) => (
          <CalendarEvent event={event} key={event.id} />
        ))}
      </div>
    </Modal>
  );
};

type EventFormModalProps = {
  onSubmit: (event: UnionOmit<Event, "id">) => void;
} & (
  | { onDelete: () => void; event: Event; date?: never }
  | { onDelete?: never; event?: never; date: Date }
) &
  Omit<ModalProps, "children">;

const EventFormModal = ({
  onSubmit,
  onDelete,
  event,
  date,
  ...modalProps
}: EventFormModalProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const [isAllDay, setIsAllDay] = useState(event?.allDay || false);
  const [startTime, setStartTime] = useState(event?.startTime || "");
  const [selectedColor, setSelectedColor] = useState<
    (typeof EVENT_COLORS)[number]
  >(EVENT_COLORS[0] || event?.color);
  const isNewEvent = event == null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const endTime = endTimeRef.current?.value;

    if (name === "" || name == null) return;

    const commonProps = {
      name,
      color: selectedColor,
      date: date || event.date,
    };

    let newEvent: UnionOmit<Event, "id">;
    if (isAllDay) {
      newEvent = {
        ...commonProps,
        allDay: true,
      };
    } else {
      if (startTime === "" || endTime === "" || endTime == null) return;
      newEvent = {
        ...commonProps,
        allDay: false,
        startTime,
        endTime,
      };
    }

    modalProps.onClose();
    onSubmit(newEvent);
  };

  return (
    <Modal {...modalProps}>
      <div className="modal-title">
        <div>{isNewEvent ? "Add" : "Edit"} Event</div>
        <small>{formatDate(date || event.date, { dateStyle: "short" })}</small>
        <button className="close-btn" onClick={modalProps.onClose}>
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            ref={nameRef}
            defaultValue={event?.name}
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div className="form-group checkbox">
          <input
            type="checkbox"
            name="all-day"
            id="all-day"
            checked={isAllDay}
            onChange={(e) => setIsAllDay(e.target.checked)}
          />
          <label htmlFor="all-day">All Day?</label>
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor="start-time">Start Time</label>
            <input
              type="time"
              required={!isAllDay}
              disabled={isAllDay}
              name="start-time"
              id="start-time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end-time">End Time</label>
            <input
              ref={endTimeRef}
              required={!isAllDay}
              disabled={isAllDay}
              defaultValue={event?.endTime}
              type="time"
              name="end-time"
              id="end-time"
              min={startTime}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Color</label>
          <div className="row left">
            {EVENT_COLORS.map((color) => (
              <Fragment key={color}>
                <input
                  type="radio"
                  name="color"
                  value={selectedColor}
                  onChange={() => setSelectedColor(color)}
                  id={color}
                  checked={selectedColor === color}
                  className="color-radio"
                />
                <label htmlFor={color}>
                  <span className="sr-only">{color}</span>
                </label>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="row">
          <button className="btn btn-success" type="submit">
            {isNewEvent ? "Add" : "Update"}
          </button>
          {onDelete != null && (
            <button className="btn btn-delete" type="button" onClick={onDelete}>
              Delete
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default Calendar;
