import memoize from 'lodash/memoize';

export const homeContext = {
  columns: [
    [
      {
        type: 'page',
        id: 13,
      },
    ],
    [
      {
        type: 'page',
        id: 15,
      },
    ],
    [
      {
        type: 'page',
        id: 17,
      },
    ],
  ],
  options: {
    name: 'home',
    title: 'Schedule',
  },
};

export const venueContext = {
  columns: [
    [
      {
        type: 'page',
        id: 23,
      },
    ],
    [
      {
        type: 'page',
        id: 26,
      },
    ],
    [
      {
        type: 'page',
        id: 28,
      },
    ],
    [
      {
        type: 'page',
        id: 30,
      },
    ],
    [
      {
        type: 'page',
        id: 32,
      },
    ],
    [
      {
        type: 'page',
        id: 34,
      },
    ],
  ],
  options: {
    name: 'venue',
    title: 'Venue Map',
  },
};

export const announcementsContext = {
  columns: [
    [
      {
        type: 'latest',
        id: 'post',
        page: 1,
      },
    ],
  ],
  options: {
    name: 'announcements',
    title: 'Announcements',
  },
};

export const postsContext = memoize((columns = []) => ({
  columns,
  options: {
    name: 'posts',
    title: 'Announcements',
  },
}));

export const creditsContext = {
  columns: [
    [
      {
        type: 'page',
        id: 36,
      },
    ],
  ],
  options: {
    name: 'credits',
    title: 'Credits',
  },
};

export const sessionsContext = memoize((columns = []) => ({
  columns,
  options: {
    name: 'sessions',
    title: 'Session',
  },
}));

export const speakersContext = memoize((columns = []) => ({
  columns,
  options: {
    name: 'speakers',
    title: 'Speaker',
  },
}));
