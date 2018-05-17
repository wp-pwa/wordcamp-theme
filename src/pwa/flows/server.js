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
        session_track: trackIds,
        // session_category: categoryIds,
        _links: { speakers = [] },
      } = entity;

      const speakerIds = speakers.map(({ href }) => parseInt(extractId(href), 10));

      const session = {
        id,
        trackIds,
        // categoryIds,
        speakerIds,
      };

      theme.addSession(session);
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
          include: '15, 17, 19, 23, 26, 28, 30, 32, 34, 36',
        },
      }),
    ]);
  });
