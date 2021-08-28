import { IMenuItems } from './type';

export const MENU_LIST: IMenuItems[] = [
  {
    title: 'Users',
    to: '/users',
    icon: 'users',
  },
  {
    title: 'Posts',
    to: '/posts',
    icon: 'comments',
  },
  {
    title: 'Albums',
    to: '/albums',
    icon: 'images',
  },
];

export const API_ROUTES = {
  getUsers: `${process.env.REACT_APP_API}/users`,
  getPostByUserId: `${process.env.REACT_APP_API}/posts/?userId={userId}`,
};
