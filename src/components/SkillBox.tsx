import React from 'react';
import { SKILL_LIST } from '../consts';
import { Attributes } from '../types';
import { calculateAbilityModifier } from '../utils/attributeUtils';

interface SkillBoxProps {
  attributes: Attributes;
  skills: Record<string, number>;
  onSkillChange: (skillName: string, increment: boolean) => void;
  totalSkillPoints: number;
  usedSkillPoints: number;
}

export const SkillBox: React.FC<SkillBoxProps> = ({
  attributes,
  skills,
  onSkillChange,
  totalSkillPoints,
  usedSkillPoints
}) => {
  return (
    <section className="skills-section">
      <h2>Skills</h2>
      <div>Total skill points available: {totalSkillPoints - usedSkillPoints}</div>
      {SKILL_LIST.map(skill => {
        const modifier = calculateAbilityModifier(attributes[skill.attributeModifier as keyof Attributes]);
        const allocatedPoints = skills[skill.name] || 0;
        const total = modifier + allocatedPoints;

        return (
          <div key={skill.name} className="skill-row">
            <span>{skill.name}: {allocatedPoints}</span>
            <span>(Modifier: {skill.attributeModifier}): {modifier}</span>
            <button onClick={() => onSkillChange(skill.name, true)}>+</button>
            <button onClick={() => onSkillChange(skill.name, false)}>-</button>
            <span>total: {total}</span>
          </div>
        );
      })}
    </section>
  );
};