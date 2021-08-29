import React, {
  FC, useEffect, memo, useCallback, useState,
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
  Button,
  Icon,
  Dimmer,
  Loader,
  Item,
  Comment,
} from 'semantic-ui-react';
import { ECountDataAssumptions, ELimitViewData } from '../../interface';
import { TAppState } from '../../redux';
import { IPostParams } from '../../interface/post';
import {
  getUserPostsData,
  getCommentsByPostId,
} from '../../actions/post';
import {
  resetState,
} from '../../redux/action/post';
import PaginationWrapper from '../../components/PaginationWrapper';
import ModalWrapper from '../../components/ModalWrapper';

const Post: FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const { userId } = useParams<IPostParams>();
  const {
    isLoading,
    userPosts,
    comments,
    isModalLoading,
  } = useSelector((state: TAppState) => state.post);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [postId, setPostId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getUserPostsData(userId, 0, ELimitViewData.USER_POST));
    return () => {
      dispatch(resetState());
    };
  }, []);

  const paginationCall = useCallback((start, limitView) => {
    dispatch(getUserPostsData(userId, start, limitView));
  }, [userId]);

  const clickOpenDetail = useCallback((postId: string) => {
    setIsOpen(true);
    setPostId(postId);
  }, [isOpen]);

  const closeDetail = useCallback(() => {
    setIsOpen(false);
  }, [isOpen]);

  const postDetailModalMount = useCallback(() => {
    dispatch(getCommentsByPostId(postId as string));
  }, [postId]);

  const renderUserPostsRow = () => userPosts.map((userPost) => (
    <Table.Row key={userPost.id}>
      <Table.Cell>{userPost.id}</Table.Cell>
      <Table.Cell>{userPost.title}</Table.Cell>
      <Table.Cell>{userPost.body}</Table.Cell>
      <Table.Cell>
        <Button
          color="teal"
          className="button-action-table"
          compact
          floated="right"
          onClick={() => clickOpenDetail(userPost.id.toString())}
        >
          <Icon name="eye" />
        </Button>

        <Button
          color="yellow"
          className="button-action-table"
          compact
          floated="right"
        >
          <Icon name="edit" />
        </Button>

        <Button
          color="red"
          className="button-action-table"
          compact
          floated="right"
        >
          <Icon name="trash" />
        </Button>
      </Table.Cell>
    </Table.Row>
  ));

  const renderPostComments = () => comments.map((comment) => (
    <Comment key={comment.id}>
      <Comment.Author>{comment.email}</Comment.Author>
      <Comment.Metadata>
        <div>{comment.name}</div>
      </Comment.Metadata>
      <Comment.Text>{comment.body}</Comment.Text>
    </Comment>
  ));

  const renderModalChildren = () => {
    if (isModalLoading) {
      return (
        <Container>
          <Dimmer active inverted>
            <Loader inverted>Loading ...</Loader>
          </Dimmer>
        </Container>
      );
    }

    const Post = userPosts.find((usePost) => usePost.id.toString() === postId);

    return (
      <Container>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>{Post?.title}</Item.Header>
              <Item.Meta>content text</Item.Meta>
              <Item.Description>{Post?.body}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>

        <Comment.Group>
          <Header as="h3" dividing>
            Comments
          </Header>
          {renderPostComments()}
        </Comment.Group>
      </Container>
    );
  };

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
                  <Table.HeaderCell width={3}>
                    Action
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

      <ModalWrapper
        closeIcon
        basic={false}
        headerText="Post details"
        useModalAction={false}
        open={isOpen}
        isLoading={isModalLoading}
        onClose={closeDetail}
        onMount={postDetailModalMount}
      >
        {renderModalChildren()}
      </ModalWrapper>
    </Container>
  );
};

export default memo(Post);
