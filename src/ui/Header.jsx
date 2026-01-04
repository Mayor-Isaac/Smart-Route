import { AiOutlineCaretLeft } from "react-icons/ai";
import { BiCaretRight } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa6";
import { HiMenu } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate();
  const currHour = new Date().getHours();
  const greetings =
    currHour < 12
      ? 'Morning'
      : currHour >= 12 && currHour < 17
      ? 'Afternoon'
        : 'Evening';
  const location = useLocation();

  return (
    <div className="flex items-center justify-between px-2  py-4 ">
      <h1 
        className="text-base font-bold uppercase flex items-center gap-3 cursor-pointer transition"
        
      >
        {location.pathname !== "/home" && <span className="hover:text-green-600 animate-pulse" onClick={()=> navigate(-1)} ><FaArrowLeft /></span>}
        Smart Route
      </h1>
      <div className="flex items-center gap-20">
        <p>
          Good {greetings}{' '}
          <span className="font-bold text-green-500">User,</span>
        </p>
        <div
          className="cursor-pointer font-bold text-green-500 text-2xl md:hidden"
          onClick={toggleSidebar}
        >
          <HiMenu />
        </div>
      </div>
    </div>
  );
}
