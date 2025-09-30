import React from 'react';

export default function EntityForm({ entity }) {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <h5>{entity.name} Form</h5>
      </div>
      <div className="card-body">
        <form>
          {entity.fields.map((field, index) => (
            <div key={index} className="form-group mb-2">
              <label htmlFor={field.name}>{field.name}</label>
              <input
                type={
                  field.type === 'number'
                    ? 'number'
                    : field.type === 'date'
                    ? 'date'
                    : 'text'
                }
                className="form-control"
                id={field.name}
                placeholder={`Enter ${field.name}`}
              />
            </div>
          ))}
          <button type="button" className="btn btn-primary">
            Submit (Mock)
          </button>
        </form>
      </div>
    </div>
  );
}