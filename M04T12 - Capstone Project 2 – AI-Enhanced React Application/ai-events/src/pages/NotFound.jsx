import {Link} from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="narrow">
      <h1>Page not found</h1>
      <p>That page or event doesn't exist.</p>
      <Link to="/dashboard" className="btn">Go to dashboard</Link>
    </section>
  );
}
