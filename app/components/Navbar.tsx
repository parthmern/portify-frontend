import Profile from "./Profile";


export default function Navbar () {
  return (
    <div className="pt-8">
      <div className="border-[0.3px] blurBg flex items-center rounded-md border-[#ffffff] border-opacity-20 px-4 py-4 mx-10 justify-between">
        <p className="font-semibold text-xl">Portify</p>
        <Profile />
    </div>
    </div>
  )
}
