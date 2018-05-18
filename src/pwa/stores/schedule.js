import { types, getParent } from 'mobx-state-tree';
import Track from './track';

export default types
  .model('Schedule')
  .props({
    selected: types.maybe(types.reference(Track)),
    isFiltered: types.optional(types.boolean, false),
  })
  .views(self => ({
    get options() {
      return getParent(self).tracks.filter(track => track.name !== 'Networking');
    },
  }))
  .actions(self => ({
    setSelected(track) {
      self.selected = track;
    },
    selectTrack(value) {
      const track = getParent(self).tracks.find(t => t.name === value);
      if (self.selected !== track) self.selected = track;
    },
    toggleFilter() {
      self.isFiltered = !self.isFiltered;
    },
  }));
