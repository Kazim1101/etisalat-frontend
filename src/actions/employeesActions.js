const BASE_PATH = 'http://localhost:8080/employees'

export const fetchEmployees = async () => {
    const response = await fetch(BASE_PATH)
    console.log('response', response)
    return response.status ? await response.json(): []
}

export const editEmployee = async (employee) => {
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

export const addEmployees = async (employee) => {
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
export const deleteEmployee = async (key) => {
    const response = await fetch(`${BASE_PATH}/${key}`, {
        method: 'delete',
    })
    return response.data
}