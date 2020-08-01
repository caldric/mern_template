import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  name: string;
  password: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async (): Promise<void> => {
    const response = await axios.get('/api');
    const data = await response.data;
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li>{user.name}</li>
      ))}
    </ul>
  );
};

export default App;
