import { types, getParent } from 'mobx-state-tree';

const Id = types.union(types.number, types.string);

// Hours -- correction
const hoursOffset = -2;

const Session = types
  .model('Session')
  .props({
    entityId: types.identifier(Id),
    speakerIds: types.optional(types.array(Id), []),
    trackIds: types.optional(types.array(Id), []),
    categoryIds: types.optional(types.array(Id), []),
  })
  .views(self => {
    const getConnection = () => getParent(self, 3).connection;
    const date = new Date();

    return {
      get entity() {
        return getConnection().entity('wcb_session', self.entityId);
      },
      get speakers() {
        return self.speakerIds.map(id => getConnection().entity('wcb_speaker', id));
      },
      get tracks() {
        return self.trackIds.map(id => getConnection().entity('wcb_track', id));
      },
      get categories() {
        return self.categoryIds.map(id => getConnection().entity('wcb_session_category', id));
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
  });

export default Session;
