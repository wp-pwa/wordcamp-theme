import { flow, addMiddleware } from 'mobx-state-tree';
import { homeContext, venueContext, announcementsContext, creditsContext } from '../contexts';

const extractId = href => /\/(\d+)$/g.exec(href)[1];

const sessionMiddleware = (call, next) => {
  if (call.name === 'addEntity') {
    const [{ entity }] = call.args;

    if (entity.type === 'wcb_session') {
      const { theme } = call.tree;

      const {
        id,
        session_track: tracks,
        session_category: categories,
        _links: { speakers: speakerHrefs = [] },
      } = entity;

      const speakers = speakerHrefs.map(({ href }) => parseInt(extractId(href), 10));

      theme.createSession({ id, tracks, categories, speakers });
    }
  }
  next(call);
};

export default self =>
  flow(function* ThemeServer({ selectedItem }) {
    addMiddleware(self, sessionMiddleware);

    const { type, id, page } = selectedItem;
    const action = { selectedItem: { type, id, page } };

    if (type === 'page') {
      if ([23, 26, 28, 30, 32, 34].includes(id)) action.context = venueContext;
      else if (id === 36) action.context = creditsContext;
      else action.context = homeContext;
    } else if (type === 'latest' && id === 'post') {
      action.context = announcementsContext;
    } else {
      action.context = homeContext;
    }

    self.connection.routeChangeSucceed(action);

    yield Promise.all([
      self.connection.fetchCustomPage({
        name: 'sessions',
        type: 'wcb_session',
        page: 1,
        params: { per_page: 100, _embed: false },
      }),
      self.connection.fetchCustomPage({
        name: 'speakers',
        type: 'wcb_speaker',
        page: 1,
        params: { per_page: 100, _embed: false },
      }),
      self.connection.fetchCustomPage({
        name: 'tracks',
        type: 'wcb_track',
        page: 1,
        params: { per_page: 100, _embed: false },
      }),
      self.connection.fetchCustomPage({
        name: 'pages',
        type: 'page',
        page: 1,
        params: {
          per_page: 100,
          _embed: false,
          include: '13, 15, 17, 19, 23, 26, 28, 30, 32, 34, 36',
        },
      }),
    ]);

    const track = self.theme.tracks.find(t => t.name === 'Milky Way Track') || self.theme.tracks[0];
    self.theme.schedule.setSelected(track);

    const allTrackIds = self.theme.tracks.map(t => t.id);

    // Adds custom sessions
    const before = {
      type: 'page',
      id: 1101101101,
      sessionTitle: 'BEFORE',
      sessionTimestamp: new Date('2018-05-01T00:00:00+02:00').getTime(),
      tracks: allTrackIds,
    };
    const contributors = {
      type: 'page',
      id: 1101101102,
      sessionTitle: 'CONTRIBUTORS',
      sessionTimestamp: new Date('2018-06-14T08:00:00+02:00').getTime(), // check time
      tracks: allTrackIds,
    };
    const thursdayNight = {
      type: 'page',
      id: 1101101103,
      sessionTitle: 'THURSDAY NIGHT',
      sessionTimestamp: new Date('2018-06-14T18:00:00+02:00').getTime(), // check time
      tracks: allTrackIds,
    };
    const fridayNight = {
      type: 'page',
      id: 1101101104,
      sessionTitle: 'FRIDAY NIGHT',
      sessionTimestamp: new Date('2018-06-15T18:00:00+02:00').getTime(), // check time
      tracks: allTrackIds,
    };
    const afterParty = {
      type: 'page',
      id: 1101101105,
      sessionTitle: 'AFTER PARTY',
      sessionTimestamp: new Date('2018-06-16T20:00:00+02:00').getTime(), // check time
      tracks: allTrackIds,
    };
    const after = {
      type: 'page',
      id: 1101101106,
      sessionTitle: 'AFTER',
      sessionTimestamp: new Date('2018-06-17T02:00:00+02:00').getTime(),
      tracks: allTrackIds,
    };

    self.theme.createSession(before);
    self.theme.createSession(contributors);
    self.theme.createSession(thursdayNight);
    self.theme.createSession(fridayNight);
    self.theme.createSession(afterParty);
    self.theme.createSession(after);
  });
