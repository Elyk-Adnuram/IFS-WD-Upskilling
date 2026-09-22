export default function MessageItem({ question, answer }) {
  return (
    <div className="message-pair">
      <div className="user-question">
        <strong>You:</strong> {question}
      </div>
      <div className="ai-response">
        <strong>AI:</strong> {answer}
      </div>
    </div>
  );
}
