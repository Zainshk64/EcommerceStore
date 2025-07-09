import React from "react";
import DynamicBreadcrumbs from "../DynamicBread";
import { Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="py-10" >


      <DynamicBreadcrumbs />
      </div>

      <div className="flex md:flex-row flex-col py-10 justify-center items-center gap-5" >
        <div className="py-10" >
          <div className="pb-5  border-b " >
            <div className='inline-flex items-center gap-4'  >
              <div className= " p-2 text-white bg-red-500 rounded-full" >

              <Phone className="h-6 w-6" />
              </div>
              <p className="text-xl" >Call to use</p>
            </div>
            <p className="text-gray-500" >
              We are available 24/7, 7 days a week. <br /> Phone: 02080894{" "}
            </p>
          </div>
           <div  className="pt-5" >
            <div className='inline-flex items-center gap-4'  >
              <div className= " p-2 text-white bg-red-500 rounded-full" >

              <Mail className="h-6 w-6" />
              </div>
              <p className="text-xl" >Write to Us</p>
            </div>
            <p className="text-gray-500" >
              Fill out our form and we will contact you within 24 hours.<br /> Emails: customer@exclusive.com{" "}
            </p>
          </div>
        </div>

        <div className="p-6 bg-gray-50 w-full md:w-1/2" >
          <div className="flex md:flex-row flex-col gap-4" >
            <input type="Firstname" className="bg-gray-200 p-3 rounded-md w-full "  placeholder="Your Name" />
            <input type="Firstname" placeholder="Your Email"  className="bg-gray-200 p-3 rounded-md w-full " />
            <input type="Firstname" placeholder="Your Phone" className="bg-gray-200 p-3 rounded-md w-full " />
          </div>
          <textarea name="" className="bg-gray-200 mt-5 p-3 rounded-md w-full " rows={5} cols={5} id=""></textarea>
          <button className="bg-red-500 text-white px-6 mt-5 py-2.5 rounded-md"  >Send</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
