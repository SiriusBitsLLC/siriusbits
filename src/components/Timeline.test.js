import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Timeline from './Timeline.svelte';

describe('Timeline', () => {
  const mockExperience = [
    {
      id: 1,
      title: 'Sr. Mgr, Data Strategy & Governance',
      company: 'Nestlé',
      companyType: 'Food Service Supplier',
      startDate: '2024-04-01',
      endDate: '2025-01-01',
      summary: 'Established the Data Strategy and Governance practice.',
      duties: [
        { id: 1, duty: 'Led cross-functional team', activities: [] }
      ]
    },
    {
      id: 2,
      title: 'Sr. Enterprise Information Architect',
      company: 'Sherwin Williams',
      companyType: 'Global Retail and Manufacturing',
      startDate: '2024-01-01',
      endDate: '2024-03-01',
      summary: 'Led strategic architecture initiatives.',
      duties: [
        { id: 2, duty: 'Advised on data strategy', activities: [] }
      ]
    }
  ];

  it('renders the timeline with the correct number of entries', () => {
    render(Timeline, { experience: mockExperience });
    
    // Check that all experience entries are rendered
    mockExperience.forEach(exp => {
      expect(screen.getByText(exp.title)).toBeTruthy();
      expect(screen.getByText(exp.company)).toBeTruthy();
    });
  });

  it('expands and collapses timeline entries on click', async () => {
    render(Timeline, { experience: mockExperience });
    
    // Get the first timeline entry header
    const firstEntryHeader = screen.getAllByRole('button')[0];
    
    // Initially, details should be hidden
    const detailsBeforeClick = screen.queryByText(mockExperience[0].duties[0].duty);
    expect(detailsBeforeClick).toBeNull();
    
    // Click to expand
    await fireEvent.click(firstEntryHeader);
    
    // Now details should be visible
    const detailsAfterClick = screen.queryByText(mockExperience[0].duties[0].duty);
    expect(detailsAfterClick).toBeTruthy();
    
    // Click again to collapse
    await fireEvent.click(firstEntryHeader);
    
    // Details should be hidden again
    const detailsAfterSecondClick = screen.queryByText(mockExperience[0].duties[0].duty);
    expect(detailsAfterSecondClick).toBeNull();
  });

  it('allows multiple entries to be expanded simultaneously', async () => {
    render(Timeline, { experience: mockExperience });
    
    // Get all timeline entry headers
    const entryHeaders = screen.getAllByRole('button');
    
    // Click to expand first entry
    await fireEvent.click(entryHeaders[0]);
    
    // Click to expand second entry
    await fireEvent.click(entryHeaders[1]);
    
    // Both entries should be expanded
    expect(screen.queryByText(mockExperience[0].duties[0].duty)).toBeTruthy();
    expect(screen.queryByText(mockExperience[1].duties[0].duty)).toBeTruthy();
  });
});
