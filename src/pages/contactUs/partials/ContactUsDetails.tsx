import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail } from 'lucide-react';
import { useGetContactUsDetails } from '../hooks/useGetContactUsDetails';
import { MdDashboard } from 'react-icons/md';

const ContactUsDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetContactUsDetails({ id: id! });

  const handleBack = () => {
    window.history.back();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-gray-50 min-h-screen">
        <div className="text-gray-500 text-lg animate-pulse">Loading contact details...</div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex justify-center items-center bg-gray-50 min-h-screen">
        <div className="font-medium text-red-600 text-lg">Failed to load contact details</div>
      </div>
    );
  }

  return (
    <div className="px-2 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center bg-white shadow-sm mb-6 px-6 py-4 rounded-md">
        <h1 className="font-semibold text-gray-800 text-xl">Contact Us Details</h1>
        <nav className="flex items-center space-x-2 text-gray-600 text-sm">
          <MdDashboard size={16} className="text-red-500" />
          <span className="mx-1">›</span>
          <span className="font-bold">Contact Us</span>
        </nav>
      </div>

      {/* Card */}
      <div className="bg-white shadow-md rounded-md overflow-hidden">
        {/* Card Header */}
        <div className="flex justify-between items-center px-6 py-4 border-gray-200 border-b">
          <div>
            <h2 className="font-semibold text-gray-800 text-lg">Contact Information</h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleBack}
              className="hover:bg-gray-100 p-2 rounded-full transition-colors"
              title="Go back"
            >
              <ArrowLeft size={20} className="text-red-500" />
            </button>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mb-8">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User size={18} className="text-red-500" />
                <div>
                  <p className="text-gray-600 text-xs">Name</p>
                  <p className="font-medium text-gray-900 text-xs">{data?.data?.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-red-500" />
                <div>
                  <p className="text-gray-600 text-xs">Email</p>
                  <p className="font-medium text-gray-900 text-xs">{data?.data?.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-red-500" />
                <div>
                  <p className="text-gray-600 text-xs">Phone</p>
                  <p className="font-medium text-gray-900 text-xs">{data?.data?.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-medium text-gray-700 text-xs">Message</h3>
            <div className="bg-gray-50 p-4 border border-gray-200 rounded-md min-h-[80px]">
              {data?.data?.message ? (
                <p className="text-gray-800 text-xs leading-relaxed">{data?.data?.message}</p>
              ) : (
                <p className="text-gray-400 italic">No message provided</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsDetails;
