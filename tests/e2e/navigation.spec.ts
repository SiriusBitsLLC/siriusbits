import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to all main pages', async ({ page }) => {
    // Start at the home page
    await page.goto('/');
    await expect(page).toHaveTitle(/Home.*SiriusBits/);
    
    // Check hero section content
    const heroHeading = page.locator('section.hero h1');
    await expect(heroHeading).toHaveText('Welcome to SiriusBits Consulting');
    
    // Navigate to Skills page
    await page.click('text=Skills');
    await expect(page).toHaveTitle(/Skills.*SiriusBits/);
    
    // Navigate to Timeline page
    await page.click('text=Timeline');
    await expect(page).toHaveTitle(/Timeline.*SiriusBits/);
    
    // Navigate to Contact page
    await page.click('text=Contact');
    await expect(page).toHaveTitle(/Contact.*SiriusBits/);
    
    // Navigate back to Home
    await page.click('text=Home');
    await expect(page).toHaveTitle(/Home.*SiriusBits/);
  });
});
