<script lang="ts">
	import { TypeWriter } from 'svelte-typewrite';
	import Flashlight from '../components/Flashlight.svelte';
	import Icon from '@iconify/svelte';

	let mode = $state('dark');

	let roles = [
		'Web Developer & IT Consultant',
		'Technical Writer / Communicator',
		'Filipino Martial Arts Instructor',
		'biking enthusiast 🤪',
		'proud dad 😁',
		'fur dad 🐶🐱'
	];

	let name = $state('Alvin');
	let display: string | null = $state(null);

	function switchMode(m: string) {
		mode = m;
	}

	function toggleName() {
		name === 'Alvin' ? (name = 'Alvaro Penaflor II') : (name = 'Alvin');
	}

	function switchDisplay(d: string) {
		display = d;
	}

	// $inspect('mode', mode);
	$inspect('display', display);
</script>

<div class={[mode !== 'flashlight' ? mode : 'dark', 'h-screen w-screen']}>
	<div class={['container mx-auto space-y-15 px-5 pt-[80px]']}>
		<div class="flex w-full items-center justify-center space-x-2">
			<button
				onclick={() => {
					switchMode('flashlight');
				}}
				class={[
					'cursor-pointer rounded-full p-2 text-xs uppercase transition duration-300 ease-in-out hover:bg-gray-500/50',
					mode === 'flashlight' && 'pointer-events-none bg-gray-500/50'
				]}><Icon icon="ic:baseline-flashlight-on" class="h-6 w-6" /></button
			>
			<button
				onclick={() => {
					switchMode('dark');
				}}
				class={[
					'cursor-pointer rounded-full p-2 text-xs uppercase transition duration-300 ease-in-out hover:bg-gray-500/50',
					mode === 'dark' && 'pointer-events-none bg-gray-500/50'
				]}><Icon icon="ic:sharp-dark-mode" class="h-6 w-6" /></button
			>
			<button
				onclick={() => {
					switchMode('light');
				}}
				class={[
					'cursor-pointer rounded-full p-2 text-xs uppercase transition duration-300 ease-in-out hover:bg-gray-500/50',
					mode === 'light' && 'pointer-events-none bg-gray-500/50'
				]}><Icon icon="ic:baseline-brightness-high" class="h-6 w-6" /></button
			>
		</div>

		<div class="grid grid-cols-[1fr_250px_1fr] gap-8">
			<div class="flex items-center justify-end space-x-3 text-right">
				<div>
					<a
						href="https://github.com/pravnala"
						target="_blank"
						class="transition duration-300 ease-in-out hover:text-black/50 dark:hover:text-white"
					>
						<Icon icon="tabler:brand-github-filled" class="h-7 w-7" />
					</a>
				</div>
				<!-- <div>
					<a href="https://github.com/pravnala" target="_blank">
						<Icon icon="tabler:brand-linkedin-filled" class="h-7 w-7" />
					</a>
				</div> -->
			</div>
			<div>
				<div
					class="relative mx-auto aspect-square size-[250px] overflow-hidden rounded-full border-10 border-gray-500/50 dark:border-gray-200/25"
				>
					<img src="/assets/images/alvin-square-2.jpg" alt="" class="h-full w-full object-cover" />
				</div>
			</div>
			<div class="flex items-center justify-start">
				<div class="space-y-2 font-bold">
					<button
						onclick={() => {
							switchDisplay('skills');
						}}
						class="block cursor-pointer transition duration-300 ease-in-out hover:text-black/50 dark:hover:text-white"
					>
						Skills
					</button>
					<button
						onclick={() => {
							switchDisplay('cv');
						}}
						class="block cursor-pointer transition duration-300 ease-in-out hover:text-black/50 dark:hover:text-white"
					>
						CV
					</button>
					<button
						onclick={() => {
							switchDisplay('contact');
						}}
						class="block cursor-pointer transition duration-300 ease-in-out hover:text-black/50 dark:hover:text-white"
					>
						Contact Me
					</button>
				</div>
			</div>
		</div>

		<div class="space-y-4 text-center">
			<div class="text-3xl">
				Hi, I'm <button
					onclick={() => {
						toggleName();
					}}
					class="cursor-pointer text-gray-500 transition duration-300 ease-in-out hover:text-black/80 dark:text-white dark:hover:text-white/50"
					>{name}</button
				>
			</div>
			<div class="text-3xl">
				<div class="inline-block">I'm a</div>
				<div class="inline-block text-gray-500 dark:text-white">
					<button
						class="cursor-pointer transition duration-300 ease-in-out hover:text-black/80 dark:text-white dark:hover:text-white/50"
					>
						<TypeWriter texts={roles} />
					</button>
				</div>
			</div>
		</div>

		<!-- <div>
			<div>Web developer</div>
			<div>Technical communicator</div>
			<div>FMA Instructor</div>
		</div> -->

		{#if mode === 'flashlight'}
			<Flashlight />
		{/if}
	</div>
</div>
