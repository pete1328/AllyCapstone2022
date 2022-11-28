import { React, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HomeButton } from "../components/Button";
import background from "../assets/tile_background.png";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Box } from "@mui/material";

class Award {
  constructor(message, percentage) {
    this.message = message;
    this.percentage = percentage;
  }
}

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 0.5,
        m: 1,
        bgcolor: props.complete ? "" : "#000000",
        color: "#",
        border: '2px solid',
        borderColor: '#FFF7F0',
        borderRadius: 2,
        ...sx,
      }}
      style={{
        background: props.complete ? "#8A3575" : ""
      }}
      {...other}
    />
  );
}

export function AwardsPage(props) {

  const awards = [
    new Award("1,000 Kudos Sent", 0.4),
    new Award("1,000 Kudos Earned", 0.6),
    new Award("100 Messages Sent", 1),
    new Award("100 Messages Received", 0.2),
  ];

  let location = useLocation();

  const updateContent = (event) => {
      // GET requests for updating content go here
  }
  
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
    <div className="h-screen w-full" style={{ backgroundImage: `url(${background})` }}>
      <div className="flex ml-10 pt-5">
        <h1 className="font-thin font-serif text-4xl text-white line-through">k</h1>
        <h1 className="font-thin font-serif text-4xl text-white">udos awards</h1>
        <div className="pl-8">
          <Link to={"/dashboard"}>
            <HomeButton/>
          </Link>
        </div>
      </div>
      <div className="w-full pt-8 px-8">
        <Box sx={{ display: 'flex-inline', flexWrap: 'wrap' }}>
          {awards.map((award, id) => {
              return(
                <Item complete={award.percentage === 1} key={id} className={"w-full flex items-center space-x-4"}>
                  <div style={{ width: 100}}>
                    <CircularProgressbar 
                    value={award.percentage} 
                    maxValue={1} 
                    text={`${award.percentage * 100}%`} 
                    styles={{
                      root: {},
                      path: {
                        stroke: `#1C988A`,
                      },
                      trail: {
                        stroke: '#FFF7F0',
                      },
                      text: {
                        fill: '#FFF7F0',
                        fontStyle: "italic",
                        fontSize: `24px`,
                      },
                      background: {}}}/>
                  </div>
                  <p className="text-champagne font-serif font-thin text-lg">{award.message}</p>
                </Item>
              )
          })}
        </Box>
      </div>
    </div>
  )
}