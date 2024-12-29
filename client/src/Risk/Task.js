import React, { useRef, useState } from 'react';

const Task = () => {
    const [results, setResults] = useState({
        boxVolume: '0.00',
        packetVolume: '0.00',
        totalPackets: '0.00',
        totalWeights: '0.00',
    });

    const length = useRef();
    const height = useRef();
    const width = useRef();

    const plength = useRef();
    const pheight = useRef();
    const pwidth = useRef();
    const weight = useRef();

    const calculate = () => {
        // Parse input values to numbers
        const boxVolume = parseFloat(length.current.value) * parseFloat(height.current.value) * parseFloat(width.current.value);
        console.log('Box Volume:', boxVolume);

        const packetVolume =
            parseFloat(plength.current.value) * parseFloat(pheight.current.value) * parseFloat(pwidth.current.value);
        console.log('Packet Volume:', packetVolume);

        const totalPackets = boxVolume / packetVolume;
        console.log('Total Packets:', totalPackets);

        const totalWeights = totalPackets * parseFloat(weight.current.value);
        console.log('Total Weight in grams:', totalWeights / 1000);

        setResults({
            boxVolume: boxVolume.toFixed(3),
            packetVolume: packetVolume.toFixed(3),
            totalPackets: totalPackets.toFixed(3),
            totalWeights: (totalWeights / 1000).toFixed(3),
        });
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold">Box And Packets Task</h1>
            </div>
            <div className="max-w-md mx-auto">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Enter Box Dimension</h2>
                    <input className="w-full mb-2 p-2 border border-gray-300" type="text" ref={length} placeholder="Length" />
                    <input className="w-full mb-2 p-2 border border-gray-300" type="text" ref={height} placeholder="Height" />
                    <input className="w-full mb-2 p-2 border border-gray-300" type="text" ref={width} placeholder="Width" />
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Enter Packets Dimension</h2>
                    <input className="w-full mb-2 p-2 border border-gray-300" type="text" ref={plength} placeholder="Length" />
                    <input className="w-full mb-2 p-2 border border-gray-300" type="text" ref={pheight} placeholder="Height" />
                    <input className="w-full mb-2 p-2 border border-gray-300" type="text" ref={pwidth} placeholder="Width" />
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Packet Weight</h2>
                    <input className="w-full mb-2 p-2 border border-gray-300" type="text" ref={weight} placeholder="Weight" />
                </div>
                <button
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={() => calculate()}
                >
                    Calculate
                </button>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold">Results</h2>
                    <table className="w-full mt-4">
                        <thead>
                            <tr>
                                <th className="border p-2">Box Volume</th>
                                <th className="border p-2">Packet Volume</th>
                                <th className="border p-2">Total Packets</th>
                                <th className="border p-2">Total Weight (kg)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border p-2">{results.boxVolume}</td>
                                <td className="border p-2">{results.packetVolume}</td>
                                <td className="border p-2">{results.totalPackets}</td>
                                <td className="border p-2">{results.totalWeights}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Task;

