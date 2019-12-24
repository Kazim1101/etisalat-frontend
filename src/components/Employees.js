// libs
import React, { useEffect, useState, useCallback } from 'react'
// src
import { Modal, Button } from 'antd'
import { fetchEmployees, editEmployee, deleteEmployee } from '../actions/employeesActions'
import EditableTable from './common/EditableTable/EditableTable'
import AddEmployee from './AddEmployee'

const EMP_COLUMNS = [{
    title: 'First Name',
    dataIndex: 'firstName',
    width: '10%',
    editable: true,
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    width: '10%',
    editable: true,
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    width: '15%',
    editable: true,
  }, {
    title: 'Phone No',
    dataIndex: 'phone',
    width: '15%',
    editable: true,
  },
  {
    title: 'Hire Date',
    dataIndex: 'hireDate',
    width: '10%',
    editable: true,
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    width: '10%',
    editable: true,
  },
  {
    title: 'Manager Id',
    dataIndex: 'managerId',
    width: '10%',
    editable: true,
  },
  {
    title: 'Department Id',
    dataIndex: 'departmentId',
    width: '10%',
    editable: true,
  }]

const Employees = ({

}) => {
    const [data, setData] = useState([])
    const [addEmployeeVisible, setAddEmployeeVisible] = useState(false)

    useEffect( () => {
        fetchEmployees().then((response) => {
            setData(response.map(item => ({
                ...item,
                key: item.empId
            })))
        })
    }, [setData])

    const onSave = useCallback((item) => {
        editEmployee(item)
    }, [editEmployee])

    const onDelete = useCallback(async (empId) => {
        await deleteEmployee(empId)
    }, [deleteEmployee])

    const showModal = useCallback(() => {
        setAddEmployeeVisible(true)
    }, [setAddEmployeeVisible])

    const closeModal = useCallback(() => {
        setAddEmployeeVisible(false)
    }, [setAddEmployeeVisible])

    return (
        <div>
            <EditableTable  columns={EMP_COLUMNS} data={data} onSave={onSave} onDelete={onDelete} />
            <div >
                <div className="insertButton">
                <Button type="primary" onClick={showModal}>
                    Add Employee
                </Button>
                </div>
                <Modal
                title="Add new Employee"
                visible={addEmployeeVisible}
                footer={null}
                onCancel={() => closeModal()}
                >
                    <AddEmployee />
                </Modal>
            </div>
       
        </div>
    )
}

export default Employees