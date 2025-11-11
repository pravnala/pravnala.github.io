<script lang="ts">
	// Replace with your actual Formspree endpoint:
	const formspreeEndpoint = 'https://formspree.io/f/xgvrekpn';

	let formData = {
		name: '',
		email: '',
		message: '',
		captcha: ''
	};

	let status: 'idle' | 'sending' | 'success' | 'error' | 'captcha-error' = 'idle';

	// Generate a simple math captcha
	const a = Math.floor(Math.random() * 10) + 1;
	const b = Math.floor(Math.random() * 10) + 1;
	const correctAnswer = a + b;

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		// Simple validation for captcha
		if (parseInt(formData.captcha) !== correctAnswer) {
			status = 'captcha-error';
			return;
		}

		status = 'sending';

		const res = await fetch(formspreeEndpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: formData.name,
				email: formData.email,
				message: formData.message
			})
		});

		if (res.ok) {
			status = 'success';
			formData = { name: '', email: '', message: '', captcha: '' };
		} else {
			status = 'error';
		}
	}
</script>

<form on:submit={handleSubmit} class="contact mx-auto max-w-lg space-y-4">
	<!-- <h2 class="mb-4 text-center text-2xl font-semibold text-gray-800 dark:text-gray-100">
		Contact Us
	</h2> -->

	<!-- Name -->
	<div>
		<label for="name" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
			Name
		</label>
		<input
			id="name"
			type="text"
			bind:value={formData.name}
			required
			class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
		/>
	</div>

	<!-- Email -->
	<div>
		<label for="email" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
			Email
		</label>
		<input
			id="email"
			type="email"
			bind:value={formData.email}
			required
			class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
		/>
	</div>

	<!-- Message -->
	<div>
		<label for="message" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
			Message
		</label>
		<textarea
			id="message"
			rows="4"
			bind:value={formData.message}
			required
			class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
		></textarea>
	</div>

	<!-- Match Captcha -->
	<div>
		<label for="captcha" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
			What is {a} + {b}?
		</label>
		<input
			id="captcha"
			type="number"
			bind:value={formData.captcha}
			required
			class="w-32 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
		/>
	</div>

	<!-- Submit Button -->
	<button
		type="submit"
		class="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition duration-150 hover:bg-blue-700"
		disabled={status === 'sending'}
	>
		{#if status === 'sending'}
			Sending...
		{:else}
			Send Message
		{/if}
	</button>

	<!-- Messages -->
	{#if status === 'success'}
		<p class="mt-2 text-center text-green-600">Thanks! Your message has been sent.</p>
	{:else if status === 'error'}
		<p class="mt-2 text-center text-red-600">Something went wrong. Please try again.</p>
	{:else if status === 'captcha-error'}
		<p class="mt-2 text-center text-yellow-600">Incorrect answer. Please try again.</p>
	{/if}
</form>
