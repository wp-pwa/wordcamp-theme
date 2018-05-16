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
      return self.sessions.get(id.toString());
    },
    track(id) {
      return self.tracks.get(id.toString());
    },
    speaker(id) {
      return self.speakers.get(id.toString());
    },
  }))
  .actions(self => ({
    addSession({ entityId, trackIds, speakerIds }) {
      const tracks = trackIds.map(id => {
        const strId = id.toString();
        if (!self.tracks.has(strId)) self.tracks.set(strId, { entityId: id });
        return self.tracks.get(strId);
      });

      const speakers = speakerIds.map(id => {
        const strId = id.toString();
        if (!self.speakers.has(strId)) self.speakers.set(strId, { entityId: id });
        return self.speakers.get(strId);
      });

      self.sessions.set(entityId.toString(), { entityId, tracks, speakers });
    },
  }));
