<script lang="ts">
	import { TypeWriter } from 'svelte-typewrite';
	import Flashlight from '../components/Flashlight.svelte';
	import Icon from '@iconify/svelte';
	import ContactForm from '../components/ContactForm.svelte';
	import { fade } from 'svelte/transition';

	let mode = $state('dark');

	let menu = [
		'a Web Developer',
		'an IT Consultant',
		'a Technical Communicator',
		'a Filipino Martial Arts Instructor',
		'a cycling enthusiast 🤪',
		'a proud dad and fur dad 🐶🐱'
	];

	function switchMode(m: string) {
		mode = m;
	}

	let display = $state('');

	function switchDisplay(m: string) {
		display = m;
	}
</script>

<div class={[mode !== 'flashlight' ? mode : 'dark', 'min-h-screen']}>
	<div class={['container mx-auto space-y-10 px-5 pt-[80px] pb-[50px]']}>
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
					</a>
				</div>
			</div>
			<div class="flex items-center justify-start">
				<div class="space-y-3 font-bold"></div>
			</div>
		</div>

		<div class="space-y-2 text-center lg:space-y-4">
			<h1 class="text-lg md:text-3xl">
				Hi, I'm <span class="text-gray-500 dark:text-white">Alvin</span>
			</h1>
			<div class="text-lg md:text-3xl">
				<div class="inline-block">I'm</div>
				<div class="inline-block text-gray-500 dark:text-white">
					<TypeWriter texts={menu.map((item) => item)} />
				</div>
			</div>
		</div>

		<div class="space-y-2 space-x-10 pt-10 text-center text-base font-semibold">
			<button
				onclick={() => {
					switchDisplay('itprof');
				}}
				class={[
					'w-full cursor-pointer transition duration-500 ease-in-out hover:text-black/90 sm:w-auto dark:hover:text-white/100',
					display === 'itprof'
						? 'text-black/90 dark:text-white'
						: 'text-black/50 dark:text-white/50'
				]}>IT Professional</button
			>
			<button
				onclick={() => {
					switchDisplay('fma');
				}}
				class={[
					'w-full cursor-pointer transition duration-500 ease-in-out hover:text-black/90 sm:w-auto dark:hover:text-white/100',
					display === 'fma' ? 'text-black/90 dark:text-white' : 'text-black/50 dark:text-white/50'
				]}>FMA / Arnis Instructor</button
			>
			<button
				onclick={() => {
					switchDisplay('contact');
				}}
				class={[
					'w-full cursor-pointer transition duration-500 ease-in-out hover:text-black/90 sm:w-auto dark:hover:text-white/100',
					display === 'contact'
						? 'text-black/90 dark:text-white'
						: 'text-black/50 dark:text-white/50'
				]}>Contact Me</button
			>
			<button
				onclick={() => {
					switchDisplay('about');
				}}
				class={[
					'w-full cursor-pointer transition duration-500 ease-in-out hover:text-black/90 sm:w-auto dark:hover:text-white/100',
					display === 'about' ? 'text-black/90 dark:text-white' : 'text-black/50 dark:text-white/50'
				]}>About</button
			>
		</div>

		<div class="mx-auto max-w-2xl text-sm/6 sm:text-base/7">
			{#if display === 'itprof'}
				<div class="space-y-5">
					<h2 class="text-center">Web Developer | IT Consultant | Technical Communicator</h2>
					<p>
						IT professional with 25+ years of experience in designing and developing modern,
						high-performance websites and web applications. Currently specializing in Astro,
						Svelte/SvelteKit, Tailwind CSS, Javascript, cloud platforms, and exploring AI-assisted
						tools to enhance development workflows. A long-time Linux and Open Source advocate,
						certified Filipino Martial Arts instructor, and a cycling enthusiast, combining
						technical expertise with a passion for problem-solving and continuous learning.
					</p>
				</div>
			{/if}
			{#if display === 'fma'}
				<div class="space-y-5">
					<p>
						Long-time practitioner and instructor of Lapunti Arnis De Abanico, having begun training
						in 2010 and received instructor certification in 2015. Prior martial arts background
						includes Aikido, Won Hwa Do, Judo, Karate, and Jeet Kune Do.
					</p>

					<h2 class="uppercase">Affiliations</h2>
					<p>
						Founding member and Senior Instructor <br />
						<em>Lapunti Karilyon (UP Diliman Lapunti Arnis De Abanico Training Group)</em>
					</p>
					<p>
						Member and Certified Instructor<br />
						<em>Lapunti Arnis De Abanico International (LADAI)</em>
					</p>
					<p>
						Affiliate Member and Instructor<br />
						<em>Philippine Eskrima Kali Arnis Federation (PEKAF)</em>
					</p>
				</div>
			{/if}
			{#if display === 'contact'}
				<div class="space-y-5">
					<ContactForm />
				</div>
			{/if}
			{#if display === 'about'}
				<div class="space-y-5">
					<p>
						This page is built with SvelteKit and Tailwind CSS. This is just my attempt to explore
						and play around with the framework. I may add more content and features from time to
						time.
					</p>
				</div>
			{/if}
		</div>

		{#if mode === 'flashlight'}
			<Flashlight />
		{/if}
	</div>
</div>
