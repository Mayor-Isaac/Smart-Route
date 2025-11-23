import { HiMenu } from "react-icons/hi";

export default function Header() {
  const currHour = new Date().getHours();
  const greetings =
    currHour < 12
      ? 'Morning'
      : currHour >= 12 && currHour < 17
      ? 'Afternoon'
        : 'Evening';
  
  // <div className="flex items-center justify-between border-b border-green-400 px-4 py-3 text-green-600">
  //   <h1 className=" text-base font-bold uppercase">Smart Route</h1>
  //   <Close closeBar={closeBar} />
  // </div>;
  return (
    <div className="flex items-center justify-between border border-green-500 px-2  py-4 ">
      <h1 className=" text-base font-bold uppercase">Smart Route</h1>
      <div className="flex items-center gap-20">
        <p>
          Good {greetings}{' '}
          <span className="font-bold text-green-500">Feranmi,</span>
        </p>
        <div
          className="cursor-pointer font-bold text-green-500"
        >
          <HiMenu />
        </div>
      </div>
    </div>
  );
}
