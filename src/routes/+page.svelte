<script lang="ts">
	import { TypeWriter } from 'svelte-typewrite';
	import Flashlight from '../components/Flashlight.svelte';
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';

	let mode = $state('dark');

	// let menu = [
	// 	{
	// 		label: 'Web Developer & IT Consultant',
	// 		value: 'it',
	// 		submenu: [
	// 			{ type: 'text', label: 'Skills', value: 'skills' },
	// 			{ type: 'icon', label: 'Github', value: 'tabler:brand-github-filled' }
	// 		]
	// 	},
	// 	{ label: 'Technical Communicator', value: 'twriter', submenu: [] },
	// 	{ label: 'Filipino Martial Arts Instructor', value: 'fma', submenu: [] },
	// 	{ label: 'biking enthusiast 🤪', value: 'biking', submenu: [] },
	// 	{ label: 'proud dad and fur dad 🐶🐱', value: 'dad', submenu: [] }
	// ];

	let menu = [
		'Web Developer & IT Consultant',
		'Technical Communicator',
		'Filipino Martial Arts Instructor',
		'biking enthusiast 🤪',
		'proud dad and fur dad 🐶🐱'
	];

	let name = $state('Alvin');
	let display: string | null = $state(null);
	let specialty: string | null = $state(null);
	// let activeSpecialty = $state('');

	function switchMode(m: string) {
		mode = m;
	}

	function toggleName() {
		name === 'Alvin' ? (name = 'Alvaro Peñaflor II') : (name = 'Alvin');
	}

	function switchDisplay(d: string) {
		display = d;
	}

	// function typedSpecialty(index: number) {
	// 	specialty = menu[index].value;
	// }

	// $inspect('mode', mode);
	// $inspect('display', display);
</script>

<div class={[mode !== 'flashlight' ? mode : 'dark', 'h-screen w-screen']}>
	<div class={['container mx-auto space-y-10 px-5 pt-[80px]']}>
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
			<div class="flex items-center justify-end space-x-3 text-right"></div>
			<div>
				<div
					class="relative mx-auto aspect-square size-[250px] overflow-hidden rounded-full border-10 border-gray-500/50 dark:border-gray-200/25"
				>
					<img src="/assets/images/alvin-square-2.jpg" alt="" class="h-full w-full object-cover" />
				</div>
				<div class="mt-3 flex justify-center">
					<a
						href="https://github.com/pravnala"
						target="_blank"
						class="group mx-auto mt-4 inline-block items-center transition duration-300 ease-in-out hover:text-black/50 dark:hover:text-white"
					>
						<Icon icon="tabler:brand-github-filled" class="h-7 w-7" />
						<!-- <span class="ml-2 opacity-0 transition duration-500 ease-in-out group-hover:opacity-100"
							>Github</span
						> -->
					</a>
				</div>
			</div>
			<div class="flex items-center justify-start">
				<div class="space-y-3 font-bold">
					<!-- <button
						onclick={() => {
							switchDisplay('cv');
						}}
						class="block cursor-pointer transition duration-300 ease-in-out hover:text-black/50 dark:hover:text-white"
					>
						CV
					</button> -->
					<!-- <a
						href="https://github.com/pravnala"
						target="_blank"
						class="group mt-4 flex items-center transition duration-300 ease-in-out hover:text-black/50 dark:hover:text-white"
					>
						<Icon icon="tabler:brand-github-filled" class="h-6 w-6" />
						<span class="ml-2 opacity-0 transition duration-500 ease-in-out group-hover:opacity-100"
							>Github</span
						>
					</a> -->
					<!-- <button
						onclick={() => {
							switchDisplay('contact');
						}}
						class="block cursor-pointer transition duration-300 ease-in-out hover:text-black/50 dark:hover:text-white"
					>
						Contact Me
					</button> -->
				</div>
			</div>
		</div>

		<div class="space-y-2 text-center lg:space-y-4">
			<div class="text-lg md:text-3xl">
				Hi, I'm <button
					onclick={() => {
						toggleName();
					}}
					class="cursor-pointer text-gray-500 transition duration-300 ease-in-out hover:text-black/80 dark:text-white dark:hover:text-white/50"
					>{name}</button
				>
			</div>
			<div class="text-lg md:text-3xl">
				<div class="inline-block">I'm a</div>
				<div class="inline-block text-gray-500 dark:text-white">
					<!-- <button
						onclick={() => {
							specialty ? (activeSpecialty = specialty) : (specialty = null);
						}}
						class="cursor-pointer transition duration-300 ease-in-out hover:text-black/80 dark:text-white dark:hover:text-white/50"
					> -->
					<!-- <TypeWriter texts={menu.map((item) => item)} ontypestart={(i) => typedSpecialty(i)} /> -->
					<TypeWriter texts={menu.map((item) => item)} />
					<!-- </button> -->
				</div>
			</div>
			<!-- <div class="animate-pulse text-xs text-gray-500">click on typed text</div> -->
		</div>

		<!-- {#if display === 'contact'} -->
		<!-- <div transition:fade={{ duration: 500 }} class="mx-auto max-w-xl">Contact Form</div> -->
		<!-- {/if} -->

		<!-- <div>
			{#if activeSpecialty === 'it'}
				<div transition:fade={{ duration: 500 }} class="text-center text-sm">
					{menu.find((item) => item.value === activeSpecialty)?.label}
				</div>
			{/if}
			{#if activeSpecialty === 'twriter'}
				<div transition:fade={{ duration: 500 }} class="text-center text-sm">
					{menu.find((item) => item.value === activeSpecialty)?.label}
				</div>
			{/if}
		</div> -->

		<!-- {#if activeSpecialty === 'twriter'}
			<div>
				<div transition:fade={{ duration: 500 }} class="text-center text-sm">
					{menu.find((item) => item.value === activeSpecialty)?.label}
				</div>
			</div>
		{/if} -->

		{#if mode === 'flashlight'}
			<Flashlight />
		{/if}
	</div>
</div>
