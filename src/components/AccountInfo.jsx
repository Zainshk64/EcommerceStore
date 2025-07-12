import React from "react";
import DynamicBreadcrumbs from "./DynamicBread";
import UserTabs from "./UserTabs";

const AccountInfo = () => {
  const User = JSON.parse(localStorage.getItem("user"));
  const UserName = `${User.firstName} ${User.lastName} `;

  return (
    <div className="px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="flex py-10 justify-between">
        <DynamicBreadcrumbs />
        <div className="text-md">
          Welcome
          <span className="text-red-500 font-medium ml-2 uppercase ">
            {UserName}
          </span>
        </div>
      </div>
      <div className="py-10" >

      <UserTabs/>
      </div>
    </div>
  );
};

export default AccountInfo;
