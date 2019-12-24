const BASE_PATH = 'http://localhost:8080/departments'

export const fetchDepartments = async () => {
    const response = await fetch(BASE_PATH)
    console.log('response', response)
    return response.status ? await response.json(): []
}

export const editDepartment = async (employee) => {
    const response = await fetch(`${BASE_PATH}/${employee.key}`, {
        method: 'PUT',
        body: JSON.stringify({
            empId: employee.key,
            ...employee
        }),
        headers: {
            'content-type': 'application/json'
        }
    })

    return response.data
}

export const addDepartments = async (employee) => {
    const response = await fetch(BASE_PATH, {
        method: 'post',
        body: JSON.stringify({
            ...employee,
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
    return response.data
}
export const deleteDepartment = async (key) => {
    const response = await fetch(`${BASE_PATH}/${key}`, {
        method: 'delete',
    })
    return response.data
}