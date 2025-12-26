import { useState } from 'react';
import type { FlightLeg, PerformanceData } from '../types/flight';
import PerformanceForm from './PerformanceForm';

interface FlightLegFormProps {
  leg?: FlightLeg;
  onSave: (leg: Omit<FlightLeg, 'id'>) => void;
  onCancel: () => void;
}

export default function FlightLegForm({ leg, onSave, onCancel }: FlightLegFormProps) {
  const [origin, setOrigin] = useState(leg?.origin || '');
  const [destination, setDestination] = useState(leg?.destination || '');
  const [fuel, setFuel] = useState(leg?.fuel.toString() || '');
  const [payloadWeight, setPayloadWeight] = useState(leg?.payloadWeight.toString() || '');
  const [aircraft, setAircraft] = useState(leg?.aircraft || '');
  const [performance, setPerformance] = useState<PerformanceData>(leg?.performance || {});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!origin.trim() || !destination.trim() || !fuel || !payloadWeight || !aircraft.trim()) {
      return;
    }

    onSave({
      origin: origin.trim().toUpperCase(),
      destination: destination.trim().toUpperCase(),
      fuel: parseFloat(fuel),
      payloadWeight: parseFloat(payloadWeight),
      aircraft: aircraft.trim().toUpperCase(),
      performance: Object.keys(performance).length > 0 ? performance : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flight-leg-form">
      <h2>{leg ? 'Edit Leg' : 'Add Flight Leg'}</h2>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="origin">Origin Airport Code *</label>
          <input
            id="origin"
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value.toUpperCase())}
            placeholder="KMHR"
            maxLength={4}
            required
            autoFocus
            pattern="[A-Z0-9]{3,4}"
            title="3-4 character airport code"
          />
        </div>

        <div className="form-group">
          <label htmlFor="destination">Destination Airport Code *</label>
          <input
            id="destination"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value.toUpperCase())}
            placeholder="KEKA"
            maxLength={4}
            required
            pattern="[A-Z0-9]{3,4}"
            title="3-4 character airport code"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="fuel">Fuel (lbs) *</label>
          <input
            id="fuel"
            type="number"
            inputMode="decimal"
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            placeholder="1600"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="payloadWeight">Payload Weight (lbs) *</label>
          <input
            id="payloadWeight"
            type="number"
            inputMode="decimal"
            value={payloadWeight}
            onChange={(e) => setPayloadWeight(e.target.value)}
            placeholder="1800"
            min="0"
            step="0.1"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="aircraft">Aircraft Registration *</label>
        <input
          id="aircraft"
          type="text"
          value={aircraft}
          onChange={(e) => setAircraft(e.target.value.toUpperCase())}
          placeholder="N40NE"
          maxLength={10}
          required
          pattern="N[A-Z0-9]{1,9}"
          title="Aircraft registration (e.g., N40NE)"
        />
      </div>

      <PerformanceForm performance={performance} onChange={setPerformance} />

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="button-cancel">
          Cancel
        </button>
        <button type="submit" className="button-save">
          {leg ? 'Update Leg' : 'Add Leg'}
        </button>
      </div>
    </form>
  );
}

