import {useNavigate, useParams} from 'react-router-dom';
import EventForm from '../components/EventForm.jsx';
import {useEvents} from '../context/EventContext.jsx';
import NotFound from './NotFound.jsx';

/** Handles both adding a new event and editing an existing one. */
export default function EventEditor() {
  const {eventId} = useParams();
  const navigate = useNavigate();
  const {events, addEvent, updateEvent} = useEvents();
  const existing = eventId ? events.find((event) => event.id === eventId) : null;

  if (eventId && !existing) return <NotFound />;

  const handleSubmit = (details) => {
    if (existing) {
      updateEvent(existing.id, details);
    } else {
      addEvent(details);
    }
    navigate('/dashboard');
  };

  return (
    <section className="narrow">
      <h1>{existing ? 'Edit event' : 'Add event'}</h1>
      <EventForm
        initialEvent={existing}
        submitLabel={existing ? 'Save changes' : 'Add event'}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/dashboard')} />
    </section>
  );
}
