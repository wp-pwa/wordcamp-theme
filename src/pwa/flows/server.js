import { flow, getEnv, addMiddleware } from 'mobx-state-tree';
import { when } from 'mobx';
import { dep } from 'worona-deps';
import { homeContext, venueContext, announcementsContext, creditsContext } from '../contexts';

const extractId = href => /\/(\d+)$/g.exec(href)[1];

const sessionMiddleware = (call, next) => {
  if (call.name === 'addEntity') {
    const [{ entity }] = call.args;

    if (entity.type === 'wcb_session') {
      const { theme } = call.tree;

      const {
        id: entityId,
        session_track: trackIds,
        session_category: categoryIds,
        _links: { speakers = [] },
      } = entity;

      const speakerIds = speakers.map(({ href }) => extractId(href));

      const session = {
        entityId,
        trackIds,
        categoryIds,
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

    const { store } = getEnv(self);
    const routeChangeSucceed = dep('connection', 'actions', 'routeChangeSucceed');
    const customRequested = dep('connection', 'actions', 'customRequested');

    const { type, id } = selectedItem;
    const action = { selectedItem: { type, id } };

    if (type === 'page') {
      if ([23, 26, 28, 30, 32, 34].includes(id)) action.context = venueContext;
      else if (id === 36) action.context = creditsContext;
      else action.context = homeContext;
    } else if (type === 'latest' && id === 'post') {
      action.context = announcementsContext;
    } else {
      action.context = homeContext;
    }

    store.dispatch(routeChangeSucceed(action));

    // Request all sessions:
    store.dispatch(
      customRequested({
        custom: { name: 'sessions', type: 'wcb_session', page: 1 },
        params: { per_page: 100, _embed: false },
      }),
    );

    // Request all speakers:
    store.dispatch(
      customRequested({
        custom: { name: 'speakers', type: 'wcb_speaker', page: 1 },
        params: { per_page: 100, _embed: false },
      }),
    );

    // Request all tracks:
    store.dispatch(
      customRequested({
        custom: { name: 'tracks', type: 'wcb_track', page: 1 },
        params: { per_page: 100, _embed: false },
      }),
    );

    // Request needed pages:
    store.dispatch(
      customRequested({
        custom: { name: 'pages', type: 'page', page: 1 },
        params: {
          per_page: 100,
          _embed: false,
          include: '15, 17, 19, 23, 26, 28, 30, 32, 34, 36',
        },
      }),
    );

    yield when(
      () =>
        self.connection.entity(type, id).isReady &&
        self.connection.custom('sessions').isReady &&
        self.connection.custom('speakers').isReady &&
        self.connection.custom('tracks').isReady &&
        self.connection.custom('pages').isReady,
    );
  });
