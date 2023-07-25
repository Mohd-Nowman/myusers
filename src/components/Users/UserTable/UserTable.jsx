import { Button } from 'antd';
import React from 'react';
import './userTable.scss';

function UserTable({
    tableHeadings,
    tableData,
    onViewClick,
    onEditClick,
    onDeleteClick,
}) {

    function isAtBottomOfScroll(containerElement) {
        const contentHeight = containerElement.scrollHeight;
        const containerScrollTop = containerElement.scrollTop;
        const containerHeight = containerElement.clientHeight;
        return containerScrollTop + containerHeight >= contentHeight;
    }

    function onScroll() {
        const elem = document.getElementsByClassName('table-body-container')[0];
        console.log('elem: ', elem);
        if (isAtBottomOfScroll(elem)) {
            console.log('Yes');
        }
    }

    return (
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        {
                            tableHeadings.map((value, index) => (
                                <th style={{ width: `${value === 'Actions' ? '270px' : '190px'}` }} key={index}>
                                    {value}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
            </table>
            <div class="table-body-container" onScroll={onScroll}>
                {
                    tableData.length ? (
                        <table>
                            <tbody>
                                {
                                    tableData.map((row) => (
                                        <tr style={{ textAlign: 'center' }} key={row.id}>
                                            <td>{row.name || 'NA'}</td>
                                            <td>{row.age || 'NA'}</td>
                                            <td>{row.gender || 'NA'}</td>
                                            <td>{row.city || 'NA'}</td>
                                            <td>{row.phoneNumber || 'NA'}</td>
                                            <td style={{ cursor: 'pointer', width: '270px' }}>
                                                <Button onClick={() => onViewClick(row.id)}>View</Button>
                                                <Button style={{ margin: '0px 5px' }} onClick={() => onEditClick(row.id)}>Edit</Button>
                                                <Button onClick={() => onDeleteClick(row.id)}>Delete</Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    ) : (
                        <p>No records found</p>
                    )
                }
            </div>
        </div>

    )
}

export default UserTable