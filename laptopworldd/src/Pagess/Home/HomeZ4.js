import React from 'react';
import { ReactComponent as FreeShippingIcon } from '../Home/freeshipping.svg';
import { ReactComponent as Genuine } from '../Home/genuine.svg';
import { ReactComponent as Easyy } from '../Home/easy-return.svg';
import { ReactComponent as Secure } from '../Home/secure-payment.svg';
import { FaPhone, FaComments, FaMapMarkerAlt } from 'react-icons/fa';

function HomeZ4() {
  const features = [
    { icon: FreeShippingIcon, title: "Free Shipping", description: "Free Shipping All Over Nepal" },
    { icon: Genuine, title: "100% Genuine", description: "We Sell 100% Genuine Products" },
    { icon: Easyy, title: "Easy Return Policy", description: "3 Days Easy Return Policy" },
    { icon: Secure, title: "Secure Payment", description: "Shop Online Without Hesitation" },
  ];

  return (
    <>
      <div className="container mx-auto px-4 py-8 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <span className="mb-2">
                <feature.icon className="w-12 h-12" />
              </span>
              <h3 className="font-bold mb-1 text-lg">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information Bar */}
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <p className="text-gray-500 text-xs mb-1">Sales & expert advice</p>
              <p className="font-semibold text-gray-700 text-2xl">01.532.7800</p>
              <p className="text-gray-500 text-xs">or</p>
              <p className="font-semibold text-gray-700 text-2xl">980.287.0861</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-gray-600">
              <span className="flex items-center mb-2 md:mb-0">
                <FaPhone className="mr-2 text-lg" /> CONTACT
              </span>
              <span className="flex items-center mb-2 md:mb-0">
                <FaComments className="mr-2 text-lg" /> 24/7 CHAT SUPPORT
              </span>
              <span className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-lg" /> NEPAL, KATHMANDU
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-900 py-2 text-center text-white">
        <p>Copyright ©2024 LaptopWorld Pvt. Ltd. All rights reserved.</p>
      </div>
    </>
  );
}

export default HomeZ4;
