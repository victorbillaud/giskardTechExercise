<script>
  import { onMount } from "svelte";
  import {
    Router,
    Route,
    Link,
    useNavigate,
    useLocation,
  } from "svelte-navigator";
  import { getOneAvailability } from "../lib/handler";
  const navigate = useNavigate();
  const location = useLocation();
  $: slot = null;
  $: timeInterval = [];
  $: start = "";
  $: end = "";

  onMount(async () => {
    slot = await getOneAvailability($location.pathname.split("/")[2]);
    console.log(
      slot,
      new Date(slot.start).getHours(),
      new Date(slot.end).getHours()
    );
    timeInterval = makeArrayOfTimes(
      new Date(slot.start).getHours(),
      new Date(slot.end).getHours()
    );
    start = timeInterval[0];
    end = timeInterval[timeInterval.length - 1];
  });

  function makeArrayOfTimes(startHour, endHour) {
    const times = [];
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        times.push(`${hour}:${minute < 10 ? "0" : ""}${minute}`);
      }
    }
    times.push(`${endHour}:00`);
    return times;
  }

  let title = "";
  let email = "";
</script>

<main>
  <button class="back-button" title="Go back" on:click={() => navigate(-1)}>
    <img src="/arrow-left.svg" alt="" />
  </button>
  <Router>
    <Route path=":id" let:params>
      <h2>Book a slot</h2>
      <h3>
        {new Date(slot?.start).toLocaleString("default", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </h3>

      <div class="form">
        <p>Start at</p>
        <select name="start" id="" bind:value={start}>
          {#each timeInterval.slice( 0, timeInterval.findIndex((time) => time === end) ) as time}
            <option value={time}>{time}</option>
          {/each}
        </select>
        <p>end at</p>
        <select name="end" id="" bind:value={end}>
          {#each timeInterval.slice(timeInterval.findIndex((time) => time === start)) as time}
            <option value={time}>{time}</option>
          {/each}
        </select>
      </div>
      <div class="separator" />
      <div class="form-vertical">
        <input
          type="text"
          class="form-control"
          id="email"
          placeholder="Find a title for your meeting"
          bind:value={title}
        />
      </div>
      <div class="separator" />
      <div class="form-vertical">
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="Enter your email"
          bind:value={email}
        />
      </div>
      <button
        class="btn btn-primary"
        on:click={() => {
          console.log("booked");
        }}>Book</button
      >
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
    position: relative;
  }

  .separator {
    width: 60%;
    height: 1px;
    background-color: #e0e0e0;
    margin: 1rem 0;
  }

  .form {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-family: var(--font-petrona);
  }

  .form-vertical {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: start;
  }

  .form p {
    font-size: 1.2em;
  }

  h3 {
    font-family: var(--font-petrona);
    font-style: italic;
  }

  h4 {
    font-weight: 600;
  }
  input {
    font-family: "Poppins", sans-serif;
    border: none;
    outline: none;
    width: 100%;
    font-size: 1.2em;
    padding: 0;
    font-family: var(--font-petrona);
  }

  select {
    appearance: none;
    background-color: transparent;
    font-family: var(--font-petrona);
    cursor: pointer;
    outline: none;
    border: none;
    font-weight: 700;
    font-size: 1.2em;
    color: black;
  }

  .back-button {
    position: absolute;
    top: 0%;
    left: 0%;
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    outline: none;
    border-radius: 5px;
    margin-right: 0.5rem;
  }

  button {
    padding: 1em;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1.4em;
    font-family: var(--font-petrona);
    background-color: transparent;
    font-style: italic;
    font-weight: 800;
  }

</style>
