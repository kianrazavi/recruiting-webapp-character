export type Attributes = {
    Strength: number;
    Dexterity: number;
    Constitution: number;
    Intelligence: number;
    Wisdom: number;
    Charisma: number;
};

export type Class = "Barbarian" | "Wizard" | "Bard";

// Character DS
export interface Character {
  id: string;
  attributes: Attributes;
  skills: Record<string, number>; // Skills + SP allocations
  skillPoints: number; // 10 + (4 * Intelligence Modifier)
}

export interface AttributeModifiers {
  [key: string]: number;
}