import { test, expect } from '@playwright/test';

test.describe('Component Functionality', () => {
  test('skills filter should update displayed content', async ({ page }) => {
    // Go to the skills page
    await page.goto('/skills');
    
    // Wait for the filter component to load
    await page.waitForSelector('.filter-skills');
    
    // Get initial count of displayed items
    const initialItems = await page.locator('.filtered-content .item').count();
    
    // Click on a skill filter (assuming there's at least one checkbox)
    const firstSkillCheckbox = page.locator('.skill-checkbox').first();
    await firstSkillCheckbox.click();
    
    // Wait for the filtered results to update
    await page.waitForTimeout(500); // Small delay for any animations/updates
    
    // Get the new count of displayed items
    const filteredItems = await page.locator('.filtered-content .item').count();
    
    // Verify that filtering changed the displayed items
    expect(filteredItems).not.toEqual(initialItems);
  });

  test('timeline entries should expand and collapse', async ({ page }) => {
    // Go to the timeline page
    await page.goto('/timeline');
    
    // Wait for timeline component to load
    await page.waitForSelector('.timeline');
    
    // Get the first timeline entry
    const firstEntry = page.locator('.timeline-entry').first();
    
    // Initially, the details should be hidden
    const detailsBeforeClick = await firstEntry.locator('.entry-details').isVisible();
    expect(detailsBeforeClick).toBeFalsy();
    
    // Click to expand
    await firstEntry.locator('.entry-header').click();
    
    // Now the details should be visible
    await expect(firstEntry.locator('.entry-details')).toBeVisible();
    
    // Click again to collapse
    await firstEntry.locator('.entry-header').click();
    
    // Details should be hidden again
    await expect(firstEntry.locator('.entry-details')).not.toBeVisible();
  });
});
