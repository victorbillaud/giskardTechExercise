<script>
  import { Router, Route, Link } from "svelte-navigator";

  export let id;
  export let start;
  export let end;
</script>

<Link to={"/book/" + id} >
  <div class="slot">
    {new Date(start).toLocaleString("default", {
      hour: "2-digit",
      minute: "2-digit",
    })} - {new Date(end).toLocaleString("default", {
      hour: "2-digit",
      minute: "2-digit",
    })}
  </div>
  
</Link>

<style>
  .slot {
    cursor: pointer;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-right: 0.5rem;
    background-color: rgba(22, 58, 48, 0.5);
    color: white;
  }
</style>
