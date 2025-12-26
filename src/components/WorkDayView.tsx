import { useState } from 'react';
import type { WorkDay, FlightLeg } from '../types/flight';
import LegCard from './LegCard';
import FlightLegForm from './FlightLegForm';

interface WorkDayViewProps {
  workDay: WorkDay;
  dailyTotals: {
    totalFuel: number;
    totalPayloadWeight: number;
    legCount: number;
  };
  onAddLeg: (leg: Omit<FlightLeg, 'id'>) => void;
  onUpdateLeg: (legId: string, updates: Partial<FlightLeg>) => void;
  onDeleteLeg: (legId: string) => void;
  onBack: () => void;
}

export default function WorkDayView({
  workDay,
  dailyTotals,
  onAddLeg,
  onUpdateLeg,
  onDeleteLeg,
  onBack,
}: WorkDayViewProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLegId, setEditingLegId] = useState<string | null>(null);

  const editingLeg = editingLegId
    ? workDay.legs.find((leg) => leg.id === editingLegId)
    : undefined;

  const handleSaveLeg = (leg: Omit<FlightLeg, 'id'>) => {
    if (editingLegId) {
      onUpdateLeg(editingLegId, leg);
      setEditingLegId(null);
    } else {
      onAddLeg(leg);
      setShowAddForm(false);
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingLegId(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="work-day-view">
      <div className="work-day-header">
        <button onClick={onBack} className="back-button" aria-label="Back to work days">
          ← Back
        </button>
        <h1>{formatDate(workDay.date)}</h1>
      </div>

      <div className="daily-totals-card">
        <h2>Daily Totals</h2>
        <div className="totals-grid">
          <div className="total-item">
            <span className="total-label">Total Fuel</span>
            <span className="total-value">{dailyTotals.totalFuel.toLocaleString()} lbs</span>
          </div>
          <div className="total-item">
            <span className="total-label">Total Payload</span>
            <span className="total-value">{dailyTotals.totalPayloadWeight.toLocaleString()} lbs</span>
          </div>
          <div className="total-item">
            <span className="total-label">Legs</span>
            <span className="total-value">{dailyTotals.legCount}</span>
          </div>
        </div>
      </div>

      {showAddForm || editingLeg ? (
        <div className="leg-form-container">
          <FlightLegForm
            leg={editingLeg}
            onSave={handleSaveLeg}
            onCancel={handleCancel}
          />
        </div>
      ) : (
        <>
          <div className="legs-header">
            <h2>Flight Legs</h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="add-leg-button"
            >
              + Add Leg
            </button>
          </div>

          {workDay.legs.length === 0 ? (
            <div className="empty-legs">
              <p>No legs added yet. Add your first leg to get started.</p>
            </div>
          ) : (
            <div className="legs-list">
              {workDay.legs.map((leg, index) => (
                <LegCard
                  key={leg.id}
                  leg={leg}
                  legNumber={index + 1}
                  onEdit={() => setEditingLegId(leg.id)}
                  onDelete={() => onDeleteLeg(leg.id)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

