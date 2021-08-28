import React, {
  FC, useEffect, memo, useCallback,
} from 'react';
import { RouteComponentProps, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Segment,
  Container,
  Header,
  Grid,
  Divider,
  Table,
} from 'semantic-ui-react';
import { ECountDataAssumptions, ELimitViewData } from '../../interface';
import { TAppState } from '../../redux';
import { IPostParams } from '../../interface/post';
import { getUserPostsData } from '../../actions/post';
import {
  resetState,
} from '../../redux/action/users';
import PaginationWrapper from '../../components/PaginationWrapper';

const Post: FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const { userId } = useParams<IPostParams>();
  const {
    isLoading,
    userPosts,
  } = useSelector((state: TAppState) => state.post);

  useEffect(() => {
    dispatch(getUserPostsData(userId, 0, ELimitViewData.USER_POST));
    return () => {
      dispatch(resetState());
    };
  }, []);

  const renderUserPostsRow = useCallback(() => userPosts.map((userPost) => (
    <Table.Row key={userPost.id}>
      <Table.Cell>{userPost.id}</Table.Cell>
      <Table.Cell>{userPost.title}</Table.Cell>
      <Table.Cell>{userPost.body}</Table.Cell>
    </Table.Row>
  )), [userPosts]);

  const paginationCall = useCallback((start, limitView) => {
    dispatch(getUserPostsData(userId, start, limitView));
  }, [userId]);

  return (
    <Container>
      <Segment raised padded loading={isLoading}>
        <Grid verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                User
                {`#${userId}`}
                {' '}
                Posts
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Divider />

          <Grid.Row>
            <Table celled structured color="teal">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={1}>
                    Id
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Title
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Body
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {renderUserPostsRow()}
              </Table.Body>

              <Table.Footer>
                <Table.Row textAlign="right">
                  <Table.HeaderCell colSpan="7">
                    <PaginationWrapper
                      totalData={ECountDataAssumptions.USER_POST}
                      limitView={ELimitViewData.USER_POST}
                      getData={paginationCall}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  );
};

export default memo(Post);
