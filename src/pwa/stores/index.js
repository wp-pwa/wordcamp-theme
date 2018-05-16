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
      return self.sessions.get(id);
    },
    track(id) {
      return self.tracks.get(id);
    },
    sessionsOnNow(date) {
      const currentTime = date || new Date();

      return Array.from(self.tracks.values()).map(({ sessions }) => {
        // First, order the sessions of each track by time (reverse ordered)
        const sessionsByTime = sessions.sort((a, b) => {
          const { _wcpt_session_time: timeA } = a.entity.meta;
          const { _wcpt_session_time: timeB } = b.entity.meta;
          return timeB - timeA; // reverse order
        });

        // Then, return the first session
        return sessionsByTime.find(({ entity }) => {
          const { _wcpt_session_time: time } = entity.meta;
          return time < currentTime;
        });
      })
    },
    // sessionsUpNext() {
    //
    // },
    // sessionsBy(track, date, onlyFavourites = false) {
    //
    // }
  }))
  .actions(self => ({
    addSession(session) {
      self.sessions.set(session.entityId, session);
      session.trackIds.forEach(id => {
        // initialize track if it does not exist yet
        if (!self.tracks.has(id)) self.tracks.set(id, { entityId: id });
        self.tracks.get(id).sessionIds.push(session.entityId);
      })
    },
  }));
