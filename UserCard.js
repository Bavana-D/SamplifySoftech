import React from 'react';
import { Card, Button } from 'antd';

function UserCard({ user, onEdit }) {
  const avatarUrl = `https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`;

  return (
    <Card
      cover={<img src={avatarUrl} alt={user.name} />}
      actions={[
        <Button type="link" onClick={() => onEdit(user)}>Edit</Button>
      ]}
    >
      <Card.Meta title={user.name} description={user.email} />
      <p>{user.phone}</p>
    </Card>
  );
}

export default UserCard;
