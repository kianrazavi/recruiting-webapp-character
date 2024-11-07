import React from 'react';
import { ATTRIBUTE_LIST } from '../consts';
import { Attributes } from '../types';
import { calculateAbilityModifier } from '../utils/attributeUtils';

interface AttributeBoxProps {
  attributes: Attributes;
  onAttributeChange: (attribute: keyof Attributes, increment: boolean) => void;
}

export const AttributeBox: React.FC<AttributeBoxProps> = ({ 
  attributes, 
  onAttributeChange 
}) => {
  return (
    <section className="attributes-section">
      <h2>Attributes</h2>
      {ATTRIBUTE_LIST.map(attribute => (
        <div key={attribute} className="attribute-row">
          <span>{attribute}: {attributes[attribute as keyof Attributes]}</span>
          <span>(Modifier: {calculateAbilityModifier(attributes[attribute as keyof Attributes])})</span>
          <button onClick={() => onAttributeChange(attribute as keyof Attributes, true)}>+</button>
          <button onClick={() => onAttributeChange(attribute as keyof Attributes, false)}>-</button>
        </div>
      ))}
    </section>
  );
};
