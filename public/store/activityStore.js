// activityStore.js
// Reactive store for activities using Proxy (see ADR-001)

(function() {
const activityState = {
  activities: [],
};

const subscribers = new Set();

const store = new Proxy(activityState, {
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

function addActivity(activity) {
  store.activities = [...store.activities, activity];
}

function setActivities(activities) {
  store.activities = activities;
}

window.activityStore = store;
window.addActivity = addActivity;
window.setActivities = setActivities;
window.subscribe = subscribe;
})();
