describe('activityStore', () => {
  beforeEach(() => {
    window.setActivities([]);
  });

  it('should start with empty activities', () => {
    expect(window.activityStore.activities).to.deep.equal([]);
  });

  it('should add an activity', () => {
    window.addActivity({ title: 'Test', dueDate: '2024-06-15' });
    expect(window.activityStore.activities).to.have.lengthOf(1);
    expect(window.activityStore.activities[0].title).to.equal('Test');
  });

  it('should set activities', () => {
    const acts = [
      { title: 'A', dueDate: '2024-06-15' },
      { title: 'B', dueDate: '2024-06-16' }
    ];
    window.setActivities(acts);
    expect(window.activityStore.activities).to.deep.equal(acts);
  });

  it('should notify subscribers on change', () => {
    let called = false;
    const unsub = window.subscribe(() => { called = true; });
    window.addActivity({ title: 'C', dueDate: '2024-06-17' });
    expect(called).to.equal(true);
    unsub();
  });
}); 