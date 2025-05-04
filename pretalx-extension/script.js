let currentEventStartOverride = null;

// Intercept fetch requests
(function() {
  const originalFetch = window.fetch;

  window.fetch = async function(input, init) {
    if (typeof input === 'string') {
      const method = init?.method;
      if (method?.toUpperCase() === 'PATCH') {
        if (input.includes('/schedule/api/talks/')) {
          console.log('Intercepting session PATCH request')

          if (currentEventStartOverride) {
            console.log('Overriding start and end date')
            const body = JSON.parse(init.body);
            console.log(body);

            const currentStart = new Date(body.start);
            console.log(currentStart);

            const hours = parseInt(currentEventStartOverride.split(':')[0]);
            const minutes = parseInt(currentEventStartOverride.split(':')[1]);
            console.log({ hours, minutes });

            currentStart.setHours(hours);
            currentStart.setMinutes(minutes);
            console.log(currentStart);

            body.start = currentStart.toISOString();
            const end = new Date(currentStart.getTime() + 1000 * 60 * body.duration);
            body.end = end.toISOString();

            console.log(body);

            init.body = JSON.stringify(body);
          }
        }
      }
    }


    return originalFetch(input, init);
  };
})();

const addElementsToModal = (e) => {
  if (e.target.nodeName === 'DIV' && e.target.id === 'session-editor-wrapper') {
    startDateString = null;

    console.log('Found session editor');

    // Get data div
    const dataDiv = e.target.querySelector('.data');

    // Add fields
    const startField = document.createElement('div');
    startField.className = 'data-row form-control form-group row';
    startField.innerHTML = `
        <label class="data-label col-form-label col-md-3">Start Time Override</label>
        <div class="col-md-9 number">
            <input type="time" required>
        </div>`;
    startField.querySelector('input').addEventListener('change', (e) => {
      currentEventStartOverride = e.target.value;
    });

    dataDiv.appendChild(startField);
  }
}

const init = () => {
  const mainWrapper = document.getElementById('main-wrapper')
  if (mainWrapper) {
    console.log('Adding listener')
    addEventListener('DOMNodeInserted', addElementsToModal);
  }
}

// Add event listener for when dom is added to main-wrapper
window.addEventListener("load", (event) => {
  // init();
});

init();