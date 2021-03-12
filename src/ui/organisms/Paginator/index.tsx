import {FC} from "react";
import styles from './Paginator.module.scss';
import {Link, NavLink} from "react-router-dom";

interface IPaginatorProps {
  page: number,
  pages: number
}

const range = (from: number, to: number, totalPages: number, step = 1) => {
  let i = from;
  const range = [];
  if (i < 0) {
    to += 2;
    i = 1
  }
  if (i === 0) {
    to += 1;
    i = 1
  }

  while (i <= to && i <= totalPages) {

    range.push(i);
    i += step;
  }

  return range;
};

export const Paginator: FC<IPaginatorProps> = ({page, pages}) => {


  const items = range(page - 2, page + 2, pages);

  const paginatorNumbers = items.map((item) => {
    return <Link to={`/table/${item}`}
        className={`${page === item ? styles.active : ''} ${styles.paginator_item}`}
        data-page_number={item} key={item}>{item}</Link>
  });

  return <nav className={styles.paginator}>
    {page - 3 > 0 ? <NavLink to={`/table/1`}>1</NavLink> : ''}
    {page !== 1 ? <NavLink to={`/table/${page - 1}`}>«</NavLink> : ''}
    {paginatorNumbers}
    {page !== pages ?
        <NavLink to={`/table/${page + 1}`}>»</NavLink> : ''}
    {page + 3 <= pages ? <NavLink
        to={`/table/${pages}`}>{pages}</NavLink> : ''}
  </nav>
};
