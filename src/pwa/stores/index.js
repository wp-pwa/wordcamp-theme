import { types } from 'mobx-state-tree';
import Menu from './menu';
import Session from './session';

export default types
  .model('Wordcamp')
  .props({
    menu: types.optional(Menu, {}),
    sessions: types.optional(types.map(Session), {}),
  })
  .views(self => ({
    session(id) {
      return self.sessions.get(id);
    },
  }))
  .actions(self => ({
    addSession(session) {
      self.sessions.set(session.entityId, session);
    },
  }));
