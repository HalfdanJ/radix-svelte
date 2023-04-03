import { expect, test } from '@playwright/experimental-ct-svelte';

import SwitchTest from './SwitchTest.svelte';
import { axeViolations } from '$test-helpers/axeTester.js';

test.describe('Checkbox', () => {
	test('No accesibility violations', async ({ mount, page }) => {
		await mount(SwitchTest);
		expect(await axeViolations(page)).toEqual([]);
	});

	test('Thumb toggles when clicked', async ({ mount }) => {
		const cmp = await mount(SwitchTest);
		const thumb = cmp.getByTestId('switch-thumb');

		await expect(cmp).toBeVisible();
		await expect(cmp).toHaveAttribute('data-state', 'unchecked');
		await expect(thumb).toHaveAttribute('data-state', 'unchecked');
		await cmp.click();
		await expect(cmp).toHaveAttribute('data-state', 'checked');
		await expect(thumb).toHaveAttribute('data-state', 'checked');
		await cmp.click();
		await expect(cmp).toHaveAttribute('data-state', 'unchecked');
		await expect(thumb).toHaveAttribute('data-state', 'unchecked');
	});

	test('Should be checked when checked prop is true', async ({ mount }) => {
		const cmp = await mount(SwitchTest, { props: { checked: true } });
		await expect(cmp).toHaveAttribute('data-state', 'checked');
	});

	test('Should be disabled when disabled prop is true', async ({ mount }) => {
		const cmp = await mount(SwitchTest, { props: { disabled: true } });
		await expect(cmp).toHaveAttribute('data-disabled', '');
		await expect(cmp).toHaveAttribute('disabled', '');
	});

	test('Hidden input field value gets updated', async ({ mount }) => {
		const cmp = await mount(SwitchTest);

		const input = await cmp.locator('input');
		await expect(input).toBeHidden();
		await expect(input).toHaveAttribute('name', 'test-name');
		await expect(input).toHaveAttribute('value', 'test-value');
		await expect(input).toHaveAttribute('required', '');

		await expect(input).not.toBeChecked();

		await cmp.click();

		await expect(input).toBeChecked();
	});
});
