import {IUserInfo} from "@api/index";

export type SortType = 'id' | 'name';

export const sort = (type: SortType, sortedBy: SortType, users: Array<IUserInfo>, setSortDirection: (isDownDirection?: true) => void): Array<IUserInfo> | void => {
  let sortedUsers: Array<IUserInfo> | undefined;
  if (type === 'id') {
    if (sortedBy === 'id') {
      setSortDirection();
      return [...users].reverse();
    }
    setSortDirection(true);
    sortedUsers = [...users].sort((a, b) => a.id - b.id);
  }
  if (type === 'name') {
    if (sortedBy === 'name') {
      setSortDirection();
      return [...users].reverse();
    }
    setSortDirection(true);
    sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortedUsers) return sortedUsers;
};
// TODO: Нужно рефакторить функцию сортировки
