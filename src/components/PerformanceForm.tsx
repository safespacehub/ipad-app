import { useState } from 'react';
import type { PerformanceData } from '../types/flight';

interface PerformanceFormProps {
  performance?: PerformanceData;
  onChange: (performance: PerformanceData) => void;
}

export default function PerformanceForm({ performance, onChange }: PerformanceFormProps) {
  const [isExpanded, setIsExpanded] = useState(!!performance);
  const [data, setData] = useState<PerformanceData>(performance || {});

  const handleChange = (field: keyof PerformanceData, value: string) => {
    const numValue = value === '' ? undefined : parseFloat(value);
    const newData = { ...data, [field]: numValue };
    setData(newData);
    onChange(newData);
  };

  if (!isExpanded) {
    return (
      <button
        type="button"
        className="performance-toggle"
        onClick={() => setIsExpanded(true)}
      >
        + Add Performance Data (Optional)
      </button>
    );
  }

  return (
    <div className="performance-form">
      <div className="performance-header">
        <h3>Performance Data (Optional)</h3>
        <button
          type="button"
          className="performance-close"
          onClick={() => {
            setIsExpanded(false);
            setData({});
            onChange({});
          }}
          aria-label="Close performance data"
        >
          ×
        </button>
      </div>
      
      <div className="performance-grid">
        <div className="form-group">
          <label htmlFor="outsideAirTemp">Outside Air Temp (°F)</label>
          <input
            id="outsideAirTemp"
            type="number"
            inputMode="decimal"
            value={data.outsideAirTemp ?? ''}
            onChange={(e) => handleChange('outsideAirTemp', e.target.value)}
            placeholder="e.g., 72"
          />
        </div>

        <div className="form-group">
          <label htmlFor="ias">IAS (knots)</label>
          <input
            id="ias"
            type="number"
            inputMode="decimal"
            value={data.ias ?? ''}
            onChange={(e) => handleChange('ias', e.target.value)}
            placeholder="e.g., 120"
          />
        </div>

        <div className="form-group">
          <label htmlFor="altitude">Altitude (ft)</label>
          <input
            id="altitude"
            type="number"
            inputMode="numeric"
            value={data.altitude ?? ''}
            onChange={(e) => handleChange('altitude', e.target.value)}
            placeholder="e.g., 5000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="torque">Torque (ft-lbs)</label>
          <input
            id="torque"
            type="number"
            inputMode="decimal"
            value={data.torque ?? ''}
            onChange={(e) => handleChange('torque', e.target.value)}
            placeholder="e.g., 850"
          />
        </div>

        <div className="form-group">
          <label htmlFor="npPercentage">Np Percentage (%)</label>
          <input
            id="npPercentage"
            type="number"
            inputMode="decimal"
            min="0"
            max="100"
            value={data.npPercentage ?? ''}
            onChange={(e) => handleChange('npPercentage', e.target.value)}
            placeholder="e.g., 95"
          />
        </div>

        <div className="form-group">
          <label htmlFor="itt">ITT (°C)</label>
          <input
            id="itt"
            type="number"
            inputMode="decimal"
            value={data.itt ?? ''}
            onChange={(e) => handleChange('itt', e.target.value)}
            placeholder="e.g., 650"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fuelFlow">Fuel Flow (lbs/hr)</label>
          <input
            id="fuelFlow"
            type="number"
            inputMode="decimal"
            value={data.fuelFlow ?? ''}
            onChange={(e) => handleChange('fuelFlow', e.target.value)}
            placeholder="e.g., 45"
          />
        </div>
      </div>
    </div>
  );
}

