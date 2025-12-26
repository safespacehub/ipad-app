import type { FilterType } from '../types/todo';

interface TodoFiltersProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export default function TodoFilters({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: TodoFiltersProps) {
  return (
    <div className="todo-filters">
      <div className="todo-count">
        <span>{activeCount} {activeCount === 1 ? 'item' : 'items'} left</span>
      </div>
      
      <div className="todo-filter-buttons">
        <button
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
          aria-label="Show all todos"
          aria-pressed={filter === 'all'}
        >
          All
        </button>
        <button
          className={`filter-button ${filter === 'active' ? 'active' : ''}`}
          onClick={() => onFilterChange('active')}
          aria-label="Show active todos"
          aria-pressed={filter === 'active'}
        >
          Active
        </button>
        <button
          className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => onFilterChange('completed')}
          aria-label="Show completed todos"
          aria-pressed={filter === 'completed'}
        >
          Completed
        </button>
      </div>
      
      {completedCount > 0 && (
        <button
          className="clear-completed-button"
          onClick={onClearCompleted}
          aria-label={`Clear ${completedCount} completed ${completedCount === 1 ? 'todo' : 'todos'}`}
        >
          Clear completed
        </button>
      )}
    </div>
  );
}

