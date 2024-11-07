import { Attributes } from '../types';

// Ability modifier calculation
export const calculateAbilityModifier = (attributeValue: number): number => {
    return Math.floor((attributeValue - 10) / 2);
  };
  
// Skill point calculation based on the intelligence modifier
  export const calculateSkillPoints = (intelligenceModifier: number): number => {
    return 10 + (4 * intelligenceModifier);
  };
  
// Check if given attributes meet requirements for a class
  export const meetsClassRequirements = (attributes: Attributes, classRequirements: Attributes): boolean => {
    return Object.keys(classRequirements).every(attr => 
      attributes[attr as keyof Attributes] >= classRequirements[attr as keyof Attributes]
    );
  };