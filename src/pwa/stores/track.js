import { types, getParent } from 'mobx-state-tree';
import Session from './session';

const Id = types.union(types.number, types.string);

const Track = types
  .model('Track')
  .props({
    entityId: types.identifier(Id),
    rawSessions: types.optional(types.array(types.reference(types.late(() => Session))), []),
  })
  .views(self => {
    const getConnection = () => getParent(self, 3).connection;
    return {
      get entity() {
        return getConnection().entity('wcb_track', self.entityId);
      },
      get name() {
        return self.entity.name;
      },
      sessions(date, onlyFavorites = false) {
        const day = new Date(date); // Copy date passed as argument
        day.setHours(0);
        day.setMinutes(0);
        day.setSeconds(0);
        day.setMilliseconds(0);

        const nextDay = new Date(day);
        nextDay.setHours(24);

        return self.sessions
          .sort(({ date: a }, { date: b }) => a.getTime() - b.getTime())
          .filter(
            session =>
              (!onlyFavorites || session.isFavorite) &&
              session.date >= day &&
              session.date < nextDay,
          );
      },
      sessionOnNow(date) {
        const currentTime = date || new Date();
        return self.sessions(currentTime).reverse().find(({ date: d }) => d < currentTime);
      },
      sessionUpNext(date) {
        const currentTime = date || new Date();
        return self.sessions(currentTime).find(({ date: d }) => d > currentTime);
      },
    };
  });

export default Track;
