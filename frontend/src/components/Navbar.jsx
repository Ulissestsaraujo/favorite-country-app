import { Link, useLocation, useNavigate } from "react-router-dom";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useContext } from "react";
import AuthenticationContext from "../context/AuthenticationContext";

const Navbar = () => {
  const { logout, userId } = useContext(AuthenticationContext);
  const goTo = useNavigate();
  const location = useLocation();

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-end border-b border-zinc-200">
          <div className="h-full flex  items-center space-x-4">
            {userId ? (
              <>
                <Link
                  to="/"
                  className={`${
                    location.pathname === "/"
                      ? " p-2 border border-[#D2D2D2] border-full bg-[#D2D2D2] rounded-full"
                      : ""
                  }`}
                >
                  Countries List
                </Link>
                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
                <Link
                  to="/favorites"
                  className={`${
                    location.pathname === "/favorites"
                      ? "p-2 border border-[#D2D2D2] border-full bg-[#D2D2D2] rounded-full"
                      : ""
                  }`}
                >
                  Favorites
                </Link>
                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
                <Link
                  to="/"
                  onClick={() => {
                    logout();
                    goTo("/");
                  }}
                >
                  Sign out
                </Link>
              </>
            ) : (
              <>
                <Link
                  className={`${
                    location.pathname === "/register"
                      ? " p-2 border border-[#D2D2D2] border-full bg-[#D2D2D2] rounded-full"
                      : ""
                  }`}
                  to="/register"
                >
                  Sign up
                </Link>
                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
                <Link
                  className={`${
                    location.pathname === "/login"
                      ? " p-2 border border-[#D2D2D2] border-full bg-[#D2D2D2] rounded-full"
                      : ""
                  }`}
                  to="/login"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
