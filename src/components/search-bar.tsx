type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Buscar por titulo..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="searchInput"
    />
  );
}
