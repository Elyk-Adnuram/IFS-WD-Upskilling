import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext.jsx';
import {validateRegistration} from '../utils/validation.js';

const FIELDS = [
  ['name', 'Name', 'text', 'name'],
  ['email', 'Email', 'email', 'email'],
  ['username', 'Username', 'text', 'username'],
  ['password', 'Password', 'password', 'new-password'],
];

export default function Register() {
  const {register} = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState(
      {name: '', email: '', username: '', password: ''});
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const handleChange = (event) => {
    const {name, value} = event.target;
    setValues((current) => ({...current, [name]: value}));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const found = validateRegistration(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    try {
      await register(values);
      navigate('/login', {state: {registered: true}});
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  return (
    <section className="auth">
      <h1>Create your account</h1>
      <form onSubmit={handleSubmit} noValidate className="card form">
        {FIELDS.map(([id, label, type, autoComplete]) => (
          <div className="field" key={id}>
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id} type={type} autoComplete={autoComplete}
              value={values[id]} onChange={handleChange}
              aria-invalid={Boolean(errors[id])} />
            {errors[id] && <p className="field__error">{errors[id]}</p>}
          </div>
        ))}
        {submitError && <p className="alert alert--error" role="alert">{submitError}</p>}
        <button type="submit" className="btn">Create account</button>
      </form>
      <p>Already registered? <Link to="/login">Log in</Link></p>
    </section>
  );
}
