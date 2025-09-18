import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Modal, Button, Form, Input } from 'antd';
import UserCard from './UserCard';
import './App.css';
import 'antd/dist/reset.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="container">
      <h1 className="text-center my-4">User Profiles</h1>
      <Row gutter={[16, 16]}>
        {users.map(user => (
          <Col xs={24} sm={12} md={8} key={user.id}>
            <UserCard user={user} onEdit={handleEdit} />
          </Col>
        ))}
      </Row>

      <Modal
        title="Edit User"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedUser && (
          <Form
            initialValues={selectedUser}
            onFinish={(values) => {
              const updatedUsers = users.map(u =>
                u.id === selectedUser.id ? { ...u, ...values } : u
              );
              setUsers(updatedUsers);
              handleModalClose();
            }}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
}

export default App;
