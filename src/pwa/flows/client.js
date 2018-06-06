import { values } from 'mobx';
import { onSnapshot, applySnapshot, addMiddleware } from 'mobx-state-tree';

const announcementsMiddleware = theme => (call, next) => {
  if (call.name === 'addEntity' && call.args[0].entity.type === 'post') {
    theme.announcements.set(call.args[0].entity.id, false);
  }

  next(call);
};

export default self => () => {
  // Rehydrate favorites.
  const favoritesMap = window.localStorage.getItem('frontity.favoritesMap');
  if (favoritesMap) {
    applySnapshot(self.theme.favoritesMap, JSON.parse(favoritesMap));
  }

  // Save favorites to localStorage.
  onSnapshot(self.theme.favoritesMap, snapshot => {
    window.localStorage.setItem('frontity.favoritesMap', JSON.stringify(snapshot));
  });

  // Rehydrate announcements.
  const announcementsMap = window.localStorage.getItem('frontity.announcementsMap');
  if (announcementsMap) {
    applySnapshot(self.theme.announcements.map, JSON.parse(announcementsMap));
  }

  // Save announcements to localStorage.
  onSnapshot(self.theme.announcements.map, snapshot => {
    window.localStorage.setItem('frontity.announcementsMap', JSON.stringify(snapshot));
  });

  // Initialize announcements.
  const announcementsIds = values(self.connection.list('latest', 'post').entities).map(
    entity => entity.id,
  );
  announcementsIds.forEach(id => {
    if (!self.theme.announcements.map.has(id)) {
      self.theme.announcements.set(id, true);
    }
  });

  // Run middleware to set new announcements.
  addMiddleware(self.connection, announcementsMiddleware(self.theme));

  // Starts to modify current time
  self.theme.toggleRealTime();

  // Sets global functions to change current time
  window.setTime = self.theme.setTime;
  window.toggleRealTime = self.theme.toggleRealTime;
};
