import { IMenuItems } from './type';

export const MENU_LIST: IMenuItems[] = [
  {
    title: 'Users',
    to: '/users',
    icon: 'users',
  },
];

export const API_ROUTES = {
  getUsers: `${process.env.REACT_APP_API}/users`,
  getPostByUserId: `${process.env.REACT_APP_API}/posts/?userId={userId}`,
  getAlbumByUserId: `${process.env.REACT_APP_API}/albums/?userId={userId}`,
};
