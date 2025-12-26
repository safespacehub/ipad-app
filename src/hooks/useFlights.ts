import { useState, useEffect } from 'react';
import type { WorkDay, FlightLeg } from '../types/flight';

const STORAGE_KEY = 'ipad-flight-app-data';

export function useFlights() {
  const [workDays, setWorkDays] = useState<WorkDay[]>([]);

  // Load work days from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setWorkDays(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load flight data from storage:', error);
      }
    }
  }, []);

  // Save work days to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workDays));
  }, [workDays]);

  const createWorkDay = (date: string): WorkDay => {
    const newWorkDay: WorkDay = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      date,
      legs: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setWorkDays((prev) => [newWorkDay, ...prev]);
    return newWorkDay;
  };

  const getWorkDay = (id: string): WorkDay | undefined => {
    return workDays.find((day) => day.id === id);
  };

  const getWorkDayByDate = (date: string): WorkDay | undefined => {
    return workDays.find((day) => day.date === date);
  };

  const updateWorkDay = (id: string, updates: Partial<WorkDay>) => {
    setWorkDays((prev) =>
      prev.map((day) =>
        day.id === id
          ? { ...day, ...updates, updatedAt: Date.now() }
          : day
      )
    );
  };

  const deleteWorkDay = (id: string) => {
    setWorkDays((prev) => prev.filter((day) => day.id !== id));
  };

  const addLeg = (workDayId: string, leg: Omit<FlightLeg, 'id'>) => {
    const newLeg: FlightLeg = {
      ...leg,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setWorkDays((prev) =>
      prev.map((day) =>
        day.id === workDayId
          ? {
              ...day,
              legs: [...day.legs, newLeg],
              updatedAt: Date.now(),
            }
          : day
      )
    );
  };

  const updateLeg = (workDayId: string, legId: string, updates: Partial<FlightLeg>) => {
    setWorkDays((prev) =>
      prev.map((day) =>
        day.id === workDayId
          ? {
              ...day,
              legs: day.legs.map((leg) =>
                leg.id === legId ? { ...leg, ...updates } : leg
              ),
              updatedAt: Date.now(),
            }
          : day
      )
    );
  };

  const deleteLeg = (workDayId: string, legId: string) => {
    setWorkDays((prev) =>
      prev.map((day) =>
        day.id === workDayId
          ? {
              ...day,
              legs: day.legs.filter((leg) => leg.id !== legId),
              updatedAt: Date.now(),
            }
          : day
      )
    );
  };

  const calculateDailyTotals = (workDay: WorkDay) => {
    return {
      totalFuel: workDay.legs.reduce((sum, leg) => sum + leg.fuel, 0),
      totalPayloadWeight: workDay.legs.reduce((sum, leg) => sum + leg.payloadWeight, 0),
      legCount: workDay.legs.length,
    };
  };

  // Sort work days by date (newest first)
  const sortedWorkDays = [...workDays].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return {
    workDays: sortedWorkDays,
    createWorkDay,
    getWorkDay,
    getWorkDayByDate,
    updateWorkDay,
    deleteWorkDay,
    addLeg,
    updateLeg,
    deleteLeg,
    calculateDailyTotals,
  };
}

