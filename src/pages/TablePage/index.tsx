import {CommonTemplate} from "@ui/templates/CommonTemplate";
import {UsersTable} from "@users";
import {shallowEqual, useSelector} from "react-redux";
import {RootState} from "@store/root-reducer";
import React from "react";

export const TablePage = () => {
  const {currentUsers, page, pages, userInfo} = useSelector((state: RootState) => ({
    currentUsers: state.users.currentUsers,
    page: state.users.page,
    pages: state.users.pages,
    userInfo: state.users.userInfo
  }), shallowEqual);

  return(
      <CommonTemplate>
        <UsersTable
            currentUsers={currentUsers}
            page={page}
            pages={pages}
            userInfo={userInfo}
        />
      </CommonTemplate>
  )
}
