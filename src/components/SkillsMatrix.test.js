import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import SkillsMatrix from './SkillsMatrix.svelte';

describe('SkillsMatrix', () => {
  const mockSkills = [
    { id: 1, name: 'Global Business Strategy', description: 'Team Alignment, Roadmap Development, P&L Budgeting' },
    { id: 2, name: 'Data Architecture', description: 'Data Modeling, Governance, Integration Patterns' }
  ];

  it('renders the skills matrix with the correct number of skills', () => {
    render(SkillsMatrix, { skills: mockSkills });
    
    // Check that all skills are rendered
    mockSkills.forEach(skill => {
      expect(screen.getByText(skill.name)).toBeTruthy();
      expect(screen.getByText(skill.description)).toBeTruthy();
    });
  });

  it('renders empty state when no skills are provided', () => {
    render(SkillsMatrix, { skills: [] });
    
    // Check for empty state message
    expect(screen.getByText(/No skills available/i)).toBeTruthy();
  });
});
