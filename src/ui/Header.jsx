import { HiMenu } from "react-icons/hi";

export default function Header({ toggleSidebar }) {
  const currHour = new Date().getHours();
  const greetings =
    currHour < 12
      ? 'Morning'
      : currHour >= 12 && currHour < 17
      ? 'Afternoon'
        : 'Evening';

  return (
    <div className="flex items-center justify-between px-2  py-4 ">
      <h1 className=" text-base font-bold uppercase">Smart Route</h1>
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
