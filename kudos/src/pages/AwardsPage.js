import { React, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HomeButton } from "../components/Button";
import background from "../assets/tile_background.png";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Box } from "@mui/material";
import { database_prefix } from "..";
import axios from "axios";

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
        p: 1,
        m: 1,
        bgcolor: props.complete ? "" : "#000000",
        color: "#",
        border: '2px solid',
        borderColor: '#FFF7F0',
        borderRadius: 2,
        ...sx,
      }}
      style={{
        background: props.complete === "true" ? "#8A3575" : "#000000"
      }}
      {...other}
    />
  );
}

export function AwardsPage(props) {

  const received_kudos_url = database_prefix + "/api/appreciations/received";
  const sent_kudos_url = database_prefix + "/api/appreciations/sent";

  const [temp, setTemp] = useState([]);

  const awards = [
    new Award("100,000 Kudos Sent", 0.1),
    new Award("100,000 Kudos Earned", 0.2),
    new Award("10,000 Kudos Sent", 0.3),
    new Award("10,000 Kudos Earned", 0.4),
    new Award("1,000 Kudos Sent", 0.4),
    new Award("1,000 Kudos Earned", 0.6),
    new Award("100 Messages Sent", 1),
    new Award("100 Messages Received", 0.75),
    new Award("50 Messages Sent", 0.33),
    new Award("50 Messages Received", 0.54),
    new Award("50 Unique Connections", 0.2),
    new Award("10 Unique Connections", 0.2),
    new Award("5 Unique Connections", 0.2),
    new Award("Made a Connection", 0.2),
    new Award("Received a Message", 1),
    new Award("Sent a Message", 1),
  ];

  let location = useLocation();

  const populateKudosReceived = () => {
    axios.get(received_kudos_url, { params: {
      user_id: props.user.user_id,
    }})
    .then(response => {
        let total = response.data.appreciations.length;
        setTemp( arr => [...arr, new Award("100 Messages Received", (total / 100 ) > 1 ? 1.0 : (total / 100))]);
        setTemp( arr => [...arr, new Award("50 Messages Received", (total / 50 ) > 1 ? 1.0 : (total / 50))]);
        setTemp( arr => [...arr, new Award("Received a Message", (total / 1 ) > 1 ? 1.0 : (total / 1))]);
    })
    .catch(error => {
        console.log(error);
    });
  }

  const updateContent = (event) => {
    setTemp([]);
    populateKudosReceived();
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
      <div className="w-full pt-8 pb-12 px-8">
        <Box sx={{ display: 'flex-inline', flexWrap: 'wrap' }}>
          {temp.reverse().map((award, id) => {
              return(
                <Item complete={(award.percentage >= 1) ? "true" : "false"} key={id} className={"w-full flex items-center space-x-6"}>
                  <div style={{ width: 100}}>
                    <CircularProgressbar 
                    value={award.percentage} 
                    maxValue={1} 
                    text={`${award.percentage * 100}%`} 
                    styles={{
                      root: {},
                      path: {
                        stroke: 
                          award.percentage < 1 && award.percentage >= 0.75 ? `#0ABAB5` : 
                          award.percentage < 0.75 && award.percentage >= 0.5 ? `#1C988A` : 
                          award.percentage < 0.5 && award.percentage >= 0.25 ? `#F5CA7B` :
                          award.percentage < 0.25 ? `#EEEE9B` : `#5F285E`
                      },
                      trail: {
                        stroke: '#BBBDBD',
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