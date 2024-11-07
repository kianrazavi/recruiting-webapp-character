import React, { useState } from 'react';
import { SKILL_LIST } from '../consts';
import { Attributes } from '../types';
import { calculateAbilityModifier } from '../utils/attributeUtils';

interface SkillCheckBoxProps {
  attributes: Attributes;
  skills: Record<string, number>;
}

export const SkillCheckBox: React.FC<SkillCheckBoxProps> = ({ attributes, skills }) => {
  // Set initial state of skill, DC, and roll result
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDc] = useState<number>(10);
  const [rollResult, setRollResult] = useState<number | null>(null);

  // Event handler for rolls
  const handleRoll = () => {
    const roll = Math.floor(Math.random() * 20) + 1;
    setRollResult(roll);
    const skill = SKILL_LIST.find(s => s.name === selectedSkill)!;
    const attributeModifier = calculateAbilityModifier(
      attributes[skill.attributeModifier as keyof Attributes]
    );
    const skillPoints = skills[selectedSkill] || 0;
    const total = roll + attributeModifier + skillPoints;
  };

  return (
    <section className="skill-check-section">
      <h2>Skill Check</h2>
      <div className="skill-check-controls">
        <div className="skill-check-input">
          <label>Skill:</label>
          <select 
            value={selectedSkill} 
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            {SKILL_LIST.map(skill => (
              <option key={skill.name} value={skill.name}>
                {skill.name}
              </option>
            ))}
          </select>
        </div>
        <div className="skill-check-input">
          <label>DC:</label>
          <input
            type="number"
            value={dc}
            onChange={(e) => setDc(Number(e.target.value))}
            min={0}
            placeholder="DC"
          />
        </div>
        <button onClick={handleRoll}>Roll</button>
      </div>
      {rollResult !== null && (
        <div className="skill-check-result">
          <p>You rolled: {rollResult}</p>
          <p>Result: {rollResult >= dc ? 'Success!' : 'Failure'}</p>
        </div>
      )}
    </section>
  );
};