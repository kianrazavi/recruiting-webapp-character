import React from 'react';
import { Class } from '../types';
import { CLASS_LIST } from '../consts';

interface ClassRequirementsBoxProps {
  selectedClass: Class;
  onClose: () => void;
}

export const ClassRequirementsBox: React.FC<ClassRequirementsBoxProps> = ({
  selectedClass,
  onClose
}) => {
  const requirements = CLASS_LIST[selectedClass];

  return (
    <section className="class-requirements-section">
      <h2>{selectedClass} Minimum Requirements</h2>
      <div>
        {Object.entries(requirements).map(([attribute, value], index) => (
          <div key={attribute}>
            {attribute}: {value}
          </div>
        ))}
      </div>
      <button 
        onClick={onClose}
      >
        Close Requirement View
      </button>
    </section>
  );
};