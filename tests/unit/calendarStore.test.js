describe('calendarStore', () => {
  beforeEach(() => {
    window.s2r.calendar.setEvents([]);
  });

  it('should start with empty events', () => {
    expect(window.s2r.calendar.store.events).to.deep.equal([]);
  });

  it('should add an event', () => {
    window.s2r.calendar.addEvent({ title: 'Test Event', date: '2024-06-15' });
    expect(window.s2r.calendar.store.events).to.have.lengthOf(1);
    expect(window.s2r.calendar.store.events[0].title).to.equal('Test Event');
  });

  it('should set events', () => {
    const evs = [
      { title: 'A', date: '2024-06-15' },
      { title: 'B', date: '2024-06-16' }
    ];
    window.s2r.calendar.setEvents(evs);
    expect(window.s2r.calendar.store.events).to.deep.equal(evs);
  });

  it('should notify subscribers on change', () => {
    let called = false;
    const unsub = window.s2r.calendar.subscribe(() => { called = true; });
    window.s2r.calendar.addEvent({ title: 'C', date: '2024-06-17' });
    expect(called).to.equal(true);
    unsub();
  });
}); 