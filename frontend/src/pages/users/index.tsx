// eslint-disable-next-line canonical/filename-match-exported
import { type NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';
import UserInfoCard from '@/components/Card/UserInfoCard';
import Modal from '@/components/Modal/Modal';

export const getStaticProps = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();

  return {
    props: {
      users: data,
    },
  };
};

const UsersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

export type User = {
  address: {
    city: string;
    street: string;
    zipcode: string;
  };
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
};

type UsersPageProps = {
  users: User[];
};

const Users: NextPage<UsersPageProps> = ({ users }) => {
  const [showUsers, setShowUsers] = useState(false);

  return (
    <div>
      <Head>
        <title>Users Page</title>
      </Head>
      <button onClick={() => setShowUsers(true)} type="button">
        Show Users Modal
      </button>

      <Modal isOpen={showUsers} onClose={() => setShowUsers(false)} size="lg">
        <Modal.Header>Users</Modal.Header>
        <Modal.Body>
          <UsersContainer>
            {users.map((user) => (
              <UserInfoCard key={user.id} user={user} />
            ))}
          </UsersContainer>
        </Modal.Body>
        <Modal.Footer>
          <Modal.CloseButton> Close </Modal.CloseButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
