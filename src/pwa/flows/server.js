import { flow, getEnv, addMiddleware } from 'mobx-state-tree';
import { when } from 'mobx';
import { dep } from 'worona-deps';
import { homeContext } from '../contexts';

const extractId = href => /\/(\d+)$/g.exec(href)[1];

const speakersMiddleware = (call, next, abort) => {
  if (call.name === 'addEntity') {
    const [{ entity }] = call.args;

    if (entity.type === 'wcb_session') {
      const { theme } = call.tree;
      const { id, _links: { speakers = [] } } = entity;
      theme.addSpeakersBySession(id.toString(), speakers.map(({ href }) => extractId(href)));
    }
  }
  next(call);
};

export default self =>
  flow(function* ThemeServer({ selectedItem }) {
    addMiddleware(self, speakersMiddleware);

    const { store } = getEnv(self);
    const routeChangeSucceed = dep('connection', 'actions', 'routeChangeSucceed');
    const customRequested = dep('connection', 'actions', 'customRequested');

    const { type, id } = selectedItem;
    const action = { selectedItem: { type, id }, context: homeContext };

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

    yield when(
      () =>
        self.connection.entity(type, id).isReady &&
        self.connection.custom('sessions').isReady &&
        self.connection.custom('speakers').isReady &&
        self.connection.custom('tracks').isReady,
    );
  });
