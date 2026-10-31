import {useState} from 'react';
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext.jsx';
import {validateLogin} from '../utils/validation.js';

export default function Login() {
  const {user, login} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState({username: '', password: ''});
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  if (user) return <Navigate to="/dashboard" replace />;

  const handleChange = (event) => {
    const {name, value} = event.target;
    setValues((current) => ({...current, [name]: value}));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const found = validateLogin(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    try {
      await login(values);
      navigate(location.state?.from?.pathname || '/dashboard', {replace: true});
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  return (
    <section className="auth">
      <h1>Log in</h1>
      {location.state?.registered && (
        <p className="alert alert--ok" role="status">
          Account created. Log in to continue.
        </p>
      )}
      <form onSubmit={handleSubmit} noValidate className="card form">
        <div className="field">
          <label htmlFor="username">Username</label>
          <input id="username" name="username" autoComplete="username"
            value={values.username} onChange={handleChange} />
          {errors.username && <p className="field__error">{errors.username}</p>}
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password"
            autoComplete="current-password"
            value={values.password} onChange={handleChange} />
          {errors.password && <p className="field__error">{errors.password}</p>}
        </div>
        {submitError && <p className="alert alert--error" role="alert">{submitError}</p>}
        <button type="submit" className="btn">Log in</button>
      </form>
      <p>New here? <Link to="/register">Create an account</Link></p>
    </section>
  );
}
