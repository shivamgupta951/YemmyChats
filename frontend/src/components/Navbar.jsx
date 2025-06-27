import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Cookie, LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80 rounded-md"
    >
      <div className="container mx-auto px-2 h-10">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8 outline outline-2 outline-base-300 rounded-md px-2">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-5 rounded-lg bg-primary/10 flex items-center justify-center">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold">Yemmy Chats</h3>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;