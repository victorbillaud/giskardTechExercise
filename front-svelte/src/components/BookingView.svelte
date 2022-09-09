<script>
  import { Router, Route, Link, useNavigate } from "svelte-navigator";
  const navigate = useNavigate();

  let title = "";
  let email = "";
  let start = "";
  let end = "";
</script>

<main>
  <button title="Go back" on:click={() => navigate(-1)}>&lt;-</button>
  <Router>
    <Route path=":id" let:params>
      <div>{params.id}</div>

      <div class="form">
        <input
          type="text"
          class="form-control"
          id="email"
          placeholder="Title"
          bind:value={title}
        />

        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="Email"
          bind:value={email}
        />
      </div>
    </Route>
  </Router>
</main>

<style>
  main {
    width: 50%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: start;
    align-items: center;
  }

  input {
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    outline: none;
    padding: 0.8em;
    border: none;
    box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    margin-right: 0.5rem;
    background-color: rgba(22, 58, 48, 0.05);
    color: black;
  }
</style>
