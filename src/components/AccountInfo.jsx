import React from 'react'
import DynamicBreadcrumbs from './DynamicBread'

const AccountInfo = () => {
    const User = localStorage.getItem('user');
    console.log(User);
    
  return (
       <div className="px-4 md:px-16 lg:px-24 xl:px-32">
        <div>

          <DynamicBreadcrumbs />
          <div>
            {/* {User.firstName} */}

          </div>
        </div>
    </div>
  )
}

export default AccountInfo