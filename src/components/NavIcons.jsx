import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavIcons = ({ path, svg, text, aSvg }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (pathname == path) setActive(true);
    else setActive(false);
  }, [pathname]);

  return (
    <>
      <Link
        to={path}
        type="button"
        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group transition-all ease-in"
      >
        {active ? aSvg : svg}
      </Link>
    </>
  );
};

export default NavIcons;
