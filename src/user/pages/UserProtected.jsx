import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const UserProtected = ({ compo }) => {
    const { user, userGoogle } = useSelector(state => state.auth)
    return user || userGoogle ? compo : <Navigate to="/userLogin" />
}

export default UserProtected