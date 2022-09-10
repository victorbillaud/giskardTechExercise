<script>
  import { onMount } from "svelte";
  import {
    Router,
    Route,
    Link,
    useNavigate,
    useLocation,
  } from "svelte-navigator";
  import { getOneAvailability, createReservation } from "../lib/handler";

  const navigate = useNavigate();
  const location = useLocation();
  $: slot = null;
  $: timeInterval = [];
  $: start = "";
  $: end = "";
  let title = "";
  let email = "";

  onMount(async () => {
    // Get the slot data from the back
    slot = await getOneAvailability($location.pathname.split("/")[2]);
    // Create an array of time intervals (15 minutes in this case)
    timeInterval = makeArrayOfTimes(
      new Date(slot.start).getHours(),
      new Date(slot.end).getHours()
    );
    // Set the start and end time of the slot to the first and last time interval
    start = timeInterval[0];
    end = timeInterval[timeInterval.length - 1];
  });

  async function createBooking() {
    if (title == "" || email == "") {
      alert("Please fill in all the fields");
      return;
    }
    // Create a new reservation with a call to the back
    const response = await createReservation({
      id: slot.id,
      title: title,
      email: email,
      start: new Date(slot.start).setHours(start.split(":")[0], start.split(":")[1]),
      end: new Date(slot.end).setHours(end.split(":")[0], end.split(":")[1]),
    });
    // Redirect with the right page depends of return statement
    response.state ? navigate("/book/success") : navigate("/book/error"); 
  }

  // Function to create an array of time intervals
  function makeArrayOfTimes(startHour, endHour) {
    const times = [];
    if (startHour == endHour) {
      for (let minute = 0; minute < 60; minute += 15) {
        times.push(`${startHour}:${minute < 10 ? "0" : ""}${minute}`);
      }
      return times;
    } else {
      for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
          times.push(`${hour}:${minute < 10 ? "0" : ""}${minute}`);
        }
      }
      times.push(`${endHour}:00`);
      console.log(times);
      return times;
    }
  }
</script>

<main>
  <Router>
    <Route path="/success">
      <h1>Success!</h1>
      <div class="success">
        <p>Your booking has been created.</p>
        <Link to="/">Go back to the home page</Link>
      </div>
    </Route>
    <Route path="/fail">
      <h1>Error...</h1>
      <div class="success">
        <p>Your booking wasn't created, please retry.</p>
        <Link to="/">Go back to the home page</Link>
      </div>
    </Route>
    <Route path=":id" let:params>
      <button class="back-button" title="Go back" on:click={() => navigate(-1)}>
        <img src="/arrow-left.svg" alt="" />
      </button>
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
          {#each timeInterval.slice(timeInterval.findIndex((time) => time === start) + 1) as time}
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
          createBooking();
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

  .success {
    font-family: var(--font-petrona);
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
