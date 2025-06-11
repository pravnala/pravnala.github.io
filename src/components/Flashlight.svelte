<script lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	const x = writable(0);
	const y = writable(0);
	let flashlight: HTMLDivElement;

	const updateCoords = (e: MouseEvent | TouchEvent) => {
		const isTouch = e instanceof TouchEvent && e.touches.length > 0;
		const clientX = isTouch ? e.touches[0].clientX : (e as MouseEvent).clientX;
		const clientY = isTouch ? e.touches[0].clientY : (e as MouseEvent).clientY;
		x.set(clientX);
		y.set(clientY);
	};

	onMount(() => {
		window.addEventListener('mousemove', updateCoords);
		window.addEventListener('touchmove', updateCoords, { passive: true });

		const unsubscribeX = x.subscribe((val) => {
			if (flashlight) {
				flashlight.style.setProperty('--x', `${val}px`);
			}
		});
		const unsubscribeY = y.subscribe((val) => {
			if (flashlight) {
				flashlight.style.setProperty('--y', `${val}px`);
			}
		});

		return () => {
			window.removeEventListener('mousemove', updateCoords);
			window.removeEventListener('touchmove', updateCoords);
			unsubscribeX();
			unsubscribeY();
		};
	});
</script>

<div id="flashlight-overlay" class="overlay" bind:this={flashlight}></div>

<style>
	.overlay {
		pointer-events: none;
		position: fixed;
		inset: 0;
		z-index: 9999;
		background: radial-gradient(
			circle 200px at var(--x, 50%) var(--y, 50%),
			transparent 0%,
			rgba(0, 0, 0, 1)
		);
		transition: background 0.05s;
		mix-blend-mode: multiply;
		backdrop-filter: blur(0.5px);
	}

	@media (min-width: 600px) {
		.overlay {
			background: radial-gradient(
				circle 700px at var(--x, 50%) var(--y, 50%),
				transparent 0%,
				rgba(0, 0, 0, 1)
			);
		}
	}
</style>
