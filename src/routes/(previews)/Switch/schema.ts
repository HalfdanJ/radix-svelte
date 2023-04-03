import type { Switch } from '$lib';
import type { PreviewSchema } from '../helpers';
import example, { props } from './example.svelte';

export const schema = {
	title: 'Switch',
	description: 'A control that allows the user to toggle between checked and not checked.',
	example,
	props
} satisfies PreviewSchema<typeof Switch>;
