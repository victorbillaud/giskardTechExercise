<script>
  import { onMount } from "svelte";
import App from "../App.svelte";
  import { getAvailabilities } from "../lib/handler";
  import Day from "./Day.svelte";
import Slot from "./Slot.svelte";

  $: availabilities = [];

  onMount(async () => {
    availabilities = await getAvailabilities();
  });
</script>

<main>
  <h1>Find a slot</h1>
  {#each availabilities as availability}
    <Day {...availability} />
  {/each}
</main>

<style>
    main{
        width: 50%;
        margin: auto;
    }
</style>
