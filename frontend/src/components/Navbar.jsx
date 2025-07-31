import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Atom, Cookie, LogOut, Mail, MessageSquare, Settings, User, Menu, X } from "lucide-react";
import YemmyChat_logo from "../assets/YemmyChat_logo.png";
import { useState } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
      backdrop-blur-lg bg-base-100/80 rounded-md"
    >
      <div className="container mx-auto px-4 py-2">
        {/* Main Navbar Row */}
        <div className="flex items-center justify-between">
          {/* Left: Logo and Name */}
          <div className="flex items-center gap-2 outline outline-2 outline-base-300 rounded-md px-2 py-1">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-5 rounded-lg bg-primary/10 flex items-center justify-center">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold hidden sm:block">Yemmy Chats</h3>
            </Link>
            <img
              src={YemmyChat_logo}
              alt="Yemmy Chats Logo"
              className="size-8 mx-2 rounded-lg"
            />
          </div>

          {/* Center: Project Description - Hidden on mobile */}
          <div className="hidden md:block text-center text-sm italic font-medium leading-snug">
            <span className="font-bold">Yemmy Chats</span> – Created with ❤️ and amazing features<br />
            Share your memories with Companions and Family ✨
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-sm btn-ghost"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/about" className="btn btn-sm gap-2 border border-base-content">
              <Atom className="w-4 h-4" />
              <span>About</span>
            </Link>
            
            <Link to="/settings" className="btn btn-sm gap-2 border border-base-content">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to="/profile" className="btn btn-sm gap-2 border border-base-content">
                  <User className="size-5" />
                  <span>Profile</span>
                </Link>

                <Link to="/contact" className="btn btn-sm gap-2 border border-base-content">
                  <Mail className="size-5" />
                  <span>Contact</span>
                </Link>

                <button className="btn btn-sm gap-2 border border-base-content" onClick={logout}>
                  <LogOut className="size-5" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 pb-2">
            <div className="flex flex-col gap-2">
              {/* Mobile Project Description */}
              <div className="text-center text-xs italic font-medium mb-2">
                <span className="font-bold">Yemmy Chats</span> – Created with ❤️ and amazing features
              </div>

              <Link 
                to="/about" 
                className="btn btn-sm gap-2 justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <Atom className="w-4 h-4" />
                <span>About</span>
              </Link>
              
              <Link 
                to="/settings" 
                className="btn btn-sm gap-2 justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>

              {authUser && (
                <>
                  <Link 
                    to="/profile" 
                    className="btn btn-sm gap-2 justify-start"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="size-5" />
                    <span>Profile</span>
                  </Link>

                  <Link 
                    to="/contact" 
                    className="btn btn-sm gap-2 justify-start"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Mail className="size-5" />
                    <span>Contact</span>
                  </Link>

                  <button 
                    className="btn btn-sm gap-2 justify-start" 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="size-5" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;