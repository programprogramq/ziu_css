interface Props {
  message: string;
}

export function ErrorBanner({
  message,
}: Props) {
  return (
    <div className="error-banner">
      <h2>Błąd</h2>

      <p>{message}</p>
    </div>
  );
}