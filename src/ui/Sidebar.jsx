import SideList from './SideList';
import Close from './Close';

export default function Sidebar({ closeBar }) {
  return (
    <div
      className="w-72 border bg-gray-100 transition h-100 overflow-auto"
    >
      
      <SideList />
    </div>
  );
}
