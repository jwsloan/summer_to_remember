// memoryStore.js
// Reactive store for photo memories using Proxy (see ADR-001)

(function() {
const memoryState = {
  memories: [],
};

const subscribers = new Set();

const store = new Proxy(memoryState, {
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

function addMemory(memory) {
  store.memories = [...store.memories, memory];
}

function setMemories(memories) {
  store.memories = memories;
}

window.s2r = window.s2r || {};
window.s2r.memory = window.s2r.memory || {};
window.s2r.memory.store = store;
window.s2r.memory.addMemory = addMemory;
window.s2r.memory.setMemories = setMemories;
window.s2r.memory.subscribe = subscribe;
})();