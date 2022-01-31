import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/context/auth/authContext";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { sessionExpiredToast } from "@/utils/toasts";

// Component imports
import Backdrop from "@/components/common/Backdrop";

const variants = {
  initial: { x: "100vw" },
  animate: {
    x: 0,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    x: "100vw",
  },
};

const menu = (
  <svg
    className="w-8 h-8"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const cancel = (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
      color="white"
    ></path>
  </svg>
);

const logoutToast = () => {
  toast("See you soon! 👋", {
    draggablePercent: 60,
  });
};

const Navbar = ({ textColor }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [loggedInState, setLoggedInState] = useState(
    typeof window !== "undefined" &&
      localStorage.getItem("__ros__listing__token")
  );

  const router = useRouter();
  const pathname = router.pathname;

  const authContext = useContext(AuthContext);

  const { logout, getCurrentUser, user, authError } = authContext;

  const handleLogout = () => {
    logoutToast();
    setTimeout(() => logout(), 1000);
  };

  useEffect(() => {
    if (loggedInState) getCurrentUser();
  }, []);

  // Check for an invalid / expired token
  useEffect(() => {
    if (authError === "Sorry! We could not validate those credentials") {
      logout();
      sessionExpiredToast();
      setTimeout(() => router.push("/account/login"), 2000);
    }
  }, [authError]);

  return (
    <header className="print:hidden">
      <nav className="relative">
        <div className="h-[100] w-full py-5 pl-5 pr-0 flex justify-between items-center absolute z-30">
          <Link href="/">
            <a>
              <Image src="/logo.png" alt="Logo" width={90} height={55} />
            </a>
          </Link>
          <div className="hidden md:block">
            <ul className="md:flex justify-around items-center">
              {pathname === "/" && (
                <>
                  <li className="bg-black bg-opacity-50 px-3 py-2 hover:bg-black cursor-pointer transition-colors duration-200 ease-in-out">
                    <Link href="/listings/create">
                      <a
                        className={`uppercase font-semibold tracking-wide text-lg md:text-sm lg:text-base ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        Create Free Listing
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#how-it-works">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        How It Works
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/faqs">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        FAQ<span className="lowercase">s</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    {loggedInState && loggedInState ? (
                      <Link href={`/account/dashboard/${user && user.id}`}>
                        <a
                          className={`nav-link uppercase ${
                            textColor ? "text-" + textColor : "text-white"
                          } hover:decoration-inherit`}
                        >
                          Dashboard
                        </a>
                      </Link>
                    ) : (
                      <Link href="/account/login">
                        <a
                          className={`nav-link uppercase ${
                            textColor ? "text-" + textColor : "text-white"
                          } hover:decoration-inherit`}
                        >
                          Login
                        </a>
                      </Link>
                    )}
                  </li>
                  {!loggedInState && (
                    <li>
                      <Link href="/account/register">
                        <a
                          className={`nav-link uppercase ${
                            textColor ? "text-" + textColor : "text-white"
                          } hover:decoration-inherit`}
                        >
                          Sign Up
                        </a>
                      </Link>
                    </li>
                  )}
                  <li>
                    {loggedInState && loggedInState && (
                      <Link href="#">
                        <a
                          className={`nav-link uppercase ${
                            textColor ? "text-" + textColor : "text-white"
                          } hover:decoration-inherit`}
                          onClick={() => handleLogout()}
                        >
                          Logout
                        </a>
                      </Link>
                    )}
                  </li>
                </>
              )}

              {(pathname.includes("/listings/modify") ||
                pathname === "/listings/create") && (
                <>
                  <li>
                    <Link href="/">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        Home
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/faqs">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        FAQ<span className="lowercase">s</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/account/dashboard/${user && user.id}`}>
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        Dashboard
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href="#">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                        onClick={() => handleLogout()}
                      >
                        Logout
                      </a>
                    </Link>
                  </li>
                </>
              )}

              {pathname === "/account/dashboard/[id]" && (
                <>
                  <li>
                    <Link href="/">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        Home
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/faqs">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        FAQ<span className="lowercase">s</span>
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/listings/create">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        Create Free Listing
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                        onClick={() => handleLogout()}
                      >
                        Logout
                      </a>
                    </Link>
                  </li>
                </>
              )}

              {pathname === "/account/login" && (
                <>
                  <li>
                    <Link href="/">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        Home
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/faqs">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        FAQ<span className="lowercase">s</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/account/register">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        Sign up
                      </a>
                    </Link>
                  </li>
                </>
              )}

              {pathname === "/account/register" && (
                <>
                  <li>
                    <Link href="/">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        Home
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/faqs">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        FAQ<span className="lowercase">s</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/account/login">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        Login
                      </a>
                    </Link>
                  </li>
                </>
              )}

              {(pathname === "/listings/[apartment]" ||
                pathname === "/ad/[id]") && (
                <>
                  <li>
                    <Link href="/">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        Home
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/faqs">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        FAQ<span className="lowercase">s</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    {loggedInState && loggedInState ? (
                      <Link href={`/account/dashboard/${user && user.id}`}>
                        <a
                          className={`nav-link uppercase ${
                            textColor ? "text-" + textColor : "text-white"
                          } hover:decoration-inherit`}
                        >
                          Dashboard
                        </a>
                      </Link>
                    ) : (
                      <Link href="/account/login">
                        <a
                          className={`nav-link uppercase ${
                            textColor ? "text-" + textColor : "text-white"
                          } hover:decoration-inherit`}
                        >
                          Login
                        </a>
                      </Link>
                    )}
                  </li>
                  <li>
                    {loggedInState && loggedInState ? (
                      <Link href="/listings/create">
                        <a
                          className={`nav-link uppercase ${
                            textColor ? "text-" + textColor : "text-white"
                          } hover:decoration-inherit`}
                        >
                          Create Free Listing
                        </a>
                      </Link>
                    ) : (
                      <Link href="/account/register">
                        <a
                          className={`nav-link uppercase ${
                            textColor ? "text-" + textColor : "text-white"
                          } hover:decoration-inherit`}
                        >
                          Sign Up
                        </a>
                      </Link>
                    )}
                  </li>
                  <li>
                    {loggedInState && loggedInState && (
                      <Link href="#">
                        <a
                          className={`nav-link uppercase ${
                            textColor ? "text-" + textColor : "text-white"
                          } hover:decoration-inherit`}
                          onClick={() => handleLogout()}
                        >
                          Logout
                        </a>
                      </Link>
                    )}
                  </li>
                </>
              )}

              {pathname === "/forgotpassword" && (
                <>
                  <li>
                    <Link href="/">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        Home
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/faqs">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        FAQ<span className="lowercase">s</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/account/login">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        Login
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/account/register">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                        onClick={() => handleLogout()}
                      >
                        Sign up
                      </a>
                    </Link>
                  </li>
                </>
              )}

              {(pathname === "/policy" || pathname === "/faqs") && (
                <>
                  <li>
                    <Link href="/">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        Home
                      </a>
                    </Link>
                  </li>
                  {/* <li>
                    <Link href="/faqs">
                      <a
                        className={`nav-link uppercase ${
                          textColor ? "text-" + textColor : "text-white"
                        } hover:decoration-inherit`}
                      >
                        FAQ<span className="lowercase">s</span>
                      </a>
                    </Link>
                  </li> */}
                  <li>
                    {loggedInState && loggedInState ? (
                      <Link href={`/account/dashboard/${user && user.id}`}>
                        <a
                          className={`nav-link uppercase ${
                            textColor ? "text-" + textColor : "text-white"
                          } hover:decoration-inherit`}
                        >
                          Dashboard
                        </a>
                      </Link>
                    ) : (
                      <Link href="/account/login">
                        <a
                          className={`nav-link uppercase ${
                            textColor ? "text-" + textColor : "text-white"
                          } hover:decoration-inherit`}
                        >
                          Login
                        </a>
                      </Link>
                    )}
                  </li>
                  <li>
                    {loggedInState && loggedInState ? (
                      <Link href="/listings/create">
                        <a
                          className={`nav-link uppercase ${
                            textColor ? "text-" + textColor : "text-white"
                          } hover:decoration-inherit`}
                        >
                          Create Free Listing
                        </a>
                      </Link>
                    ) : (
                      <Link href="/account/register">
                        <a
                          className={`nav-link uppercase ${
                            textColor ? "text-" + textColor : "text-white"
                          } hover:decoration-inherit`}
                        >
                          Sign Up
                        </a>
                      </Link>
                    )}
                  </li>
                </>
              )}
            </ul>
          </div>

          {!showMenu && (
            <div className="menu-icon bg-teal-50 -mt-2 mr-10">
              <span onClick={() => setShowMenu(true)}>{menu}</span>
            </div>
          )}
        </div>

        <AnimatePresence exitBeforeEnter>
          {showMenu && (
            <Backdrop onClick={() => setShowMenu(false)}>
              <motion.div
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="fixed h-screen w-2/3 bg-gradient-to-b from bg-zinc-200 via-slate-100 to-gray-50 top-0 right-0 px-5 py-10 md:hidden shadow-2xl z-30"
              >
                <div>
                  <div className="flex justify-end items-center pr-5">
                    {/* <Image src="/logo.png" alt="Logo" width={90} height={55} /> */}
                    <div
                      className="menu-icon bg-slate-700 -mt-2 -mr-5"
                      onClick={() => setShowMenu(false)}
                    >
                      <span>{cancel}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-6">
                  <Link href="/">
                    <a>
                      <Image
                        src="/logo.png"
                        alt="Logo"
                        width={130}
                        height={85}
                      />
                    </a>
                  </Link>
                </div>

                <ul className="text-center">
                  {pathname === "/" && (
                    <>
                      <li className="my-7">
                        <Link href="#how-it-works">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                            onClick={() => setShowMenu(false)}
                          >
                            How It Works
                          </a>
                        </Link>
                      </li>
                      <li className="my-7">
                        <Link href="/faqs">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                          >
                            FAQ<span className="lowercase">s</span>
                          </a>
                        </Link>
                      </li>
                      <li className="my-7">
                        {loggedInState && loggedInState ? (
                          <Link href={`/account/dashboard/${user && user.id}`}>
                            <a
                              className={`nav-link uppercase ${
                                textColor
                                  ? "text-" + textColor
                                  : "text-gray-900"
                              } hover:text-teal-600`}
                            >
                              Dashboard
                            </a>
                          </Link>
                        ) : (
                          <Link href="/account/login">
                            <a
                              className={`nav-link uppercase ${
                                textColor
                                  ? "text-" + textColor
                                  : "text-gray-900"
                              } hover:text-teal-600`}
                            >
                              Login
                            </a>
                          </Link>
                        )}
                      </li>
                      <li className="my-7">
                        {loggedInState && loggedInState ? (
                          <Link href="/listings/create">
                            <a
                              className={`nav-link uppercase ${
                                textColor
                                  ? "text-" + textColor
                                  : "text-gray-900"
                              } hover:text-teal-600`}
                            >
                              Create Free Listing
                            </a>
                          </Link>
                        ) : (
                          <Link href="/account/register">
                            <a
                              className={`nav-link uppercase ${
                                textColor
                                  ? "text-" + textColor
                                  : "text-gray-900"
                              } hover:text-teal-600`}
                            >
                              Sign Up
                            </a>
                          </Link>
                        )}
                      </li>
                      <li>
                        {loggedInState && loggedInState && (
                          <Link href="#">
                            <a
                              className={`nav-link uppercase ${
                                textColor
                                  ? "text-" + textColor
                                  : "text-gray-900"
                              } hover:text-teal-600`}
                              onClick={() => handleLogout()}
                            >
                              Logout
                            </a>
                          </Link>
                        )}
                      </li>
                    </>
                  )}

                  {pathname === "/account/dashboard/[id]" && (
                    <>
                      <li className="my-7">
                        <Link href="/">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                            onClick={() => setShowMenu(false)}
                          >
                            Home
                          </a>
                        </Link>
                      </li>
                      <li className="my-7">
                        <Link href="/faqs">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                          >
                            FAQ<span className="lowercase">s</span>
                          </a>
                        </Link>
                      </li>

                      <li className="my-7">
                        <Link href="/listings/create">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                          >
                            Create Free Listing
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                            onClick={() => handleLogout()}
                          >
                            Logout
                          </a>
                        </Link>
                      </li>
                    </>
                  )}

                  {pathname === "/account/login" && (
                    <>
                      <li className="my-7">
                        <Link href="/">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                            onClick={() => setShowMenu(false)}
                          >
                            Home
                          </a>
                        </Link>
                      </li>
                      <li className="my-7">
                        <Link href="/faqs">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                          >
                            FAQ<span className="lowercase">s</span>
                          </a>
                        </Link>
                      </li>
                      <li className="my-7">
                        <Link href="/account/register">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                          >
                            Sign up
                          </a>
                        </Link>
                      </li>
                    </>
                  )}

                  {pathname === "/account/register" && (
                    <>
                      <li className="my-7">
                        <Link href="/">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                            onClick={() => setShowMenu(false)}
                          >
                            Home
                          </a>
                        </Link>
                      </li>
                      <li className="my-7">
                        <Link href="/faqs">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                          >
                            FAQ<span className="lowercase">s</span>
                          </a>
                        </Link>
                      </li>
                      <li className="my-7">
                        <Link href="/account/login">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                          >
                            Login
                          </a>
                        </Link>
                      </li>
                    </>
                  )}

                  {(pathname.includes("/listings/modify") ||
                    pathname === "/listings/create") && (
                    <>
                      <li className="my-7">
                        <Link href="/">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                            onClick={() => setShowMenu(false)}
                          >
                            Home
                          </a>
                        </Link>
                      </li>
                      <li className="my-7">
                        <Link href="/faqs">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                          >
                            FAQ<span className="lowercase">s</span>
                          </a>
                        </Link>
                      </li>
                      <li className="my-7">
                        <Link href={`/account/dashboard/${user && user.id}`}>
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                          >
                            Dashboard
                          </a>
                        </Link>
                      </li>

                      <li>
                        <Link href="#">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                            onClick={() => handleLogout()}
                          >
                            Logout
                          </a>
                        </Link>
                      </li>
                    </>
                  )}

                  {(pathname === "/listings/[apartment]" ||
                    pathname === "/ad/[id]") && (
                    <>
                      <li className="my-7">
                        <Link href="/">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                            onClick={() => setShowMenu(false)}
                          >
                            Home
                          </a>
                        </Link>
                      </li>
                      <li className="my-7">
                        <Link href="/faqs">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                          >
                            FAQ<span className="lowercase">s</span>
                          </a>
                        </Link>
                      </li>
                      <li className="my-7">
                        {loggedInState && loggedInState ? (
                          <Link href={`/account/dashboard/${user && user.id}`}>
                            <a
                              className={`nav-link uppercase ${
                                textColor
                                  ? "text-" + textColor
                                  : "text-gray-900"
                              } hover:text-teal-600`}
                            >
                              Dashboard
                            </a>
                          </Link>
                        ) : (
                          <Link href="/account/login">
                            <a
                              className={`nav-link uppercase ${
                                textColor
                                  ? "text-" + textColor
                                  : "text-gray-900"
                              } hover:text-teal-600`}
                            >
                              Login
                            </a>
                          </Link>
                        )}
                      </li>
                      <li className="my-7">
                        {loggedInState && loggedInState ? (
                          <Link href="/listings/create">
                            <a
                              className={`nav-link uppercase ${
                                textColor
                                  ? "text-" + textColor
                                  : "text-gray-900"
                              } hover:text-teal-600`}
                            >
                              Create Free Listing
                            </a>
                          </Link>
                        ) : (
                          <Link href="/account/register">
                            <a
                              className={`nav-link uppercase ${
                                textColor
                                  ? "text-" + textColor
                                  : "text-gray-900"
                              } hover:text-teal-600`}
                            >
                              Sign Up
                            </a>
                          </Link>
                        )}
                      </li>
                      <li>
                        {loggedInState && loggedInState && (
                          <Link href="#">
                            <a
                              className={`nav-link uppercase ${
                                textColor
                                  ? "text-" + textColor
                                  : "text-gray-900"
                              } hover:text-teal-600`}
                              onClick={() => handleLogout()}
                            >
                              Logout
                            </a>
                          </Link>
                        )}
                      </li>
                    </>
                  )}

                  {pathname === "/forgotpassword" && (
                    <>
                      <li className="my-7">
                        <Link href="/">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                            onClick={() => setShowMenu(false)}
                          >
                            Home
                          </a>
                        </Link>
                      </li>
                      <li className="my-7">
                        <Link href="/faqs">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                          >
                            FAQ<span className="lowercase">s</span>
                          </a>
                        </Link>
                      </li>
                      <li className="my-7">
                        <Link href="/account/login">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                          >
                            Login
                          </a>
                        </Link>
                      </li>

                      <li>
                        <Link href="/account/register">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                            onClick={() => handleLogout()}
                          >
                            Register
                          </a>
                        </Link>
                      </li>
                    </>
                  )}

                  {(pathname === "/policy" || pathname === "/faqs") && (
                    <>
                      <li className="my-7">
                        <Link href="/">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                            onClick={() => setShowMenu(false)}
                          >
                            Home
                          </a>
                        </Link>
                      </li>
                      {/* <li className="my-7">
                        <Link href="/faqs">
                          <a
                            className={`nav-link uppercase ${
                              textColor ? "text-" + textColor : "text-gray-900"
                            } hover:text-teal-600`}
                          >
                            FAQ<span className="lowercase">s</span>
                          </a>
                        </Link>
                      </li> */}
                      <li className="my-7">
                        {loggedInState && loggedInState ? (
                          <Link href={`/account/dashboard/${user && user.id}`}>
                            <a
                              className={`nav-link uppercase ${
                                textColor
                                  ? "text-" + textColor
                                  : "text-gray-900"
                              } hover:text-teal-600`}
                            >
                              Dashboard
                            </a>
                          </Link>
                        ) : (
                          <Link href="/account/login">
                            <a
                              className={`nav-link uppercase ${
                                textColor
                                  ? "text-" + textColor
                                  : "text-gray-900"
                              } hover:text-teal-600`}
                            >
                              Login
                            </a>
                          </Link>
                        )}
                      </li>
                      <li className="my-7">
                        {loggedInState && loggedInState ? (
                          <Link href="/listings/create">
                            <a
                              className={`nav-link uppercase ${
                                textColor
                                  ? "text-" + textColor
                                  : "text-gray-900"
                              } hover:text-teal-600`}
                            >
                              Create Free Listing
                            </a>
                          </Link>
                        ) : (
                          <Link href="/account/register">
                            <a
                              className={`nav-link uppercase ${
                                textColor
                                  ? "text-" + textColor
                                  : "text-gray-900"
                              } hover:text-teal-600`}
                            >
                              Sign Up
                            </a>
                          </Link>
                        )}
                      </li>
                    </>
                  )}
                </ul>
              </motion.div>
            </Backdrop>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
