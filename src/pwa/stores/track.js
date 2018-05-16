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
    const getTheme = () => getParent(self, 3).theme;
    return {
      get entity() {
        return getConnection().entity('wcb_track', self.entityId);
      },
      get sessions() {
        return self.sessionIds
          .map(id => getTheme().session(id))
          .sort(({ date: a }, { date: b }) => a.getTime() - b.getTime());
      },
      sessionsByDay(date) {
        const day = new Date(date); // Copy date passed as argument
        day.setHours(0);
        day.setMinutes(0);
        day.setSeconds(0);
        day.setMilliseconds(0);

        const nextDay = new Date(day);
        nextDay.setHours(24);

        return self.sessions.filter(session => session.date >= day && session.date < nextDay);
      },
      sessionOnNow(date) {
        const currentTime = date || new Date();
        return self.sessions.reverse().find(({ date: d }) => d < currentTime);
      },
      sessionUpNext(date) {
        const currentTime = date || new Date();
        return self.sessions.find(({ date: d }) => d > currentTime);
      },
    };
  });

export default Track;
