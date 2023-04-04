import { Card, Wrapper } from '@/components/Card/UserInfoCard.styles';
import { type User } from '@/pages/users';

type UserCardProps = {
  user: Pick<User, 'address' | 'email' | 'name' | 'phone'>;
};

// Simple dummy component to be used inside of modal
const UserInfoCard = ({ user }: UserCardProps) => {
  const { name, email, phone, address } = user;
  return (
    <Wrapper>
      <Card>
        <div> Name: {name}</div>
        <div> Email: {email}</div>
        <div> Phone: {phone}</div>
        <div>
          Address: {address.city} - {address.street}
        </div>
      </Card>
    </Wrapper>
  );
};

export default UserInfoCard;
