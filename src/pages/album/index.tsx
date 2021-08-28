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
import { IAlbumParams } from '../../interface/album';
import { getUserAlbumData } from '../../actions/album';
import {
  resetState,
} from '../../redux/action/album';
import PaginationWrapper from '../../components/PaginationWrapper';

const Album: FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const { userId } = useParams<IAlbumParams>();
  const {
    isLoading,
    userAlbums,
  } = useSelector((state: TAppState) => state.album);

  useEffect(() => {
    dispatch(getUserAlbumData(userId, 0, ELimitViewData.USER_ALBUM));
    return () => {
      dispatch(resetState());
    };
  }, []);

  const renderUserAlbumsRow = useCallback(() => userAlbums.map((userAlbum) => (
    <Table.Row key={userAlbum.id}>
      <Table.Cell>{userAlbum.id}</Table.Cell>
      <Table.Cell>{userAlbum.title}</Table.Cell>
    </Table.Row>
  )), [userAlbums]);

  const paginationCall = useCallback((start, limitView) => {
    dispatch(getUserAlbumData(userId, start, limitView));
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
                Albums
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
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {renderUserAlbumsRow()}
              </Table.Body>

              <Table.Footer>
                <Table.Row textAlign="right">
                  <Table.HeaderCell colSpan="7">
                    <PaginationWrapper
                      totalData={ECountDataAssumptions.USER_ALBUM}
                      limitView={ELimitViewData.USER_ALBUM}
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

export default memo(Album);
