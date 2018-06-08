import memoize from 'lodash/memoize';
import * as consts from '../consts';

export const homeContext = {
  columns: [
    [
      {
        type: 'page',
        id: consts.PAGE_HOME_ON_NOW,
      },
    ],
    [
      {
        type: 'page',
        id: consts.PAGE_HOME_UP_NEXT,
      },
    ],
    [
      {
        type: 'page',
        id: consts.PAGE_HOME_SCHEDULE,
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
        id: consts.PAGE_VENUE_ALL,
      },
    ],
    [
      {
        type: 'page',
        id: consts.PAGE_VENUE_MILKY_WAY,
      },
    ],
    [
      {
        type: 'page',
        id: consts.PAGE_VENUE_ANDROMEDA,
      },
    ],
    [
      {
        type: 'page',
        id: consts.PAGE_VENUE_HAYABUSA,
      },
    ],
    [
      {
        type: 'page',
        id: consts.PAGE_VENUE_CASSINI,
      },
    ],
    [
      {
        type: 'page',
        id: consts.PAGE_VENUE_ROSETTA,
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

export const favouritesContext = {
  columns: [
    [
      {
        type: 'page',
        id: consts.PAGE_MENU_FAVOURITES,
      },
    ],
  ],
  options: {
    name: 'favourites',
    title: 'My Favourites',
    color: 'grey',
  },
};

export const menusContext = {
  columns: [
    [
      {
        type: 'page',
        id: consts.PAGE_MENU_MENUS,
      },
    ],
  ],
  options: {
    name: 'menus',
    title: 'Menus',
    color: 'grey',
  },
};

export const cocContext = {
  columns: [
    [
      {
        type: 'page',
        id: consts.PAGE_MENU_COC,
      },
    ],
  ],
  options: {
    name: 'code-of-conduct',
    title: 'Code Of Conduct',
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
