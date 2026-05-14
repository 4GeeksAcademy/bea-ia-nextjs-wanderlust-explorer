type FilterBarProps = {
  categories: readonly string[];
  destinations: string[];
  selectedCategory: string;
  destination: string;
  onCategoryChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
};

export function FilterBar({
  categories,
  destinations,
  selectedCategory,
  destination,
  onCategoryChange,
  onDestinationChange,
}: FilterBarProps) {
  return (
    <>
      <select
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="selectInput"
      >
        <option value="">Todas las categorias</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={destination}
        onChange={(event) => onDestinationChange(event.target.value)}
        className="searchInput"
        placeholder="Destino (ej: Croatia, Kyoto, Lisbon...)"
        list="destination-options"
      />
      <datalist id="destination-options">
        {destinations.map((item) => (
          <option key={item} value={item} />
        ))}
      </datalist>
    </>
  );
}
