import React, { useState } from 'react';

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
    const [takt, setTakt] = useState([]);
    const [sensors, setSensors] = useState([]);
    const [mechanisms, setMechanisms] = useState([]);
    const [action, setAction] = useState('');
    const [sensorInput, setSensorInput] = useState('');
    const [mechanismInput, setMechanismInput] = useState('');
    const [sensorStates, setSensorStates] = useState({});
    const [mechanismStates, setMechanismStates] = useState({});

    const handleAddTakt = () => {
        const newTakt = { id: takt.length + 1, action };
        setTakt([...takt, newTakt]);
        setAction(''); // Clear the input field after adding
    };

    const handleAddSensor = () => {
        const newSensor = sensorInput.trim();
        if (newSensor && !sensors.includes(newSensor)) {
            setSensors([...sensors, newSensor]);
        }
        setSensorInput(''); // Clear the input field after adding
    };

    const handleAddMechanism = () => {
        const newMechanism = mechanismInput.trim();
        if (newMechanism && !mechanisms.includes(newMechanism)) {
            setMechanisms([...mechanisms, newMechanism]);
        }
        setMechanismInput(''); // Clear the input field after adding
    };

    // Handler to update sensor state for a takt
    const updateSensorState = (taktId, sensorName, value) => {
        setSensorStates((prev) => ({
            ...prev,
            [taktId]: {
                ...prev[taktId],
                [sensorName]: value,
            },
        }));
    };

    // Handler to update mechanism state for a takt
    const updateMechanismState = (taktId, mechanismName, value) => {
        setMechanismStates((prev) => ({
            ...prev,
            [taktId]: {
                ...prev[taktId],
                [mechanismName]: value,
            },
        }));
    };

    return (
        <div>
            <div>
                <input
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
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
                        {/* Empty cells for takt and action columns */}
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
                            <td style={styles.td}>{t.action}</td>
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
