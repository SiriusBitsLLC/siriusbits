import { describe, it, expect } from 'vitest';

describe('BaseLayout', () => {
  it('should be importable', async () => {
    // This is a simple test to verify the file can be imported
    const module = await import('./BaseLayout.astro');
    expect(module).toBeDefined();
  });
});
