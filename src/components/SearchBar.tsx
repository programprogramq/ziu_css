interface Props {
  value: string;

  onChange: (value: string) => void;
}

export function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <input
      type="text"
      placeholder="Szukaj filmu..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="search-input"
    />
  );
}