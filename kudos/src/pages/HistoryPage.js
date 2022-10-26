import { React, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getWindowDimensions } from "./HomePage";
import { HomeButton } from "../components/Button";

export function HistoryPage(props) {
    //const [user, setUser] = useState(props.user);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const isMobile = (windowDimensions.width <= 768) ? 1 : 0;

    let location = useLocation();

    const updateContent = (event) => {
        // GET requests for updating content go here
      }
    
      /**
       * Event listener for resizing window
       */
      useEffect(() => {
        function handleResize() {
          setWindowDimensions(getWindowDimensions());
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
      /**
       * Event listener for loading/refreshing content
       */
      useEffect(() => {
        window.addEventListener("load", updateContent);
        return () => {
          window.removeEventListener("load", updateContent);
        };
      }, []);
    
      /**
       * Event listener for navigating to page
       */
      useEffect(() => {
        updateContent();
      }, [location]);

    return (
      <>
      {/** Render content here */}
      { isMobile === 0 &&
        <> {/** Desktop view */}
          <p>This is the history page</p>
          <Link to={"/dashboard"}>
              <HomeButton/>
          </Link>
        </>
      }
      { isMobile === 1 &&
        <> {/** Mobile view */}
          <p>This is the history page</p>
          <Link to={"/dashboard"}>
              <HomeButton/>
          </Link>
        </>
      }
  </>
    )
}