import React from 'react';
import styles from './users.module.scss';

interface UserProps {
  key: string;
  first: string;
  last: string;
  gender: string;
}

const UserComponent: React.FC<UserProps> = ({ first, last, gender }) => (
  <div className={styles.userCard}>
    <p><span className={styles.info}>Name:</span> {first} {last}</p>
    <p><span className={styles.info}>Gender:</span> {gender}</p>
  </div>
);

export default UserComponent;
