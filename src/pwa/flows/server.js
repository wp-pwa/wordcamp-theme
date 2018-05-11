import { flow, getEnv } from 'mobx-state-tree';
import { when } from 'mobx';
import { dep } from 'worona-deps';
import { homeContext } from '../contexts';

export default self =>
  flow(function* ThemeServer({ selectedItem }) {
    const { store } = getEnv(self);
    const routeChangeSucceed = dep('connection', 'actions', 'routeChangeSucceed');

    const { type, id } = selectedItem;
    const action = { selectedItem: { type, id }, context: homeContext };

    store.dispatch(routeChangeSucceed(action));

    yield when(() => self.connection.entity(type, id).isReady);
  });
