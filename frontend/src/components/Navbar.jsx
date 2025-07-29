import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Atom, Cookie, LogOut, Mail, MessageSquare, Settings, User } from "lucide-react";
import YemmyChat_logo from "../assets/YemmyChat_logo.png";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80 rounded-md"
    >
      <div className="container mx-auto px-2 h-auto py-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

          {/* Left: Logo and Name */}
          <div className="flex items-center gap-2 outline outline-2 outline-base-300 rounded-md px-2 py-1">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-5 rounded-lg bg-primary/10 flex items-center justify-center">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold">Yemmy Chats</h3>
            </Link>
            <img
              src={YemmyChat_logo}
              alt="Yemmy Chats Logo"
              className="size-8 mx-2 rounded-lg"
            />
          </div>

          {/* Center: Project Description */}
          <div className={`text-center text-sm md:italic font-medium leading-snug`}>
            <span className="font-bold">Yemmy Chats</span> – Created with ❤️ and amazing features<br />
            Share your memories with Companions and Family ✨
          </div>

          {/* Right: Buttons */}
          <div className="flex items-center gap-2 justify-end">
            <Link to="/about" className="btn btn-sm gap-2 border border-base-content">
              <Atom className="w-4 h-4" />
              <span className="hidden sm:inline">About</span>
            </Link>
            
            <Link to="/settings" className="btn btn-sm gap-2 border border-base-content">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to="/profile" className="btn btn-sm gap-2 border border-base-content">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <Link to="/contact" className="btn btn-sm gap-2 border border-base-content">
                  <Mail className="size-5" />
                  <span className="hidden sm:inline">Contact</span>
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
