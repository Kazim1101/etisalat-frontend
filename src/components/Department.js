// libs
import React, { useEffect, useState, useCallback } from 'react'
// src
import { Modal, Button } from 'antd'
import { fetchDepartments, editDepartment, deleteDepartment } from '../actions/departmentAction'
import EditableTable from './common/EditableTable/EditableTable'
import AddDepartment from './AddDepartment'

const EMP_COLUMNS = [
  {
    title: 'Department Name',
    dataIndex: 'departmentName',
    width: '25%',
    editable: true,
  },
  {
    title: 'Manager Id',
    dataIndex: 'managerId',
    width: '25%',
    editable: true,
  }]

const Departments = ({

}) => {
    const [data, setData] = useState([])
    const [addDepartmentVisible, setaddDepartmentVisible] = useState(false)

    useEffect( () => {
        fetchDepartments().then((response) => {
            setData(response.map(item => ({
                ...item,
                key: item.deptId
            })))
        })
    }, [setData])

    const onSave = useCallback((item) => {
        editDepartment(item)
    }, [editDepartment])

    const onDelete = useCallback(async (deptId) => {
        await deleteDepartment(deptId)
    }, [deleteDepartment])

    const showModal = useCallback(() => {
        setaddDepartmentVisible(true)
    }, [setaddDepartmentVisible])

    const closeModal = useCallback(() => {
        setaddDepartmentVisible(false)
    }, [setaddDepartmentVisible])

    return (
        <div>
            <EditableTable  columns={EMP_COLUMNS} data={data} onSave={onSave} onDelete={onDelete} />
            <div >
                <div className="insertButton">
                <Button type="primary" onClick={showModal}>
                    Add Department
                </Button>
                </div>
                <Modal
                title="Add new Employee"
                visible={addDepartmentVisible}
                footer={null}
                onCancel={() => closeModal()}
                >
                    <AddDepartment />
                </Modal>
            </div>
       
        </div>
    )
}

export default Departments