import { types, getParent } from 'mobx-state-tree';

export default types
  .model('Announcements')
  .props({
    map: types.optional(types.map(types.boolean), {}),
  })
  .views(self => ({
    get totalNew() {
      return getParent(self, 2)
        .connection.list('latest', 'post')
        .entities.reduce((total, current) => (self.isNew(current.id) ? total + 1 : total), 0);
    },
    isNew(id) {
      const strId = id.toString();
      return self.map.has(strId) ? self.map.get(strId) : false;
    },
  }))
  .actions(self => ({
    set(id, value) {
      const strId = id.toString();
      self.map.set(strId, value);
    },
    markAllAsRead() {
      Array.from(self.map.entries()).forEach(entries => {
        self.set(entries[0], false);
      });
    },
  }));
