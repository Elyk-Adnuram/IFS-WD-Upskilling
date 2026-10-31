import {useMemo} from 'react';
import {Link} from 'react-router-dom';
import EventCard from '../components/EventCard.jsx';
import {useAuth} from '../context/AuthContext.jsx';
import {useEvents} from '../context/EventContext.jsx';

const startsAt = (event) => new Date(`${event.date}T${event.time}`);

export default function Dashboard() {
  const {user} = useAuth();
  const {events, deleteEvent} = useEvents();

  const {upcoming, past} = useMemo(() => {
    const now = new Date();
    const sorted = [...events].sort((a, b) => startsAt(a) - startsAt(b));
    return {
      upcoming: sorted.filter((event) => startsAt(event) >= now),
      past: sorted.filter((event) => startsAt(event) < now).reverse(),
    };
  }, [events]);

  const handleDelete = (event) => {
    if (window.confirm(`Delete "${event.name}"? This can't be undone.`)) {
      deleteEvent(event.id);
    }
  };

  return (
    <section>
      <div className="page-head">
        <div>
          <h1>Hello, {user.name.split(' ')[0]}</h1>
          <p className="muted">
            {upcoming.length === 0 ? 'Nothing coming up.' :
              `${upcoming.length} upcoming event${upcoming.length > 1 ? 's' : ''}.`}
          </p>
        </div>
        <Link to="/events/new" className="btn">Add event</Link>
      </div>

      <h2>Upcoming</h2>
      {upcoming.length === 0 ? (
        <div className="card empty">
          <p>You have no upcoming events.</p>
          <Link to="/events/new" className="btn">Plan your first event</Link>
        </div>
      ) : (
        <ul className="event-list">
          {upcoming.map((event) => (
            <EventCard key={event.id} event={event} onDelete={handleDelete} />
          ))}
        </ul>
      )}

      {past.length > 0 && (
        <>
          <h2>Past</h2>
          <ul className="event-list event-list--past">
            {past.map((event) => (
              <EventCard key={event.id} event={event} onDelete={handleDelete} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
