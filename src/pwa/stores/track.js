import { types, getParent } from 'mobx-state-tree';
import Session from './session';

const Id = types.union(types.number, types.string);

const Track = types
  .model('Track')
  .props({
    id: types.identifier(Id),
    sessions: types.optional(types.array(types.reference(types.late(() => Session))), []),
  })
  .views(self => {
    const getConnection = () => getParent(self, 3).connection;
    return {
      get entity() {
        return getConnection().entity('wcb_track', self.id);
      },
      get name() {
        return self.entity.name;
      },
      get sessionsSorted() {
        return self.sessions.sort(({ date: a }, { date: b }) => a.getTime() - b.getTime());
      },
      filteredSessionsOnDate(date) {
        const onlyFavorites = getParent(self, 2).schedule.isFiltered;

        return this.sessionsBy(date, onlyFavorites);
      },
      sessionsBy(date, onlyFavorites = false) {
        const day = new Date(date); // Copy date passed as argument
        day.setHours(0);
        day.setMinutes(0);
        day.setSeconds(0);
        day.setMilliseconds(0);

        const nextDay = new Date(day);
        nextDay.setHours(24);

        return self.sessionsSorted.filter(
          session =>
            (!onlyFavorites || session.isFavorite) && session.date >= day && session.date < nextDay,
        );
      },
      sessionOnNow(date) {
        const currentTime = date || new Date();
        return self
          .sessionsBy(currentTime)
          .reverse()
          .find(({ date: d }) => d < currentTime);
      },
      sessionUpNext(date) {
        const currentTime = date || new Date();
        return self.sessionsSorted.find(({ date: d }) => d > currentTime);
      },
    };
  })
  .actions(self => ({
    addSession(session) {
      if (!self.sessions.includes(session)) self.sessions.push(session);
    },
  }));

export default Track;
