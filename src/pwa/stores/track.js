import { types, getParent } from 'mobx-state-tree';

const Id = types.union(types.number, types.string);

const Track = types
  .model('Track')
  .props({
    entityId: types.identifier(Id),
    sessionIds: types.optional(types.array(Id), []),
  })
  .views(self => {
    const getConnection = () => getParent(self, 3).connection;
    return {
      get entity() {
        return getConnection().entity('wcb_track', self.entityId);
      },
      get sessions() {
        return self.sessionIds.map(id => getConnection().entity('wcb_session', id));
      },
    };
  });

export default Track;
