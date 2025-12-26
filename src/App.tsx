import { useState } from 'react';
import { useFlights } from './hooks/useFlights';
import WorkDayList from './components/WorkDayList';
import WorkDayView from './components/WorkDayView';
import type { WorkDay } from './types/flight';
import './App.css';

function App() {
  const {
    workDays,
    createWorkDay,
    getWorkDay,
    deleteWorkDay,
    addLeg,
    updateLeg,
    deleteLeg,
    calculateDailyTotals,
  } = useFlights();

  const [selectedWorkDayId, setSelectedWorkDayId] = useState<string | null>(null);

  const selectedWorkDay = selectedWorkDayId
    ? getWorkDay(selectedWorkDayId)
    : null;

  const handleSelectWorkDay = (workDay: WorkDay) => {
    setSelectedWorkDayId(workDay.id);
  };

  const handleCreateWorkDay = (date: string) => {
    const workDay = createWorkDay(date);
    setSelectedWorkDayId(workDay.id);
  };

  const handleBack = () => {
    setSelectedWorkDayId(null);
  };

  if (selectedWorkDay) {
    const totals = calculateDailyTotals(selectedWorkDay);
    return (
      <div className="app">
        <WorkDayView
          workDay={selectedWorkDay}
          dailyTotals={totals}
          onAddLeg={(leg) => addLeg(selectedWorkDay.id, leg)}
          onUpdateLeg={(legId, updates) => updateLeg(selectedWorkDay.id, legId, updates)}
          onDeleteLeg={(legId) => deleteLeg(selectedWorkDay.id, legId)}
          onBack={handleBack}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <WorkDayList
        workDays={workDays}
        onSelectWorkDay={handleSelectWorkDay}
        onCreateWorkDay={handleCreateWorkDay}
        onDeleteWorkDay={deleteWorkDay}
        calculateTotals={calculateDailyTotals}
      />
    </div>
  );
}

export default App;
