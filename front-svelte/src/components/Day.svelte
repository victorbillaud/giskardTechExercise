<script>
  export let day;
  export let slots;

  import Slot from "./Slot.svelte";

</script>

<main>
  <h2>
    {new Date(day).toLocaleString("default", {
      day: "numeric",
      month: "long",
    })}
  </h2>

  <div class="slots">
    {#each slots as slot}
      <Slot {...slot} />
    {/each}
  </div>
</main>

<style>
  main {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 10px;
  }

  h2 {
    margin-top: 10px;
    margin-bottom: 1rem;
    font-family: var(--font-petrona);
  }

  .slots {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
  }

  .slot {
  }
</style>
