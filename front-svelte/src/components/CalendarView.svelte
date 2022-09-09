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
  <h1>Find a <span>Slot</span></h1>
  <p>You can now make an appointment with Giskard, here are the available schedules below.</p>
  {#each availabilities as availability}
    <Day {...availability} />
    <div class="separator" />
  {/each}
</main>

<style>
  main {
    width: 50%;
    height: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: start;
    align-items: center;
  }
  .separator {
    width: 100%;
    height: 1px;
    background-color: #e0e0e0;
  }

  h1 span {
    font-family: var(--font-petrona);
    font-style: italic;
  }

  p {
    font-family: var(--font-petrona);
    font-style: italic;
    font-size: 1.2em;
    color: #163a30;
    margin: 0;
  }

</style>
