import MessageItem from "./MessageItem";

export default function ChatHistory({ history }) {
  return (
    <div className="history-container">
      <h2>Conversation History</h2>
      {history.map((item, index) => (
        <MessageItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}
