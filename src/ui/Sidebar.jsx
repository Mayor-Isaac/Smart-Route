import SideList from './SideList';
import { HiX } from 'react-icons/hi';

export default function Sidebar({ isOpen, closeSidebar }) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 h-full w-72 border bg-gray-100 transition-transform duration-300 z-50 overflow-auto md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:block`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end p-4 md:hidden">
          <button 
            onClick={closeSidebar}
            className="text-green-600 text-2xl"
          >
            <HiX />
          </button>
        </div>
        
        <SideList closeSidebar={closeSidebar} />
      </div>
    </>
  );
}
