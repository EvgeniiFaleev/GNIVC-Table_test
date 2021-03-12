import React, {FC, useEffect, useState} from "react";
import {useDispatch} from 'react-redux'
import {usersActions} from "@users";
import {DispatchType} from "@store/root-reducer";
import {useParams} from "react-router-dom";
import styles from './UsersTable.module.scss'
import moment from 'moment';
import {Paginator} from "@ui/organisms/Paginator";
import {Preloader} from "@ui/atoms/Preloader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faAngleDoubleUp
} from "@fortawesome/free-solid-svg-icons";
import {debounce} from "@users/helpers/debounce";
import {sort, SortType} from "@users/helpers/sort";
import {IUserInfo} from "@api/index";


interface IUsersTableProps {
  currentUsers: Array<IUserInfo> | null,
  page: number,
  pages: number,
  userInfo: number | null
}

export const UsersTable: FC<IUsersTableProps> = ({currentUsers, page, pages, userInfo}) => {
  const [sortedBy, setSortedBy] = useState<SortType>('id');
  const [isSortedDown, setIsSortedDown] = useState(true);
  const [chosenUserId, setChosenUserId] = useState<null | number>(null);
  const dispatch: DispatchType = useDispatch();
  const {pageNumber} = useParams() as { pageNumber: string };

  useEffect(() => {
    dispatch(usersActions.getUsers(+pageNumber))

  }, [dispatch, pageNumber]);  // Добавил dispatch чтобы не
  // выскакивали warnings

  const onUserInfo = debounce((e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const email = target.closest(`.${styles.email}`) as HTMLElement;

    if (!email) return;
    const {id} = email.dataset;
    dispatch(usersActions.getUserPostsInfo(+id!))
    setChosenUserId(+id!)
  }, 500);

  const clearUserInfo = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const email = target.closest(`.${styles.email}`) as HTMLElement;
    if (!email) return;
    setChosenUserId(null);
    dispatch(usersActions.setUserInfo(null))
  };

  const usersRows = currentUsers?.map((item) => {
    return <tr className={styles.user} key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td data-id={item.id} className={styles.email}>{item.email}
        {userInfo != null && item.id === chosenUserId ? <span
            className={styles.user_info}>{`Posts Quantity: ${userInfo}`}</span> : null}
      </td>
      <td>{item.gender}</td>
      <td>{item.status}</td>
      <td>{moment(Date.parse(item.created_at)).format('D MMM Y HH:mm')}</td>
    </tr>
  });

  const setSortDirection = (down?: true) => {
    if (down) {
      setIsSortedDown(true)
    } else {
      setIsSortedDown((prevDirection) => !prevDirection)
    }

  };

  const onSort = (e: React.MouseEvent<HTMLTableElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const type = target.dataset.column as SortType;
    if (currentUsers) {
      const sortedUsers = sort(type, sortedBy, currentUsers!, setSortDirection);

      if (sortedUsers) {
        dispatch(usersActions.setCurrentUsers(sortedUsers));
        setSortedBy(type)
      }
    }
  };


  return <div className={styles.table_wrapper}>
    {currentUsers ?
        <>
          {isSortedDown ?
              <FontAwesomeIcon className={styles.sortArrow}
                  icon={faAngleDoubleDown}/> :
              <FontAwesomeIcon className={styles.sortArrow}
                  icon={faAngleDoubleUp}/>
          }
          <table onClick={onSort} onMouseOver={onUserInfo}
              onMouseOut={clearUserInfo}
              className={styles.users_table}>
            <thead>
            <tr>
              <th className={`${styles.hover_items} ${styles.sort_head}`}
                  data-column={'id'}>id
              </th>
              <th className={`${styles.hover_items} ${styles.sort_head}`}
                  data-column={'name'}>Name
              </th>
              <th data-column={'email'}>Email</th>
              <th>Gender</th>
              <th data-column={'status'}>Status</th>
              <th data-column={'created_at'}>Registration date</th>
            </tr>
            </thead>
            <tbody>{usersRows}</tbody>
          </table>
          <Paginator page={page} pages={pages}
          />
        </>
        : <Preloader/>}
  </div>
};
