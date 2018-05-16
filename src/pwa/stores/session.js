import { types, getParent } from 'mobx-state-tree';
import Speaker from './speaker';
import Track from './track';

const Id = types.union(types.number, types.string);

// Hours -- correction - Take it from database
const hoursOffset = -2;

const Session = types
  .model('Session')
  .props({
    entityId: types.identifier(Id),
    speakers: types.optional(types.array(types.reference(types.late(() => Speaker))), []),
    tracks: types.optional(types.array(types.reference(types.late(() => Track))), []),
  })
  .views(self => {
    const getConnection = () => getParent(self, 3).connection;
    const date = new Date();

    return {
      get entity() {
        return getConnection().entity('wcb_session', self.entityId);
      },
      get title() {
        return self.entity.title;
      },
      get link() {
        return self.entity.link;
      },
      get time() {
        const { _wcpt_session_time: time } = self.entity.meta;
        return (time + hoursOffset * 3600) * 1000; // seconds to milliseconds
      },
      get date() {
        date.setTime(self.time);
        return date;
      },
    };
  })
  .actions(self => ({
    afterCreate() {
      self.speakers.forEach(s => s.sessions.includes(self) || s.sessions.push(self));
      self.tracks.forEach(s => s.rawSessions.includes(self) || s.rawSessions.push(self));
    },
  }));

export default Session;
