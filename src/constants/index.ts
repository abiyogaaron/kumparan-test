import { IMenuItems } from './type';
import { IFormField } from '../interface';

export const MENU_LIST: IMenuItems[] = [
  {
    title: 'Users',
    to: '/users',
    icon: 'users',
  },
];

export const API_ROUTES = {
  getUsers: `${process.env.REACT_APP_API}/users`,
  getPostByUserId: `${process.env.REACT_APP_API}/posts?userId={userId}`,
  getPostByPostId: `${process.env.REACT_APP_API}/posts?id={postId}`,
  getAlbumByUserId: `${process.env.REACT_APP_API}/albums?userId={userId}`,
  getCommentsByPostId: `${process.env.REACT_APP_API}/comments?postId={postId}`,
  getPhotosByAlbumid: `${process.env.REACT_APP_API}/photos?albumId={albumId}`,
  createUserPost: `${process.env.REACT_APP_API}/posts`,
  updateUserPost: `${process.env.REACT_APP_API}/posts/{postId}`,
  deleteUserPost: `${process.env.REACT_APP_API}/posts/{postId}`,
};

export const POST_FORM: IFormField[] = [
  {
    label: '1. [Text] Post Title',
    guide: 'max length (100 Char)',
    key: 'post_title',
    type: 'text',
    placeholder: 'Type Post Title',
  },
  {
    label: '2. [Text] Post Body',
    guide: 'max length (250 Char)',
    key: 'post_body',
    type: 'textarea',
    placeholder: 'Type Post Body',
  },
];
