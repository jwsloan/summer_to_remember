describe('memoryStore', () => {
  beforeEach(() => {
    window.s2r.memory.setMemories([]);
  });

  it('should start with empty memories', () => {
    expect(window.s2r.memory.store.memories).to.deep.equal([]);
  });

  it('should add a memory', () => {
    window.s2r.memory.addMemory({ title: 'Photo', date: '2024-06-15' });
    expect(window.s2r.memory.store.memories).to.have.lengthOf(1);
    expect(window.s2r.memory.store.memories[0].title).to.equal('Photo');
  });

  it('should set memories', () => {
    const mems = [
      { title: 'A', date: '2024-06-15' },
      { title: 'B', date: '2024-06-16' }
    ];
    window.s2r.memory.setMemories(mems);
    expect(window.s2r.memory.store.memories).to.deep.equal(mems);
  });

  it('should notify subscribers on change', () => {
    let called = false;
    const unsub = window.s2r.memory.subscribe(() => { called = true; });
    window.s2r.memory.addMemory({ title: 'C', date: '2024-06-17' });
    expect(called).to.equal(true);
    unsub();
  });
}); 