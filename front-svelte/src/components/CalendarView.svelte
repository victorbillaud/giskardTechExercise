<script>
    import Calendar from '@event-calendar/core';

    let plugins = []
    let options = {
        view: 'timeGridWeek',
        events: [
            // your list of events
        ]
    };
</script>

<Calendar {plugins} {options} />