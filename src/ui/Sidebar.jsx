import SideList from './SideList';

export default function Sidebar({ closeBar }) {
  return (
    <div
      className="w-72 border bg-gray-100 transition h-100 overflow-auto hidden md:block"
    >
      
      <SideList />
    </div>
  );
}
