import React, { useState} from 'react';
import EntityForm from './EntityForm';

export default function MockUI( { extracted }) {
    const [activeRole, setActiveRole] = useState(extracted.roles[0]);

    return (
      <div className="mt-5">
        <h3>Generated Mock UI for {extracted.appName}</h3>
        <div className="container">
        <h1 className="text-center mb-4">{extracted.appName}</h1>
        <ul className="nav nav-tabs justify-content-center mb-4" role="tablist">
          {extracted.roles.map((role, index) => (
            <li key={index} className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeRole === role ? 'active' : ''}`}
                onClick={() => setActiveRole(role)}
              >
                {role}
              </button>
            </li>
          ))}
        </ul>

        <h4 className="text-center mb-3">{activeRole} Dashboard</h4>
        <div className="mb-3">
          {extracted.roleFeatures[activeRole]?.map((feature, index) => (
            <button key={index} className="btn btn-outline-primary me-2 mb-2">
              {feature}
            </button>
          ))}
        </div>
  
        <h4>Entity Forms</h4>
        {extracted.entities.map((entity, index) => (
          <EntityForm key={index} entity={entity} />
        ))}
        </div>
      </div>
    );
}