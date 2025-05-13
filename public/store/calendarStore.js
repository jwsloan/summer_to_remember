// calendarStore.js
// Reactive store for calendar events using Proxy (see ADR-001)

(function() {
const calendarState = {
  events: [],
};

const subscribers = new Set();

const store = new Proxy(calendarState, {
  set(target, prop, value) {
    target[prop] = value;
    subscribers.forEach((cb) => cb(store));
    return true;
  },
});

function subscribe(cb) {
  subscribers.add(cb);
  return () => subscribers.delete(cb);
}

function addEvent(event) {
  store.events = [...store.events, event];
}

function setEvents(events) {
  store.events = events;
}

window.s2r = window.s2r || {};
window.s2r.calendar = window.s2r.calendar || {};
window.s2r.calendar.store = store;
window.s2r.calendar.addEvent = addEvent;
window.s2r.calendar.setEvents = setEvents;
window.s2r.calendar.subscribe = subscribe;
})();