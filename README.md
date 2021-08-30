# Social media dashboard App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
### Project Information
- typescript
- eslint, husky, lint-staged
- axios
- react-semantic-ui
- react-toastify
- yup
- firebase

##Production site
Open [https://kumparan-test-43c81.web.app/users](https://kumparan-test-43c81.web.app/users) to view it.

## Available Scripts
### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run lint`

Runs the eslinter (rules: .eslintrc) and (ignore: .eslintignore)

### `npm run lint --fix`

Runs the eslinter with autofixing

### `npm run build:{env-name}`

Runs the react app build with specific file `env.[staging-state]`

----------

## Route list
- **/users** => `pages/users/index.tsx` (list of user)
- **/posts/:userId/create** => `pages/post/PostConfig.tsx` (create page)
- **/posts/:userId** => `pages/post/PostConfig.tsx` (list of post each user)
- **/albums/:userId** => `pages/album/index.tsx` (list of album each user)
- **/albums/:albumId/photo** => `pages/photo/index.tsx` (list of photo each album)
- **/posts/:postId/edit** => `pages/post/PostConfig.tsx` (edit page)
- **/comments/:commentId/edit** => `pages/comment/CommentConfig.tsx` (edit page)
- **/comments/:postId/create** => `pages/comment/CommentConfig.tsx` (create page)

## Project folder structure
### `actions`
contains API function call each page
### `components`
contains list of reusable components like modal, pagination, input, errorPage and so on
### `constants`
contain many variables that being used as a constant data
### `environment`
contain environment variables being exported out for firebase hosting
### `helper`
contain helper class or an object or event a function ex: Validator.ts
### `interface`
contains interface structure of each page either params or responseBody API
### `pages`
contains list of pages component
### `redux`
contains action, reducer, type and rootState each page component
### `utils`
contains a small util function to do a low level abstractions of function and httpRequest generic function (reusable)
______
## Important Logic
### Assumptions:
```
export enum EStatusErrorCode {
  GENERAL_ERROR = 500,
  RATE_LIMITER = 429,
  NOT_FOUND = 404,
  // assumed and many others BE error code
}
export enum ELimitViewData {
  USERS = 5,
  USER_POST = 5,
  USER_ALBUM = 5,
  USER_ALBUM_PHOTOS = 10,
}
export enum ECountDataAssumptions {
  USERS = 10,
  USER_POST = 10,
  USER_ALBUM = 10,
  USER_ALBUM_PHOTOS = 50,
}
```
theres `FormWrapper.tsx` inside `components` folder, `FormWrapper` component do big a loop from constant data field and pass every necessary props to each it's child component
```
interface IFormWrapper {
    errors: { [key: string]: string };
    formField: IFormField[];
    form: IPostForm | ICommentForm;
    disabled: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeTextArea: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void;
}
```