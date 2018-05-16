import { types } from 'mobx-state-tree';
import Menu from './menu';
import Session from './session';
import Track from './track';

export default types
  .model('Wordcamp')
  .props({
    menu: types.optional(Menu, {}),
    sessions: types.optional(types.map(Session), {}),
    tracks: types.optional(types.map(Track), {}),
  })
  .views(self => ({
    session(id) {
      return self.sessions.get(id.toString());
    },
    track(id) {
      return self.tracks.get(id.toString());
    },
    trackByName(name) {
      return Array.from(self.tracks.values()).find(({ entity }) => entity.name === name);
    },
    sessionsOnNow(date) {
      return Array.from(self.tracks.values()).map(track => track.sessionOnNow(date));
    },
    sessionsUpNext(date) {
      return Array.from(self.tracks.values()).map(track => track.sessionUpNext(date));
    },
  }))
  .actions(self => ({
    addSession(session) {
      self.sessions.set(session.entityId.toString(), session);
      session.trackIds.forEach(trackId => {
        // initialize track if it does not exist yet
        const id = trackId.toString(); // normalize id
        if (!self.tracks.has(id)) self.tracks.set(id.toString(), { entityId: id });
        self.tracks.get(id).sessionIds.push(session.entityId);
      });
    },
  }));
