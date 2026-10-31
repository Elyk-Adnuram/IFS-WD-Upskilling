import {Link} from 'react-router-dom';

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  });
}

export default function EventCard({event, onDelete}) {
  return (
    <li className="card event">
      <div className="event__when">
        <strong>{formatDate(event.date)}</strong>
        <span>{event.time}</span>
      </div>
      <div className="event__body">
        <h3>
          {event.name}{' '}
          {event.aiAssisted &&
            <span className="badge badge--ai">AI-assisted</span>}
        </h3>
        <p className="muted">{event.location}</p>
        {event.description &&
          <p className="event__desc">{event.description}</p>}
      </div>
      <div className="event__actions">
        <Link className="btn btn--small" to={`/events/${event.id}/edit`}>
          Edit
        </Link>
        <button type="button" className="btn btn--small btn--danger"
          onClick={() => onDelete(event)}>
          Delete
        </button>
      </div>
    </li>
  );
}
