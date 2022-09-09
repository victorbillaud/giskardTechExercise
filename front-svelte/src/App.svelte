<script>
  import { Router, Route, Link } from "svelte-navigator";

  export let name;
  import CalendarView from "./components/CalendarView.svelte";
  import BookingView from "./components/BookingView.svelte";
</script>

<main>
  <div class="container-left">
    <h1>Find a slots</h1>
    <img src="/62a0938795a46b56e6dca5c3_Giskard_Turtle_Lab.png" alt="" />
  </div>
  <div class="container-right">
    <Router>
      <Route path="/">
        <CalendarView />
      </Route>
      <Route path="book/*">
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
