import React, { useEffect, useState } from 'react';
import './users.scss';
import { Button } from 'antd';
import Search from 'antd/es/input/Search';
import UserTable from './UserTable';
import { addUser, deleteUser, updateUser } from '../../redux/Users/actions';
import { connect } from 'react-redux';
import UserModal from './UserModal';

const tableHeadings = ['Name', 'Age', 'Gender', 'City', 'Phone Number', 'Actions']

function Users({ users, dispatch }) {
    const [mode, setMode] = useState(null);
    const [tableData, setTableData] = useState(users);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [userData, setUserData] = useState({
        name: '',
        age: '',
        gender: '',
        city: '',
        phoneNumber: '',
        id: '',
    });

    const onSearch = (val) => {
        if (val.length) {
            const searchData = users.filter(obj => {
                return obj.name.toLowerCase().includes(val.toLowerCase());
            })
            setTableData(searchData);
        } else {
            setTableData(users);
        }
    }

    const onViewClick = (id) => {
        setSelectedId(id);
        setMode('view');
        setIsUserModalOpen(true);
    }

    const onEditClick = (id) => {
        setSelectedId(id);
        setMode('edit');
        setIsUserModalOpen(true);
    }
    const onDeleteClick = (id) => {
        dispatch(deleteUser(id));
    }

    const onUserModalSave = (userData) => {
        console.log('mode: ', mode);
        if (mode === 'add') {
            const _userData = {
                ...userData,
                id: `user_${Date.now().toString()}`
            }
            dispatch(addUser(_userData));
        } else if (mode === 'edit') {
            dispatch(updateUser(userData));
        }

        setIsUserModalOpen(false);
        setUserData({
            name: '',
            age: '',
            gender: '',
            city: '',
            phoneNumber: '',
            id: '',
        })
    }

    const onUserModalCancel = () => {
        setIsUserModalOpen(false);
        setSelectedId(null);
    }
    const onKeyUp = (val) => {
        console.log('onKeyUp val: ', val);
        onSearch(val);
    }

    function debounce(func, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        }
    }
    const betterSearch = debounce(onKeyUp, 300);

    useEffect(() => {
        setTableData(users);
    }, [users]);

    useEffect(() => {
        if ((mode === 'view' || mode === 'edit') && selectedId && users.length) {
            const _userData = users.find((obj) => obj.id === selectedId);
            setUserData(_userData);
        }
    }, [selectedId, users, mode]);

    return (
        <div className='UserMaster'>
            <div className="userHeadingContainer">
                <h3>Users</h3>
                <div>
                    <Button
                        type="primary"
                        onClick={() => {
                            setMode('add');
                            setIsUserModalOpen(true);
                        }}
                    >Add User</Button>
                </div>
            </div>
            <div className="filter">
                <Search
                    placeholder="Search By User Name"
                    size="large"
                    onSearch={onSearch}
                    style={{
                        width: 304,
                    }}
                    onKeyUp={(e) => betterSearch(e.target.value)}
                />
            </div>
            <div className="TableContainer">
                <UserTable
                    tableHeadings={tableHeadings}
                    tableData={tableData}
                    onViewClick={onViewClick}
                    onEditClick={onEditClick}
                    onDeleteClick={onDeleteClick}
                />
            </div>
            <UserModal
                isVisible={isUserModalOpen}
                mode={mode}
                onUserModalCancel={onUserModalCancel}
                onUserModalSave={onUserModalSave}
                userData={userData}
                setUserData={setUserData}
            />
        </div>
    )
}
function mapStateToProps(state) {
    return {
        users: state.users,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);