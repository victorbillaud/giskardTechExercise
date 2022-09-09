<script>
  import { Router, Route, Link } from "svelte-navigator";

  export let name;
  import CalendarView from "./components/CalendarView.svelte";
  import BookingView from "./components/BookingView.svelte";
</script>

<main>
  <div class="container-left">
    <img src="/62983fa8ef716259c397a57d_logo.svg" width="300" alt="" />
  </div>
  <div class="container-right">
    <Router>
      <Route path="/">
        <CalendarView />
      </Route>
      <Route path="book/*id">
        <BookingView />
      </Route>
    </Router>
  </div>
</main>

<style>
  main {
    text-align: center;
    max-width: 240px;
    margin: 0 auto;
    display: flex;
    height: 100%;
  }

  h1 {
    color: #163a30;
    font-size: 3em;
    font-weight: 700;
  }

  .container-left {
    width: 40vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: start;
    align-items: center;
  }

  .container-left img {
    max-width: 100%;
  }

  .container-right {
    width: 60vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: start;
    align-items: center;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
