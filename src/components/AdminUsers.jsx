import React, { useEffect } from 'react'
import { useBlockUsersMutation, useGetAllUsersQuery, useUnblockUsersMutation } from '../redux/apis/adminApi'
import { toast } from 'react-toastify'

const AdminUsers = () => {
    const { data } = useGetAllUsersQuery()
    const [blockUser, { isSuccess: BlockSuccess }] = useBlockUsersMutation()
    const [unBlockUser, { isSuccess: UnblockSuccess }] = useUnblockUsersMutation()

    useEffect(() => {
        if (BlockSuccess) {
            toast.success("user block success")
        }
    }, [BlockSuccess])
    useEffect(() => {
        if (UnblockSuccess) {
            toast.success("user unblock success")
        }
    }, [UnblockSuccess])
    return <>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

        <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Orders</th>
                    <th>Active</th>
                </tr>
            </thead>
            <tbody>
                {
                    data && data.map(item => <tr>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>
                            <button className="btn btn-primary">Show Orders</button>
                        </td>
                        <td>
                            {
                                item.active
                                    ? <button onClick={e => blockUser(item._id)} className="btn btn-error">Block</button>
                                    : <button onClick={
                                        e => unBlockUser(item._id)
                                    } className="btn btn-success">Unblock</button>
                            }
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    </>
}

export default AdminUsers