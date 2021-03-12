import {Link} from "react-router-dom";
import styles from "./Main.module.scss";

export const Main = () => {

  return <div  className={styles.links}>
    <p><Link to={'/table'}>Users Table</Link></p>
    </div>
};
