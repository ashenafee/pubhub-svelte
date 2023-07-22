
<script lang='ts'>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { TestTube2, HelpCircle, Search } from 'lucide-svelte';
	import { searchPubMed } from '../services/pubmed';
	import { getJcrData } from '../services/jcr';
	import { writable } from 'svelte/store';
	import type { PubmedResult } from '../types/pubmed';

	const progress = writable(false);
	const results = writable<PubmedResult[]>([]);

	function handleSubmit(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const input = form.querySelector('input[type=search]') as HTMLInputElement;
		const query = input.value;

		progress.set(true);
		
		searchPubMed(query).then((data) => {
			getJcrData(data).then((jcrData) => {
				console.log(jcrData);
				progress.set(false);
				results.set(jcrData);
			});
		});
	}
</script>

<h1 class="h1">PubHub</h1>
<form on:submit={handleSubmit}>
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<div class="input-group-shim"><Search /></div>
		<input type="search" placeholder="Search..." />
		<button class="variant-filled-primary">Submit</button>
	</div>
</form>
{#if $progress}
	<ProgressBar label="Progress Bar" value={undefined} class="block" />
{/if}
{#if $results && $results.length > 0}
<div class="overflow-y-auto h-96 hide-scrollbar p-2">
	{#each $results as result}
		<div class="card mb-5 variant-filled-surface card-hover hover:cursor-pointer">
			<a href={`https://doi.org/${result.doi}`} target="_blank" rel="noopener noreferrer" class="block">
				<section class="p-4">
					<p class="text-md">{result.title}</p>
					<p class="text-xs">{result.doi}</p>
					<!-- TODO: Figure out TS type safety... -->
					<p class="text-xs">{result.jcrData.jif2019}</p>
				</section>
			</a>
		</div>
	{/each}
</div>
{/if}
<Accordion>
	<AccordionItem>
		<svelte:fragment slot="lead"><TestTube2 /></svelte:fragment>
		<svelte:fragment slot="summary">What is PubHub?</svelte:fragment>
		<svelte:fragment slot="content">PubHub is a tool that lets you order your PubMed queries by journal impact factor (JIF), letting you find the most reputable sources first.</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="lead"><HelpCircle /></svelte:fragment>
		<svelte:fragment slot="summary">How do I use it?</svelte:fragment>
		<svelte:fragment slot="content">Take your PubMed query and put it in the search bar to get your content sorted by JIF.</svelte:fragment>
	</AccordionItem>
</Accordion>
