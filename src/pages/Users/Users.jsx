import React, { useEffect, useState } from "react";

import CardTableUsers from "../../components/Cards/CardTableUsers";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);
  return (
    <>
      <CardTableUsers users={users} setUsers={setUsers} />
    </>
  );
};

export default Users;
