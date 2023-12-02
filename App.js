import React, { useState } from 'react';
import useStore from './store';

function App() {
    const styles = {
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            marginTop: '20px',
        },
        th: {
            border: '1px solid #ddd',
            padding: '8px',
            background: '#f2f2f2',
        },
        td: {
            border: '1px solid #ddd',
            padding: '8px',
        },
        input: {
            margin: '0 8px 8px 0',
            padding: '8px',
        },
        button: {
            padding: '8px',
            margin: '0 8px 8px 0',
            cursor: 'pointer',
        },
        headerCell: {
            background: '#4CAF50',
            color: 'white',
            padding: '8px',
        },
        headerCellSecond: {
            background: 'white',
            color: 'black',
            padding: '8px',
        },
    };

    const {
        takt,
        sensors,
        mechanisms,
        sensorStates,
        mechanismStates,
        addTakt,
        addSensor,
        addMechanism,
        updateSensorState,
        updateMechanismState,
        reset,
    } = useStore();

    const [actionInput, setActionInput] = useState('');
    const [sensorInput, setSensorInput] = useState('');
    const [mechanismInput, setMechanismInput] = useState('');

    // Function to handle adding a new takt and actionInput
    const handleAddTakt = () => {
        if (actionInput.trim()) {
            addTakt({ id: takt.length + 1, actionInput: actionInput });
            setActionInput(''); // Clear the actionInput input field after adding
        }
    };

    // Function to handle adding a new sensor
    const handleAddSensor = () => {
        if (sensorInput.trim() && !sensors.includes(sensorInput)) {
            addSensor(sensorInput);
            setSensorInput(''); // Clear the sensor input field
        }
    };

    // Function to handle adding a new mechanism
    const handleAddMechanism = () => {
        if (mechanismInput.trim() && !mechanisms.includes(mechanismInput)) {
            addMechanism(mechanismInput);
            setMechanismInput(''); // Clear the mechanism input field
        }
    };

    // Function to reset all states
    const handleReset = () => {
        reset(); // This will reset all states in the zustand store
    };

    const handleExportToJson = () => {
        const data = {
            takt,
            sensors,
            mechanisms,
            sensorStates,
            mechanismStates,
        };
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = 'table_data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = JSON.parse(e.target.result);
                reset(); // Reset current state before importing new data

                // Directly set the state to the imported data
                useStore.setState({
                    takt: data.takt,
                    sensors: data.sensors,
                    mechanisms: data.mechanisms,
                    sensorStates: data.sensorStates,
                    mechanismStates: data.mechanismStates,
                });
            };
            reader.readAsText(file);
        }
    };

    return (
        <div>
            <div>
                <input type="file" onChange={handleFileSelect} />
            </div>
            <div>
                <button onClick={handleExportToJson}>Export to JSON</button>
            </div>
            <div>
                {/* ... (the rest of your inputs and table) */}
                <button onClick={handleReset}>Reset Table</button>
            </div>
            <div>
                <input
                    value={actionInput}
                    onChange={(e) => setActionInput(e.target.value)}
                    placeholder="Назва Дії"
                />
                <button onClick={handleAddTakt}>Добавить Такт и Дію</button>
            </div>
            <div>
                <input
                    value={sensorInput}
                    onChange={(e) => setSensorInput(e.target.value)}
                    placeholder="Стан Датчиків"
                />
                <button onClick={handleAddSensor}>
                    Добавить Стан Датчиків
                </button>
            </div>
            <div>
                <input
                    value={mechanismInput}
                    onChange={(e) => setMechanismInput(e.target.value)}
                    placeholder="Стан Механізмів"
                />
                <button onClick={handleAddMechanism}>
                    Добавить Стан Механізмів
                </button>
            </div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.headerCell}>Такт (кроки)</th>
                        <th style={styles.headerCellSecond}>
                            Дії контрольні операції
                        </th>
                        <th style={styles.headerCell} colSpan={sensors.length}>
                            Стан датчиків
                        </th>
                        <th
                            style={styles.headerCellSecond}
                            colSpan={mechanisms.length}
                        >
                            Стан механізмів
                        </th>
                    </tr>
                    <tr>
                        {/* Empty cells for takt and actionInput columns */}
                        <th style={styles.th}></th>
                        <th style={styles.th}></th>
                        {sensors.map((sensor, index) => (
                            <th style={styles.th} key={index}>
                                {sensor}
                            </th>
                        ))}
                        {mechanisms.map((mechanism, index) => (
                            <th style={styles.th} key={index}>
                                {mechanism}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {takt.map((t, index) => (
                        <tr key={t.id}>
                            <td style={styles.td}>{t.id}</td>
                            <td style={styles.td}>{t.actionInput}</td>
                            {sensors.map((sensor, sensorIndex) => (
                                <td style={styles.td} key={sensorIndex}>
                                    <select
                                        value={
                                            sensorStates[t.id]?.[sensor] || ''
                                        }
                                        onChange={(e) =>
                                            updateSensorState(
                                                t.id,
                                                sensor,
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">Select</option>
                                        <option value="10">10</option>
                                        <option value="01">01</option>
                                        <option value="00">00</option>
                                        <option value="11">11</option>
                                    </select>
                                </td> // Adjust as necessary
                            ))}
                            {mechanisms.map((mechanism, mechanismIndex) => (
                                <td style={styles.td} key={mechanismIndex}>
                                    <select
                                        value={
                                            mechanismStates[t.id]?.[
                                                mechanism
                                            ] || ''
                                        }
                                        onChange={(e) =>
                                            updateMechanismState(
                                                t.id,
                                                mechanism,
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">Select</option>
                                        <option value="10">10</option>
                                        <option value="01">01</option>
                                        <option value="00">00</option>
                                        <option value="11">11</option>
                                    </select>
                                </td> // Adjust as necessary
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
