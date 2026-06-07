const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

function FilterTabs({ filter, onChange, remainingCount }) {
  const countLabel = `${remainingCount} ${
    remainingCount === 1 ? 'task' : 'tasks'
  } remaining`

  return (
    <div className="filter-tabs">
      <div className="filter-tabs__buttons" role="tablist" aria-label="Filter tasks">
        {FILTERS.map((item) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={filter === item.value}
            className={
              filter === item.value
                ? 'filter-tabs__button filter-tabs__button--active'
                : 'filter-tabs__button'
            }
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <span className="filter-tabs__count">{countLabel}</span>
    </div>
  )
}

export default FilterTabs
