import { values } from 'mobx';
import { onSnapshot, applySnapshot, addMiddleware } from 'mobx-state-tree';

const announcementsMiddleware = theme => (call, next) => {
  if (call.name === 'addEntity') {
    const { id, type } = call.args[0].entity;
    const strId = id.toString();

    if (type === 'post') {
      if (!theme.announcements.map.has(strId)) theme.announcements.set(strId, true);
    }
  } else if (call.name === 'routeChangeSucceed') {
    const { type, id } = call.args[0].selectedItem;
    const strId = id.toString();

    if (type === 'post') theme.announcements.set(strId, false);
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
    const strId = id.toString();

    if (self.connection.selectedItem.type === 'post' && self.connection.selectedItem.id === id) {
      self.theme.announcements.set(strId, false);
    } else if (!self.theme.announcements.map.has(strId)) {
      self.theme.announcements.set(strId, true);
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
