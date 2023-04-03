<script lang="ts" context="module">
	import { controllableState } from '$lib/helpers/controllableState';
	import { uniqueContext } from '$lib/helpers/uniqueContext';
	import type { BaseProps } from '$lib/types';
	import { derived, type Readable } from 'svelte/store';

	export type SwitchRootProps = BaseProps<HTMLButtonElement> & {
		/** The controlled checked state of the switch. */
		checked?: boolean;
		/** When `true`, prevents the user from interacting with the switch. */
		disabled?: boolean;
		/** When `true`, indicates that the user must check the switch before the owning form can be submitted. */
		required?: boolean;
		/** The name of the switch. Submitted with its owning form as part of a name/value pair. */
		name?: string;
		/** The value given as data when submitted with a `name`. */
		value?: string;
	};

	type SwitchContext = {
		checked: Readable<boolean>;
		disabled: Readable<boolean>;
	};

	const { getContext, setContext } = uniqueContext<SwitchContext>();
	export const getSwitchContext = getContext;

	export function getState(checked: boolean) {
		return checked ? 'checked' : 'unchecked';
	}
</script>

<script lang="ts">
	type $$Props = SwitchRootProps;

	export let checked = false;
	export let disabled = false;
	export let required: $$Props['required'] = false;
	export let name: $$Props['name'] = '';
	export let value: $$Props['value'] = '';

	const writableCheckedState = controllableState(checked, (v) => (checked = v));
	$: $writableCheckedState = checked;

	const writableDisabled = controllableState(disabled, (v) => (disabled = v));
	$: $writableDisabled = disabled;

	setContext({
		checked: derived(writableCheckedState, (v) => v),
		disabled: derived(writableDisabled, (v) => v)
	});
</script>

<button
	on:click|stopPropagation={() => {
		checked = !checked;
	}}
	type="button"
	role="switch"
	aria-checked={checked}
	data-state={getState(checked)}
	data-disabled={disabled ? '' : undefined}
	{disabled}
	{value}
	{...$$restProps}
>
	<slot />

	<!-- Hidden input to bubble value up to form -->
	<input
		type="checkbox"
		aria-hidden="true"
		hidden
		tabIndex={-1}
		{name}
		{value}
		{checked}
		{required}
		{disabled}
		style:position="absolute"
		style:pointer-events="none"
		style:opacity="0"
		style:margin="0"
		style:transform="translateX(-100%)"
	/>
</button>
