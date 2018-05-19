import { types } from 'mobx-state-tree';
import { values } from 'mobx';
import { now } from 'mobx-utils';
import Menu from './menu';
import Schedule from './schedule';
import Session from './session';
import Track from './track';
import Speaker from './speaker';

const NOW_INTERVAL = 60000; // One minute

const Favorite = types.model('Favorite', {
  val: true,
});

export default types
  .model('Wordcamp')
  .props({
    menu: types.optional(Menu, {}),
    schedule: types.optional(Schedule, {}),
    sessionsMap: types.optional(types.map(Session), {}),
    tracksMap: types.optional(types.map(Track), {}),
    speakersMap: types.optional(types.map(Speaker), {}),
    favoritesMap: types.optional(types.map(Favorite), {}),
    time: types.optional(types.Date, Date.now()),
    isRealTime: false,
  })
  .views(self => {
    const filterSessions = mapFunction =>
      self.tracks
        .sort((a, b) => a.id - b.id) // sorts tracks by id
        .slice(1) // removes "Networking" track
        .map(mapFunction)
        // filters sessions in multiple tracks that are not
        // taking place in all of them (like "Lunch").
        .filter((session, index, sArray) => {
          const count = sArray.filter(s => s === session).length;
          return !!session && (count === 1 || count === sArray.length);
        })
        // removes repetitions
        .reduce((all, s) => {
          if (!all.includes(s)) all.push(s);
          return all;
        }, []);

    return {
      get sessions() {
        return values(self.sessionsMap);
      },
      get tracks() {
        return values(self.tracksMap);
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
      get currentTime() {
        return self.isRealTime ? now(NOW_INTERVAL) : self.time;
      },
      get sessionsOnNow() {
        return filterSessions(t => t.sessionOnNow(self.currentTime));
      },
      get sessionsUpNext() {
        return filterSessions(t => t.sessionUpNext(self.currentTime));
      },
    };
  })
  .actions(self => ({
    toggleFavorite(id) {
      if (self.favoritesMap.get(id)) {
        self.favoritesMap.get(id).val = !self.favoritesMap.get(id).val;
      } else {
        self.favoritesMap.set(id, { val: true });
      }
    },
    createSession(session) {
      // Init tracks
      if (session.tracks)
        session.tracks.forEach(id => {
          if (!self.track(id)) self.tracksMap.set(id, { id });
        });

      // Init speakers
      if (session.speakers)
        session.speakers.forEach(id => {
          if (!self.speaker(id)) self.speakersMap.set(id, { id });
        });
      self.sessionsMap.set(session.id, session);
    },
    setTime(day = 1, hour = 0, minutes = 0) {
      const pad = n => `${n}`.padStart(2, '0');
      self.isRealTime = false;
      self.time = new Date(`2018-06-${pad(day)}T${pad(hour)}:${pad(minutes)}:00+02:00`);
    },
    toggleRealTime() {
      self.isRealTime = !self.isRealTime;
    },
  }));
