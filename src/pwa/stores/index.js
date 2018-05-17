import { types } from 'mobx-state-tree';
import Menu from './menu';
import Session from './session';
import Track from './track';
import Speaker from './speaker';

export default types
  .model('Wordcamp')
  .props({
    menu: types.optional(Menu, {}),
    sessionsMap: types.optional(types.map(Session), {}),
    tracksMap: types.optional(types.map(Track), {}),
    speakersMap: types.optional(types.map(Speaker), {}),
  })
  .views(self => ({
    get sessions() {
      return Array.from(self.sessionsMap.values());
    },
    get tracks() {
      return Array.from(self.tracksMap.values()).sort((a, b) => a.id - b.id);
    },
    get speakers() {
      return Array.from(self.speakersMap.values());
    },
    session(id) {
      return self.sessionsMap.get(id) || self.sessionsMap.get(id.toString());
    },
    track(id) {
      return self.tracksMap.get(id) || self.tracksMap.get(id.toString());
    },
    speaker(id) {
      return self.speakersMap.get(id) || self.speakersMap.get(id.toString());
    },
    sessionsOnNow(date) {
      return self.tracks.slice(1).map(t => t.sessionOnNow(date)).reduce((all, s) => {
        if (s && !all.includes(s)) all.push(s);
        return all;
      }, []);
    },
    sessionsUpNext(date) {
      return self.tracks.slice(1).map(t => t.sessionUpNext(date)).reduce((all, s) => {
        if (s && !all.includes(s)) all.push(s);
        return all;
      }, []);
    },
  }))
  .actions(self => ({
    addSession({ entityId, trackIds, speakerIds }) {
      const tracks = trackIds.map(id => {
        if (!self.track(id)) self.tracksMap.set(id, { entityId: id });
        return self.track(id);
      });

      const speakers = speakerIds.map(id => {
        if (!self.speaker(id)) self.speakersMap.set(id, { entityId: id });
        return self.speaker(id);
      });

      self.sessionsMap.set(entityId, { entityId, tracks, speakers });
    },
  }));
