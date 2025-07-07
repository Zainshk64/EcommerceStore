import React from "react";
import Layout from "../../Layout/Layout";
import DynamicBreadcrumbs from "../DynamicBread";
import aboutimg from "../../assets/aboutimg.jpg";
const About = () => {
  return (
    <div className="px-4 md:px-16 lg:px-24 xl:px-32">
      <DynamicBreadcrumbs />
      <div className="flex py-5 md:flex-row  flex-col justify-between items-center" >
        <div className="w-full mb-5 md:w-1/2" >
          <h1 className="font-medium text-4xl">Our Story</h1>
          <p className="text-gray-500 mt-4" >
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.{" "}
          </p>
          <br />
          <p className="text-gray-500">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="w-full md:w-2/5">
          <img src={aboutimg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default About;
