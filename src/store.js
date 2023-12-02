// store.js
import create from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
    persist(
        (set) => ({
            takt: [],
            sensors: [],
            mechanisms: [],
            sensorStates: {},
            mechanismStates: {},
            // Define all actions as methods that use `set`
            addTakt: (newTakt) =>
                set((state) => ({ takt: [...state.takt, newTakt] })),
            addSensor: (newSensor) =>
                set((state) => ({ sensors: [...state.sensors, newSensor] })),
            addMechanism: (newMechanism) =>
                set((state) => ({
                    mechanisms: [...state.mechanisms, newMechanism],
                })),
            updateSensorState: (taktId, sensorName, value) =>
                set((state) => ({
                    sensorStates: {
                        ...state.sensorStates,
                        [taktId]: {
                            ...state.sensorStates[taktId],
                            [sensorName]: value,
                        },
                    },
                })),
            updateMechanismState: (taktId, mechanismName, value) =>
                set((state) => ({
                    mechanismStates: {
                        ...state.mechanismStates,
                        [taktId]: {
                            ...state.mechanismStates[taktId],
                            [mechanismName]: value,
                        },
                    },
                })),
            reset: () =>
                set({
                    takt: [],
                    sensors: [],
                    mechanisms: [],
                    sensorStates: {},
                    mechanismStates: {},
                }),
        }),
        {
            name: 'table-storage', // unique name for the storage (required)
        }
    )
);

export default useStore;
