import React, { useState } from 'react';
import { ATTRIBUTE_LIST } from '../consts';
import { Attributes, Class } from '../types';
import { calculateAbilityModifier, calculateSkillPoints } from '../utils/attributeUtils';
import { AttributeBox } from './AttributeBox';
import { ClassBox } from './ClassBox';
import { SkillBox } from './SkillBox';
import { SkillCheckBox } from './SkillCheckBox';
import { ClassRequirementsBox } from './ClassRequirementsBox';
import './CharacterSheet.css';

interface CharacterSheetProps {
  id: string;
}

export const CharacterSheet = ({ id }: CharacterSheetProps) => {
  // Initialize attributes, class, and skills
  const [attributes, setAttributes] = useState<Attributes>(() => 
    ATTRIBUTE_LIST.reduce((acc, attr) => ({
      ...acc,
      [attr]: 10 // Default value
    }), {} as Attributes)
  );
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [skills, setSkills] = useState<Record<string, number>>({});
  // Initialize state for showing class requirements
  const [showRequirements, setShowRequirements] = useState(false);
  const [selectedClassForReq, setSelectedClassForReq] = useState<Class | null>(null);

  // Calculate total/used skill points
  const intelligenceModifier = calculateAbilityModifier(attributes.Intelligence);
  const totalSkillPoints = calculateSkillPoints(intelligenceModifier);
  const usedSkillPoints = Object.values(skills).reduce((sum, points) => sum + points, 0);

  // Event handlers for attribute/skill changes and clicking a class to see requirements
  const handleAttributeChange = (attribute: keyof Attributes, increment: boolean) => {
    const currentTotal = Object.values(attributes).reduce((sum, val) => sum + val, 0);
    if (increment && currentTotal >= 70) {
      alert('A Character can have up to 70 Delegated Attribute Points');
      return;
    }
    if (!increment && attributes[attribute] <= 0) return;
    setAttributes(prev => ({
      ...prev,
      [attribute]: prev[attribute] + (increment ? 1 : -1)
    }));
  };

  const handleSkillChange = (skillName: string, increment: boolean) => {
    if ((increment && usedSkillPoints >= totalSkillPoints) || (!increment && (skills[skillName] || 0) <= 0)) return;
    setSkills(prev => ({
      ...prev,
      [skillName]: (prev[skillName] || 0) + (increment ? 1 : -1)
    }));
  };

  const handleClassClick = (className: Class) => {
    setSelectedClassForReq(className);
    setShowRequirements(true);
  };

  return (
    <div className="character-sheet">
      <h2>Character {id}</h2>
      <SkillCheckBox 
        attributes={attributes}
        skills={skills}
      />
      <div className="character-content">
        <AttributeBox 
          attributes={attributes}
          onAttributeChange={handleAttributeChange}
        />
        <ClassBox 
          attributes={attributes}
          selectedClass={selectedClass}
          onClassSelect={handleClassClick}
        />
        {showRequirements && selectedClassForReq && (
          <ClassRequirementsBox
            selectedClass={selectedClassForReq}
            onClose={() => setShowRequirements(false)}
          />
        )}
        <SkillBox 
          attributes={attributes}
          skills={skills}
          onSkillChange={handleSkillChange}
          totalSkillPoints={totalSkillPoints}
          usedSkillPoints={usedSkillPoints}
        />
      </div>
    </div>
  );
};