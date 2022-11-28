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

  const received_messages_url = database_prefix + "/api/appreciations/received";
  const sent_messages_url = database_prefix + "/api/appreciations/sent";
  const received_kudos_url = database_prefix + "/api/user/received";
  const sent_kudos_url = database_prefix + "/api/user/sent";

  const [temp, setTemp] = useState([]);

  const awards = [
    new Award("50 Unique Connections", 0.2),
    new Award("10 Unique Connections", 0.2),
    new Award("5 Unique Connections", 0.2),
    new Award("Made a Connection", 0.2),
  ];

  let location = useLocation();

  function formatPercent(value, threshold) {
    return ((value / threshold ) > 1.0 ? 1.0 : (value / threshold).toPrecision(1));
  }

  const populateReceivedMessages = () => {
    axios.get(received_messages_url, { params: {
      user_id: props.user.user_id,
    }})
    .then(response => {
        let total = response.data.appreciations.length;
        setTemp( arr => [...arr, new Award("Received a Message", formatPercent(total, 1))]);
        setTemp( arr => [...arr, new Award("10 Messages Received", formatPercent(total, 10))]);
        setTemp( arr => [...arr, new Award("25 Messages Received", formatPercent(total, 25))]);
        setTemp( arr => [...arr, new Award("50 Messages Received", formatPercent(total, 50))]);
    })
    .catch(error => {
        console.log(error);
    });
  }

  const populateSentMessages = () => {
    axios.get(sent_messages_url, { params: {
      user_id: props.user.user_id,
    }})
    .then(response => {
        let total = response.data.appreciations.length;
        setTemp( arr => [...arr, new Award("Sent a Message", formatPercent(total, 1))]);
        setTemp( arr => [...arr, new Award("10 Messages Sent", formatPercent(total, 50))]);
        setTemp( arr => [...arr, new Award("25 Messages Sent", formatPercent(total, 100))]);
        setTemp( arr => [...arr, new Award("50 Messages Sent", formatPercent(total, 100))]);
    })
    .catch(error => {
        console.log(error);
    });
  }

  const populateReceivedKudos = () => {
    axios.get(received_kudos_url, { params: {
      user_id: props.user.user_id,
    }})
    .then(response => {
        let total = response.data.result[0]["Received"];
        setTemp( arr => [...arr, new Award("1,000 Kudos Earned", formatPercent(total, 1000))]);
        setTemp( arr => [...arr, new Award("10,000 Kudos Earned", formatPercent(total, 10000))]);
        setTemp( arr => [...arr, new Award("100,000 Kudos Earned", formatPercent(total, 100000))]);
    })
    .catch(error => {
        console.log(error);
    });
  }

  const populateSentKudos = () => {
    axios.get(sent_kudos_url, { params: {
      user_id: props.user.user_id,
    }})
    .then(response => {
      let total = response.data.result[0]["Sent"];
      setTemp( arr => [...arr, new Award("1,000 Kudos Sent", formatPercent(total, 1000))]);
      setTemp( arr => [...arr, new Award("10,000 Kudos Sent", formatPercent(total, 10000))]);
      setTemp( arr => [...arr, new Award("100,000 Kudos Sent", formatPercent(total, 100000))]);
    })
    .catch(error => {
        console.log(error);
    });
  }

  const updateContent = (event) => {
    setTemp([]);
    populateReceivedMessages();
    populateSentMessages();
    populateReceivedKudos();
    populateSentKudos();
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
          {temp.map((award, id) => {
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