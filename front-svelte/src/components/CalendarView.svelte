<script>
    import { onMount } from "svelte";
    import {getAvailabilities} from "../lib/handler";

    $: availabilities = [];

    onMount(async () => {
        availabilities = await getAvailabilities();
    });
</script>

<main>
    <h1>Find a slot</h1>
    <ul>
        {#each availabilities as availability}
            <li>{availability.start}</li>
        {/each}
    </ul>
</main>



