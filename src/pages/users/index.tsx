import { useEffect, useState, useRef } from 'react';

import { currentEnvironment } from '@constants';

import styles from './users.module.scss';

import UserComponent from './UserComponent';
import Loader from './Loader';

type Gender = 'female' | 'male' | '';

type User = {
  gender: Gender;
  login: {
    uuid: string;
  };
  name: {
    first: string;
    last: string;
  };
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [gender, setGender] = useState<Gender>('');
  const [pageToGet, setPageToGet] = useState<number>(1);

  const getUsers = async (page: number, gender: Gender) => {
    const genderQuery = gender ? `&gender=${gender}` : '';
    const result = await fetch(
      `${currentEnvironment.api.baseUrl}?results=5${genderQuery}&page=${String(page)}`,
    );
    const userData = (await result.json());
    const usersResults = userData.results as User[];

    setUsers((oldUsers) => (page === 1 ? usersResults : [...oldUsers, ...usersResults]));
  };

  useEffect(() => {
    void (async () => {
      await getUsers(pageToGet, gender);
    })();
  }, [pageToGet, gender]);

  const userContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const userContainer = userContainerRef.current;
    if (userContainer) {
      userContainer.scrollTo({
        top: userContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [users]);

  return (
    <div>
      <div style={{ backgroundColor: 'grey', color: 'white', paddingLeft: '10px'}}>
        Select gender:
        <select style={{margin: '10px 20px'}}
          id="gender"
          name="gender"
          onChange={(event) => {
            setGender(event.target.value as Gender);
            setPageToGet(1);
          }}
        >
          <option value="">All</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </div>
      
      <div className={styles.userContainer} ref={userContainerRef}>
          {users.length > 0 ? (
            users.map((user) => (
              <UserComponent
                key={user.login.uuid}
                first={user.name.first}
                last={user.name.last}
                gender={user.gender}
              />
            ))
          ) : (
            <Loader/>
          )}
      </div>

        <div className={styles.buttonWrapper}>
          <button
            className={styles.loadButton}
            type="button"
            onClick={() => {
              setPageToGet((v) => v + 1);
            }}
          >
            Load More
          </button>
        </div>

    </div>
  );
};

export default Users;
