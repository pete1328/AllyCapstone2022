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

function compare(a, b) {
  if (a.percentage < b.percentage) {
    return -1;
  }
  if (a.percentage > b.percentage) {
    return 1;
  }
  return 0;
}

export function AwardsPage(props) {
  const received_messages_url = database_prefix + "/api/appreciations/received";
  const sent_messages_url = database_prefix + "/api/appreciations/sent";
  const received_kudos_url = database_prefix + "/api/user/received";
  const sent_kudos_url = database_prefix + "/api/user/sent";
  const unique_connections_url = database_prefix + "/api/users/uniqueConnection"

  const [awards, setAwards] = useState([]);
  let location = useLocation();

  function formatPercent(value, threshold) {
    return ((value / threshold ).toPrecision(1) > 1.0 ? 1.0 : (value / threshold).toPrecision(1));
  }

  const populateReceivedMessages = () => {
    axios.get(received_messages_url, { params: {
      user_id: props.user.user_id,
    }})
    .then(response => {
        let total = response.data.appreciations.length;
        setAwards(arr => [...arr, 
          new Award("Received a Message", formatPercent(total, 1)),
          new Award("10 Messages Received", formatPercent(total, 10)),
          new Award("25 Messages Received", formatPercent(total, 25)),
          new Award("50 Messages Received", formatPercent(total, 50))
        ]);
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
        setAwards( arr => [...arr, 
          new Award("Sent a Message", formatPercent(total, 1)),
          new Award("10 Messages Sent", formatPercent(total, 10)),
          new Award("25 Messages Sent", formatPercent(total, 25)),
          new Award("50 Messages Sent", formatPercent(total, 50))
        ]);
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
        setAwards( arr => [...arr, 
          new Award("1,000 Kudos Received", formatPercent(total, 1000)),
          new Award("10,000 Kudos Received", formatPercent(total, 10000)),
          new Award("100,000 Kudos Received", formatPercent(total, 100000))
        ]);
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
      setAwards( arr => [...arr, 
        new Award("1,000 Kudos Sent", formatPercent(total, 1000)), 
        new Award("10,000 Kudos Sent", formatPercent(total, 10000)), 
        new Award("100,000 Kudos Sent", formatPercent(total, 100000))
      ]);
    })
    .catch(error => {
        console.log(error);
    });
  }

  const populateConnections = () => {
    axios.get(unique_connections_url, { params: {
      user_id: props.user.user_id,
    }})
    .then(response => {
      let total = response.data.result[0]["num_connections"];
      setAwards( arr => [...arr, 
        new Award("Made a Connection", formatPercent(total, 1)), 
        new Award("5 Unique Connections", formatPercent(total, 5)), 
        new Award("10 Unique Connections", formatPercent(total, 10)), 
        new Award("50 Unique Connections", formatPercent(total, 50))
      ]);
    })
    .catch(error => {
      console.log(error);
    });
  }

  function updateContent() {
    populateReceivedMessages();
    populateSentMessages();
    populateReceivedKudos();
    populateSentKudos();
    populateConnections();
  }

  /**
   * Event listener for navigating to page
   */
  useEffect(() => {
    updateContent();
  }, [location]);

  return (
    <div className="h-screen w-full" style={{ backgroundImage: `url(${background})` }}>
      <div className="flex ml-10 pt-5">
        <h1 className="font-thin font-serif text-3xl text-white line-through">k</h1>
        <h1 className="font-thin font-serif text-3xl text-white">udos awards</h1>
        <div className="pl-8">
          <Link to={"/dashboard"}>
            <HomeButton/>
          </Link>
        </div>
      </div>
      <div className="w-full pt-8 pb-12 px-8">
        <Box sx={{ display: 'flex-inline', flexWrap: 'wrap' }}>
          {awards.sort(compare).map((award, id) => {
              return(
                <Item complete={(award.percentage >= 1) ? "true" : "false"} key={id} className={"w-full flex items-center space-x-6"}>
                  <div style={{ width: 100}}>
                    <CircularProgressbar 
                    value={award.percentage} 
                    maxValue={1} 
                    text={`${(award.percentage * 100)}%`} 
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