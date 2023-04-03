<script lang="ts" context="module">
	export const props = {
		Root: {
			checked: {
				type: 'boolean',
				default: false
			},
			disabled: {
				type: 'boolean'
			},
			required: {
				type: 'boolean',
				hideControls: true
			},
			name: {
				type: 'string',
				hideControls: true
			},
			value: {
				type: 'string',
				hideControls: true
			}
		},
		Thumb: {}
	} satisfies PreviewProps<typeof Switch>;
</script>

<script lang="ts">
	import { Switch } from '$lib/components/Switch';
	import { getPropsObj, type PreviewProps } from '../helpers';

	export let propsObj = getPropsObj<typeof Switch>(props);
</script>

<form>
	<div class="flex items-center">
		<label class="pr-[15px] text-[15px] leading-none text-white" for="airplane-mode">
			Airplane mode
		</label>
		<Switch.Root
			class="relative h-[25px] w-[42px] cursor-default rounded-full bg-black/50 shadow-[0_2px_10px] shadow-black/50 outline-none 
						focus:shadow-[0_0_0_2px] focus:shadow-black disabled:bg-black/30
						data-[state=checked]:bg-black"
			id="airplane-mode"
			disabled={propsObj.Root.disabled}
			bind:checked={propsObj.Root.checked}
			name={propsObj.Root.name}
			value={propsObj.Root.value}
			required={propsObj.Root.required}
		>
			<Switch.Thumb
				class="block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] shadow-black/50 
							transition-transform duration-100 will-change-transform 
							data-[state=checked]:translate-x-[19px]
							data-[disabled]:bg-white/70"
			/>
		</Switch.Root>
	</div>
</form>
