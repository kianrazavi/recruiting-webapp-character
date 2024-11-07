import React from 'react';
import { CLASS_LIST } from '../consts';
import { Attributes, Class } from '../types';
import { meetsClassRequirements } from '../utils/attributeUtils';

interface ClassBoxProps {
  attributes: Attributes;
  selectedClass: Class | null;
  onClassSelect: (className: Class) => void;
}

export const ClassBox: React.FC<ClassBoxProps> = ({
  attributes,
  onClassSelect
}) => {
  return (
    <section className="classes-section">
      <h2>Classes</h2>
      <div className="class-list">
        {Object.entries(CLASS_LIST).map(([className, requirements]) => {
          const meetsRequirements = meetsClassRequirements(attributes, requirements);
          return (
            <div 
              key={className}
              className={`class-item ${meetsRequirements ? 'meets-requirements' : ''}`}
              onClick={() => onClassSelect(className as Class)}
            >
              {className}
            </div>
          );
        })}
      </div>
    </section>
  );
};