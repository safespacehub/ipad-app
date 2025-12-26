import { useState } from 'react';
import type { WorkDay } from '../types/flight';

interface WorkDayListProps {
  workDays: WorkDay[];
  onSelectWorkDay: (workDay: WorkDay) => void;
  onCreateWorkDay: (date: string) => void;
  onDeleteWorkDay: (id: string) => void;
  calculateTotals: (workDay: WorkDay) => {
    totalFuel: number;
    totalPayloadWeight: number;
    legCount: number;
  };
}

export default function WorkDayList({
  workDays,
  onSelectWorkDay,
  onCreateWorkDay,
  onDeleteWorkDay,
  calculateTotals,
}: WorkDayListProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const handleCreateWorkDay = () => {
    if (selectedDate) {
      onCreateWorkDay(selectedDate);
      setShowDatePicker(false);
      setSelectedDate(new Date().toISOString().split('T')[0]);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDateHeader = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return formatDate(dateString);
    }
  };

  return (
    <div className="work-day-list">
      <header className="app-header">
        <h1>Flight Log</h1>
        <p className="app-subtitle">Track your flight data</p>
      </header>

      <div className="list-actions">
        {!showDatePicker ? (
          <button
            onClick={() => setShowDatePicker(true)}
            className="new-work-day-button"
          >
            + New Work Day
          </button>
        ) : (
          <div className="date-picker-container">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-input"
              max={new Date().toISOString().split('T')[0]}
            />
            <button onClick={handleCreateWorkDay} className="create-button">
              Create
            </button>
            <button
              onClick={() => setShowDatePicker(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {workDays.length === 0 ? (
        <div className="empty-state">
          <p>No work days yet. Create your first work day to start logging flights.</p>
        </div>
      ) : (
        <div className="work-days-grid">
          {workDays.map((workDay) => {
            const totals = calculateTotals(workDay);
            return (
              <div
                key={workDay.id}
                className="work-day-card"
                onClick={() => onSelectWorkDay(workDay)}
              >
                <div className="work-day-card-header">
                  <h2>{formatDateHeader(workDay.date)}</h2>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        confirm(
                          'Are you sure you want to delete this work day and all its legs?'
                        )
                      ) {
                        onDeleteWorkDay(workDay.id);
                      }
                    }}
                    className="delete-work-day-button"
                    aria-label="Delete work day"
                  >
                    ×
                  </button>
                </div>
                <div className="work-day-card-summary">
                  <div className="summary-item">
                    <span className="summary-label">Legs:</span>
                    <span className="summary-value">{totals.legCount}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Fuel:</span>
                    <span className="summary-value">
                      {totals.totalFuel.toLocaleString()} lbs
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Payload:</span>
                    <span className="summary-value">
                      {totals.totalPayloadWeight.toLocaleString()} lbs
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

