import { onSnapshot, applySnapshot } from 'mobx-state-tree';

export default self => () => {
  const favoritesMap = window.localStorage.getItem('frontity.favoritesMap');
  if (favoritesMap) {
    applySnapshot(self.theme.favoritesMap, JSON.parse(favoritesMap));
  }

  onSnapshot(self.theme.favoritesMap, snapshot => {
    window.localStorage.setItem('frontity.favoritesMap', JSON.stringify(snapshot));
  });

  // Starts to modify global time
  self.theme.restartTime();
  // Sets global functions to change global time
  window.setTime = self.theme.setTime; // .bind(self.theme);
  window.restartTime = self.theme.restartTime; // .bind(self.theme);
};
