import React, { useContext } from "react";
import logo from "../../assets/logo/anaf.svg";
import { TbSearch } from "react-icons/tb";
import ProfileMenu from "./ProfileMenu";
import { Link, NavLink } from "react-router-dom";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import { useCart } from "react-use-cart";
import MobileNav from "./MobileNav";
import { cartIcon } from "./icons/svgIcons";
const Navbar = () => {
  const { user } = useContext(AUTH_CONTEXT);
  const { totalUniqueItems } = useCart();

  return (
    <>
      <div className="bg-white shadow fixed top-0 z-20 w-full print:hidden">
        <nav className="myContainer md:py-3 py-4 relative">
          <div className="flex justify-between items-center">
            <div>
              <Link to="/">
                <img src={logo} className="md:w-28 w-20 h-12" alt="" />
              </Link>
            </div>
            {/* ul */}
            <ul className="md:flex hidden items-center space-x-5 font-semibold">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "bg-neutral-900 text-white rounded-sm" : undefined
                }
              >
                <li className="cursor-pointer uppercase py-1 px-2">Home</li>
              </NavLink>
              {/* product */}
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? "bg-neutral-900 text-white rounded-sm" : undefined
                }
              >
                <li className="cursor-pointer uppercase py-1 px-2">Shop</li>
              </NavLink>
              {/* orders */}
              {user?.email && (
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-neutral-900 text-white rounded-sm"
                      : undefined
                  }
                >
                  <li className="cursor-pointer uppercase py-1 px-2">Orders</li>
                </NavLink>
              )}
            </ul>
            {/* card and btn */}
            <div className="md:flex hidden items-center space-x-4">
              {/* cart */}
              <Link to="/search">
                <h2 className="cursor-pointer relative">
                  <TbSearch size={30} />
                </h2>
              </Link>
              <Link to="/cart">
                <h2 className="cursor-pointer relative">
                  {totalUniqueItems > 0 && (
                    <span className="absolute bg-black p-1 px-2 top-4 left-3 text-white rounded-full text-xs">
                      {totalUniqueItems}
                    </span>
                  )}
                  {/* <HiOutlineShoppingBag size={30} className="mb-1" /> */}
                  <span>{cartIcon()}</span>
                </h2>
              </Link>
              {!user?.email && (
                <>
                  <Link to="/login">
                    {" "}
                    <h2 className="cursor-pointer ">Login</h2>
                  </Link>
                  <Link to="/signUp">
                    <h2 className="cursor-pointer rounded-full bg-black text-white p-2 px-4">
                      Sign up
                    </h2>
                  </Link>
                </>
              )}
              {/* ---profile menu start---- */}
              {user?.email && <ProfileMenu />}
              {/* ---profile menu end---- */}
            </div>
            {/*--------------- phone menu start ----------------*/}
            {/* menu  icon */}
            <div className="md:hidden flex items-center space-x-2">
              {!user?.email && (
                <Link to="/login">
                  <h2 className="bg-black uppercase text-white text-xs py-[6px] px-3 rounded-sm">
                    Login
                  </h2>
                </Link>
              )}
              {/* search */}
              <Link to="/search">
                <h2 className="cursor-pointer relative">
                  <TbSearch size={30} />
                </h2>
              </Link>
              <Link to="/cart">
                <h2 className="cursor-pointer relative mb-1">
                  {totalUniqueItems > 0 && (
                    <span className="absolute bg-black p-1 px-2 top-[18px] right-0 text-white rounded-full text-xs">
                      {totalUniqueItems}
                    </span>
                  )}
                  {/* <HiOutlineShoppingBag size={32} /> */}
                  <span>{cartIcon()}</span>
                </h2>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* mobile nav */}

      <MobileNav />
    </>
  );
};

export default Navbar;
