// UserList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFetchUsersQuery } from '../userAPI';
import { setUsers } from '../usersSlice';
import PrivateRoute from '../routes/PrivateRoute'; 

const UserList = () => {
  const { data: users, isLoading, error } = useFetchUsersQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (users) {
      dispatch(setUsers(users));
    }
  }, [users, dispatch]);

  const userList = useSelector(state => state.user.users); 

  return (
    <PrivateRoute>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <ul>
            {userList.map(user => (
              <li key={user.id}>
                <div>
                  <strong>{user.name}</strong> ({user.email})
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PrivateRoute>
  );
};

export default UserList;