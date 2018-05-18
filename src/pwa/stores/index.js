import { types } from 'mobx-state-tree';
import { values } from 'mobx';
import Menu from './menu';
import Schedule from './schedule';
import Session from './session';
import Track from './track';
import Speaker from './speaker';

export default types
  .model('Wordcamp')
  .props({
    menu: types.optional(Menu, {}),
    schedule: types.optional(Schedule, {}),
    sessionsMap: types.optional(types.map(Session), {}),
    tracksMap: types.optional(types.map(Track), {}),
    speakersMap: types.optional(types.map(Speaker), {}),
  })
  .views(self => ({
    get sessions() {
      return values(self.sessionsMap);
    },
    get tracks() {
      return values(self.tracksMap).sort((a, b) => a.id - b.id);
    },
    get speakers() {
      return values(self.speakersMap);
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
      return self.tracks
        .slice(1) // removes "Networking" track
        .map(t => t.sessionOnNow(date))
        .filter(
          // filters sessions in multiple tracks that are not
          // taking place in all of them (like "Lunch").
          (session, index, sArray) =>
            (session && sArray.filter(s => s === session).length === 1) ||
            sArray.filter(s => s === session).length === sArray.length,
        )
        .reduce((all, s) => {
          if (!all.includes(s)) all.push(s);
          return all;
        }, []);
    },
    sessionsUpNext(date) {
      return self.tracks
        .slice(1) // removes "Networking" track
        .map(t => t.sessionUpNext(date))
        .filter(
          // filters sessions in multiple tracks that are not
          // taking place in all of them (like "Lunch").
          (session, index, sArray) =>
            (session && sArray.filter(s => s === session).length === 1) ||
            sArray.filter(s => s === session).length === sArray.length,
        )
        .reduce((all, s) => {
          if (!all.includes(s)) all.push(s);
          return all;
        }, []);
    },
  }))
  .actions(self => ({
    addSession({ id: sessionId, trackIds, speakerIds }) {
      const tracks = trackIds.map(id => {
        if (!self.track(id)) self.tracksMap.set(id, { id });
        return self.track(id);
      });

      const speakers = speakerIds.map(id => {
        if (!self.speaker(id)) self.speakersMap.set(id, { id });
        return self.speaker(id);
      });

      self.sessionsMap.set(sessionId, { id: sessionId, tracks, speakers });
    },
  }));
