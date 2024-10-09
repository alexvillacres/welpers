// tests/timedTabs.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { timedTabs } from '../src/timed-tabs';

describe('timedTabs', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.useFakeTimers(); // Mock timers
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  it('should initialize without errors', () => {
    document.body.innerHTML = `
      <div wp-tabs-timed="2000">
        <a class="w-tab-link w--current" href="#tab1">Tab 1</a>
        <a class="w-tab-link" href="#tab2">Tab 2</a>
        <a class="w-tab-link" href="#tab3">Tab 3</a>
      </div>
    `;

    expect(() => timedTabs()).not.toThrow();
  });

  it('should switch tabs at the specified interval', () => {
    document.body.innerHTML = `
      <div wp-tabs-timed="2000">
        <a class="w-tab-link w--current" href="#tab1">Tab 1</a>
        <a class="w-tab-link" href="#tab2">Tab 2</a>
        <a class="w-tab-link" href="#tab3">Tab 3</a>
      </div>
    `;

    const clickSpy = vi.fn();
    const tabs = document.querySelectorAll<HTMLAnchorElement>('a');
    tabs.forEach((tab) => tab.addEventListener('click', clickSpy));

    timedTabs();

    // Fast-forward time by 4000ms intervals
    vi.advanceTimersByTime(4000);
    expect(clickSpy).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(8000);
    expect(clickSpy).toHaveBeenCalledTimes(2);

    vi.advanceTimersByTime(12000);
    expect(clickSpy).toHaveBeenCalledTimes(3);
  });

});
