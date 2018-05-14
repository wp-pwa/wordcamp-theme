import { types, getParent } from 'mobx-state-tree';
import Menu from './menu';

const Id = types.union(types.number, types.string);

export default types
  .model('Wordcamp')
  .props({
    menu: types.optional(Menu, {}),
    speakersBySession: types.optional(types.map(types.array(types.maybe(Id))), {}),
  })
  .views(self => {
    const getConnection = () => getParent(self).connection;
    return {
      getSpeakersBySession(sessionId) {
        return self.speakersBySession
          .get(sessionId.toString())
          .map(speakerId => getConnection().entity('wcb_speaker', speakerId));
      },
    };
  })
  .actions(self => ({
    addSpeakersBySession(sessionId, speakerIds) {
      self.speakersBySession.set(sessionId, speakerIds);
    },
  }));
