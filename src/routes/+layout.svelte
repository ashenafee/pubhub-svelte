<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<svelte:head>
	<title>PubHub</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="Get straight to the papers that matter.">
	<link rel="icon" type="image/png" href="/favicon.png" />
</svelte:head>

<LightSwitch class="absolute top-0 right-0 m-5" />
<div class="container h-screen w-1/2 mx-auto flex justify-center items-center">
	<div class="space-y-5 w-full">
		<slot />
	</div>
</div>
