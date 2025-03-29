import React from 'react';

const Requests = () => {
    const requests = [
        { id: 1, organization: 'Helping Hands NGO', foodNeeded: '200 meals' },
        { id: 2, organization: 'Food for All', foodNeeded: '150 meals' }
    ];

    return (
        <div>
            <h2>Food Requests</h2>
            <ul>
                {requests.map((req) => (
                    <li key={req.id}>{req.organization} needs {req.foodNeeded}</li>
                ))}
            </ul>
        </div>
    );
};

export default Requests;
