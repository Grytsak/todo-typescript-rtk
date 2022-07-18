import React from 'react'
import { Outlet  } from 'react-router-dom'
import Navigation  from './Navigation'


const MenuContainer = () => {

    return (
        <div>
            <Navigation />
            <Outlet />
        </div>
    )
}

export default MenuContainer