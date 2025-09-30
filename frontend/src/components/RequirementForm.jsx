import React, { useState } from 'react';
import axios from 'axios';

export default function RequirementForm({ onExtract }) {
    const [ description, setDescription] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validateDescription = (text) => {
            if (!text.trim()) {
                return 'Please enter a description';
            } else if (!/[aeiou]{2,}/i.test(text)){
                return 'Please enter a meaningful description, not random text.';
            } else if (text.trim().length < 15) {
                return 'Please enter at least 15 characters.';
            } else if (text.split(/\s+/).length < 5){
                return 'Please enter at least 5 words.';
            } else {
                return null;
            }
          };

        const validationError = validateDescription(description);
        if (validationError) {
            setError(validationError);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/requirements', { description });
            //console.log("Extracted info:", response.data.extractedInfo);
            onExtract({
                ...response.data,
                appDescription: description
            });
            setDescription('');
        } catch (error) {
            alert('error :' + error);
            setError('Failed to capture requirements. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="description">Describe your app : </label>
                <textarea id="description" className='form-control' rows="4" value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder='e.g. I want an app to manage student courses and grades. Teachers add courses, students enrol, and admins manage reports.'
                disabled={loading} />
            </div>
            <button type='submit' className='btn btn-primary' disabled={loading}>
                {loading ? 'Processing...' : 'Genertate Mock UI'}
            </button>
            {error && <p className="text-danger mt-2">{error}</p>}
        </form>
    );
}