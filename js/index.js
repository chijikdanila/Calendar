function switching() {
    let calendar = document.getElementById('calendar');
    let events = document.getElementById('events');

    if (calendar.classList.contains('block')) {
        calendar.classList.remove('block');
        calendar.classList.add('none');
    }
    else if (calendar.classList.contains('none')) {
        calendar.classList.remove('none');
        calendar.classList.add('block');
    }

    if (events.classList.contains('block')) {
        events.classList.remove('block');
        events.classList.add('none');
    }
    else if (events.classList.contains('none')) {
        events.classList.remove('none');
        events.classList.add('block');
    }
}
