
export interface IUserInfo {
  id: number,
 name: string,
  gender: string,
  status: string,
  created_at: string,
  updated_at: string
  email:string
}
export interface IMetaInfo {
pagination: {
  total: number,
  pages: number,
  limit: number
}
}

export interface IResponse {
  code: number
  data: Array<IUserInfo>,
  meta: IMetaInfo
}

export const usersAPI = {
  getUrlUsers(pageNumber = 1) {
    return `https://gorest.co.in/public-api/users?page=${pageNumber}`
  },
  getUrlUserPosts(id: number) {
    return `https://gorest.co.in/public-api/posts?user_id=${id}`
  },
  async getUsers(pageNumber: number): Promise<IResponse | void> {
    try {
      const url = this.getUrlUsers(pageNumber);
      const res: Response = await fetch(url);

      if (res.status !== 200) throw new Error("Ошибка при запросе");

      const  response: IResponse =  await res.json();

      if(response.code !== 200) throw new Error("Ошибка при" +
          " обращении к ресурсу");

        return response;

    } catch (e) {
      console.log(e)
    }
  },
  async getUserPosts(id: number) {
    try {
      const url = this.getUrlUserPosts(id);
      const res: Response = await fetch(url);

      if (res.status !== 200) throw new Error("Ошибка при запросе");

      const  response: IResponse =  await res.json();

      if(response.code !== 200) throw new Error("Ошибка при" +
          " обращении к ресурсу");

      return response;

    } catch (e) {
      console.log(e)
    }
}
};
