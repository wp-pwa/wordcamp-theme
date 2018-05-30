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
    color: 'grey',
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
    name: 'venues',
    title: 'Venue Map',
    color: 'grey',
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
    color: 'grey',
  },
};

export const postsContext = memoize((columns = []) => ({
  columns,
  options: {
    name: 'posts',
    title: 'Announcement',
    color: 'grey',
  },
}));

export const sessionsContext = memoize((columns = []) => ({
  columns,
  options: {
    name: 'sessions',
    title: 'Session',
    color: 'lightGrey',
  },
}));

export const speakersContext = memoize((columns = []) => ({
  columns,
  options: {
    name: 'speakers',
    title: 'Speaker',
    color: 'lightGrey',
  },
}));

export const singlePageContext = ({ id, title, color = 'grey'}) => ({
  columns: [[{ type: 'page', id }]],
  options: { name: 'pages', title, color },
});
