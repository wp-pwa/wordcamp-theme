import { onSnapshot, applySnapshot } from 'mobx-state-tree';

export default self => () => {
  const favoritesMap = window.localStorage.getItem('frontity.favoritesMap');
  if (favoritesMap) {
    applySnapshot(self.theme.favoritesMap, JSON.parse(favoritesMap));
  }

  onSnapshot(self.theme.favoritesMap, snapshot => {
    window.localStorage.setItem('frontity.favoritesMap', JSON.stringify(snapshot));
  })
}
