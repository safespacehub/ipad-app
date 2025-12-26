import { useState } from 'react';
import type { FlightLeg } from '../types/flight';

interface LegCardProps {
  leg: FlightLeg;
  legNumber: number;
  onEdit: () => void;
  onDelete: () => void;
}

export default function LegCard({ leg, legNumber, onEdit, onDelete }: LegCardProps) {
  const [showPerformance, setShowPerformance] = useState(false);
  const hasPerformance = leg.performance && Object.keys(leg.performance).length > 0;

  return (
    <div className="leg-card">
      <div className="leg-header">
        <div className="leg-number">Leg {legNumber}</div>
        <div className="leg-route">
          {leg.origin} → {leg.destination}
        </div>
        <div className="leg-actions">
          <button
            onClick={onEdit}
            className="leg-edit-button"
            aria-label={`Edit leg ${legNumber}`}
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="leg-delete-button"
            aria-label={`Delete leg ${legNumber}`}
          >
            ×
          </button>
        </div>
      </div>

      <div className="leg-details">
        <div className="leg-detail-item">
          <span className="detail-label">Aircraft:</span>
          <span className="detail-value">{leg.aircraft}</span>
        </div>
        <div className="leg-detail-item">
          <span className="detail-label">Fuel:</span>
          <span className="detail-value">{leg.fuel.toLocaleString()} lbs</span>
        </div>
        <div className="leg-detail-item">
          <span className="detail-label">Payload:</span>
          <span className="detail-value">{leg.payloadWeight.toLocaleString()} lbs</span>
        </div>
      </div>

      {hasPerformance && (
        <div className="leg-performance">
          <button
            type="button"
            className="performance-toggle-button"
            onClick={() => setShowPerformance(!showPerformance)}
          >
            {showPerformance ? '−' : '+'} Performance Data
          </button>
          
          {showPerformance && leg.performance && (
            <div className="performance-details">
              {leg.performance.outsideAirTemp !== undefined && (
                <div className="performance-item">
                  <span>Outside Air Temp:</span>
                  <span>{leg.performance.outsideAirTemp}°F</span>
                </div>
              )}
              {leg.performance.ias !== undefined && (
                <div className="performance-item">
                  <span>IAS:</span>
                  <span>{leg.performance.ias} knots</span>
                </div>
              )}
              {leg.performance.altitude !== undefined && (
                <div className="performance-item">
                  <span>Altitude:</span>
                  <span>{leg.performance.altitude.toLocaleString()} ft</span>
                </div>
              )}
              {leg.performance.torque !== undefined && (
                <div className="performance-item">
                  <span>Torque:</span>
                  <span>{leg.performance.torque} ft-lbs</span>
                </div>
              )}
              {leg.performance.npPercentage !== undefined && (
                <div className="performance-item">
                  <span>Np:</span>
                  <span>{leg.performance.npPercentage}%</span>
                </div>
              )}
              {leg.performance.itt !== undefined && (
                <div className="performance-item">
                  <span>ITT:</span>
                  <span>{leg.performance.itt}°C</span>
                </div>
              )}
              {leg.performance.fuelFlow !== undefined && (
                <div className="performance-item">
                  <span>Fuel Flow:</span>
                  <span>{leg.performance.fuelFlow} lbs/hr</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

