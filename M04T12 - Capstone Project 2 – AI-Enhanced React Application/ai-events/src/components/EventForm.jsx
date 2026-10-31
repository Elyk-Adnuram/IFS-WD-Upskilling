import {useState} from 'react';
import AIAssistant from './AIAssistant.jsx';
import {validateEvent} from '../utils/validation.js';

const EMPTY_EVENT = {
  name: '', date: '', time: '', location: '', description: '',
  aiAssisted: false,
};

export default function EventForm({
  initialEvent, submitLabel, onSubmit, onCancel,
}) {
  const [values, setValues] = useState({...EMPTY_EVENT, ...initialEvent});
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const {name, value} = event.target;
    setValues((current) => ({...current, [name]: value}));
  };

  // Reviewed AI text: a description replaces, preparation tasks append.
  const applyAiText = (kind, text) => {
    setValues((current) => ({
      ...current,
      description: kind === 'tasks' && current.description.trim() ?
        `${current.description.trim()}\n\nPreparation tasks:\n${text}` :
        text,
      aiAssisted: true,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validateEvent(values);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      onSubmit({
        ...values,
        name: values.name.trim(),
        location: values.location.trim(),
      });
    }
  };

  const renderField = (id, label, type = 'text') => (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} type={type} value={values[id]}
        onChange={handleChange} aria-invalid={Boolean(errors[id])}
        aria-describedby={errors[id] ? `${id}-error` : undefined} />
      {errors[id] &&
        <p className="field__error" id={`${id}-error`}>{errors[id]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="card form">
      {renderField('name', 'Event name')}
      <div className="grid-2">
        {renderField('date', 'Date', 'date')}
        {renderField('time', 'Time', 'time')}
      </div>
      {renderField('location', 'Location')}
      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows={5}
          value={values.description} onChange={handleChange} />
        {values.aiAssisted && (
          <p className="muted">
            <span className="badge badge--ai">AI</span>{' '}
            This description includes AI-generated text.
          </p>
        )}
      </div>
      <AIAssistant details={values} onApply={applyAiText} />
      <div className="row">
        <button type="submit" className="btn">{submitLabel}</button>
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
