import { Button, Input, Modal } from 'antd';
import React from 'react';
import './userModal.scss';

function Add({
    isVisible,
    onUserModalSave,
    onUserModalCancel,
    mode,
    userData,
    setUserData,
}) {
    return (
        <Modal title={mode === 'add' ? 'Add User' : 'User'}
            open={isVisible}
            onOk={onUserModalSave}
            onCancel={onUserModalCancel}
            footer={[
                <Button key="back" onClick={onUserModalCancel}>
                    Cancel
                </Button>,
                <Button disabled={mode === 'view'} key="submit" type="primary" onClick={() => onUserModalSave(userData)}>
                    Save
                </Button>,
            ]}
        >
            <div className="AddContainer">
                <div className="Field">
                    <Input
                        placeholder="Name"
                        value={userData?.name}
                        onChange={(e) => setUserData((prevData) => ({
                            ...prevData,
                            name: e.target.value
                        }))}
                        disabled={mode && mode === 'view'}
                    />
                </div>
                <div className="Field">
                    <Input placeholder="Age"
                        value={userData?.age}
                        onChange={(e) => setUserData((prevData) => ({
                            ...prevData,
                            age: e.target.value
                        }))}
                        disabled={mode && mode === 'view'}
                    />
                </div>
                <div className="Field">
                    <Input placeholder="Gender"
                        value={userData?.gender}
                        onChange={(e) => setUserData((prevData) => ({
                            ...prevData,
                            gender: e.target.value
                        }))}
                        disabled={mode && mode === 'view'}
                    />
                </div>
                <div className="Field">
                    <Input placeholder="City"
                        value={userData?.city}
                        onChange={(e) => setUserData((prevData) => ({
                            ...prevData,
                            city: e.target.value
                        }))}
                        disabled={mode && mode === 'view'}
                    />
                </div>
                <div className="Field">
                    <Input placeholder="Phone Number"
                        value={userData?.phoneNumber}
                        onChange={(e) => setUserData((prevData) => ({
                            ...prevData,
                            phoneNumber: e.target.value,
                        }))}
                        disabled={mode && mode === 'view'}
                    />
                </div>
            </div>

        </Modal>
    )
}

export default Add