const TOPICS = [
  ['How to register an account', [
    'Choose Register in the header.',
    'Enter your name, email, username and a password of at least 8 characters with a letter and a number.',
    'Select Create account.',
  ]],
  ['How to log in', [
    'Choose Log in and enter your username and password.',
    'After logging in you land on your dashboard, which lists upcoming events.',
  ]],
  ['How to create events', [
    'Select Add Event in the header.',
    'Fill in the name, date, time and location. A description is optional.',
    'Select Add event. It appears on your dashboard immediately.',
  ]],
  ['How to edit events', [
    'On the dashboard, select Edit on the event.',
    'Change any detail, then select Save changes.',
  ]],
  ['How to delete events', [
    'On the dashboard, select Delete on the event.',
    'Confirm the prompt. Deleted events cannot be restored.',
  ]],
  ['How to use the AI assistant', [
    'In the event form, enter an event name (more details give better results).',
    'Select Generate description or Suggest preparation tasks and wait for the draft.',
    'Edit the draft if needed, then select Add to description, or Discard it.',
    'If generation fails, select Try again or write the text yourself.',
  ]],
  ['How to review AI-generated content', [
    'AI can be wrong, vague or out of date. Check dates, names, places and facts.',
    'Edit anything that does not fit your event before saving.',
    'Events with AI text carry an AI label so you can tell later.',
  ]],
  ['Tips for organizing events', [
    'Use specific names, such as "Quarterly review with design team".',
    'Put the address or meeting link in Location.',
    'Use the description for agenda items and what to bring.',
    'Review your dashboard weekly and delete events you no longer need.',
  ]],
];

export default function Help() {
  return (
    <section className="narrow">
      <h1>Help center</h1>
      {TOPICS.map(([title, steps]) => (
        <article className="card help-topic" key={title}>
          <h2>{title}</h2>
          <ul>
            {steps.map((step) => <li key={step}>{step}</li>)}
          </ul>
        </article>
      ))}
    </section>
  );
}
