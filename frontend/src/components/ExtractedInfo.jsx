import React from 'react';

export default function ExtractedInfo({ extracted }) {
    //const uniqueEntities = extracted.entities.map(entity => entity.name).join(', ');

    return (
        <div className="mt-4">
            <h2>Extracted Requirements</h2>
            <div>
                <p><strong>User Requirement:</strong> {extracted.appDescription}</p>
                <p><strong>App Name:</strong> {extracted.appName}</p>
                <p><strong>Entities:</strong> {extracted.entities.map((e) => e.name).join(', ')} </p>
                <p><strong>Roles:</strong> {extracted.roles.join(", ")}</p>
                <p><strong>Features:</strong> {extracted.features.join(", ")}</p>
            </div>
        </div>
    );
}

