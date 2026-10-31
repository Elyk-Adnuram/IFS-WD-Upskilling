const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validates registration values; returns an object of field errors. */
export function validateRegistration({name, email, username, password}) {
  const errors = {};
  if (!name.trim()) errors.name = 'Enter your name.';
  if (!email.trim()) {
    errors.email = 'Enter your email address.';
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'Enter a valid email, like name@example.com.';
  }
  if (!username.trim()) {
    errors.username = 'Choose a username.';
  } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(username.trim())) {
    errors.username = 'Use 3-20 letters, numbers or underscores.';
  }
  if (!password) {
    errors.password = 'Create a password.';
  } else if (password.length < 8 || !/[a-zA-Z]/.test(password) ||
             !/\d/.test(password)) {
    errors.password = 'Use at least 8 characters with a letter and a number.';
  }
  return errors;
}

/** Validates login values. */
export function validateLogin({username, password}) {
  const errors = {};
  if (!username.trim()) errors.username = 'Enter your username.';
  if (!password) errors.password = 'Enter your password.';
  return errors;
}

/** Validates event form values. */
export function validateEvent({name, date, time, location}) {
  const errors = {};
  if (!name.trim()) errors.name = 'Enter an event name.';
  if (!date) errors.date = 'Choose a date.';
  if (!time) errors.time = 'Choose a time.';
  if (!location.trim()) errors.location = 'Enter a location.';
  return errors;
}
