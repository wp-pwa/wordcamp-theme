import { types } from 'mobx-state-tree';
import Menu from './menu';
import Session from './session';
import Track from './track';
import Speaker from './speaker';

export default types
  .model('Wordcamp')
  .props({
    menu: types.optional(Menu, {}),
    sessions: types.optional(types.map(Session), {}),
    tracks: types.optional(types.map(Track), {}),
    speakers: types.optional(types.map(Speaker), {}),
  })
  .views(self => ({
    session(id) {
      return self.sessions.get(id) || self.sessions.get(id.toString());
    },
    track(id) {
      return self.tracks.get(id) || self.tracks.get(id.toString());
    },
    speaker(id) {
      return self.speakers.get(id) || self.speakers.get(id.toString());
    },
    sessionsOnNow(date) {
      return Array.from(
        new Set([...self.tracks.values()].slice(1).map(t => t.sessionOnNow(date))).values(),
      );
    },
    sessionsUpNext(date) {
      return [
        ...new Set([...self.tracks.values()].slice(1).map(t => t.sessionUpNext(date))).values(),
      ];
    },
  }))
  .actions(self => ({
    addSession({ entityId, trackIds, speakerIds }) {
      const tracks = trackIds.map(id => {
        if (!self.track(id)) self.tracks.set(id, { entityId: id });
        return self.track(id);
      });

      const speakers = speakerIds.map(id => {
        if (!self.speaker(id)) self.speakers.set(id, { entityId: id });
        return self.speaker(id);
      });

      self.sessions.set(entityId, { entityId, tracks, speakers });
    },
  }));
