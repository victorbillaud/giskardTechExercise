<script>
  export let id;
  export let start;
  export let end;
</script>

<div class="slot">
  {new Date(start).toLocaleString("default", {
    hour: "2-digit",
    minute: "2-digit",
  })} - {new Date(end).toLocaleString("default", {
    hour: "2-digit",
    minute: "2-digit",
  })}
</div>

<style>
    .slot {
        padding: .5rem;
        border: 1px solid #ccc;
        border-radius: 10px;
        margin-right: .5rem;
        background-color: rgba(22, 58, 48, .5);
        color: white;
    }
</style>
