import { types } from 'mobx-state-tree';

export default types
  .model('Announcements')
  .props({
    map: types.optional(types.map(types.boolean), {}),
  })
  .views(self => ({
    get totalNew() {
      return Array.from(self.map.values()).reduce(
        (total, current) => (!current ? total + 1 : total),
        0,
      );
    },
    isNew(id) {
      return self.map.has(id) ? self.map.get(id) : false;
    },
  }))
  .actions(self => ({
    set(id, value) {
      self.map.set(id, value);
    },
  }));
