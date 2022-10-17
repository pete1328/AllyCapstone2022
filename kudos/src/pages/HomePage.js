import { React, useState, useEffect } from "react";
import { appTheme } from "../components/Palette";
import { ThemeProvider, CssBaseline } from "@mui/material";
import allyLogo from '../assets/allyLogoBlack.png';
import mailGif from '../assets/send.gif';
import catProfile from '../assets/cat.png';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { KudosButton, LogoutButton, MoreStatsButton } from "../components/Button";
import { kudosSentData, kudosRecievedData, usageLegend, statsLegend } from "../components/TestData";
import { 
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  HorizontalBarSeries,
  DiscreteColorLegend
  } from "react-vis";
import { AlertBell } from "../components/AlertBell";
import { r_messages } from "../components/TestData";
import { Message } from "../components/Message";
import { Message as message } from "../components/TestData";
import axios from "axios";

const sidebarOptions = {
  Received: 'received',
  Sent: 'sent',
  None: 'none',
}

export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function HomePage(props) {
  const [name] = useState(props.user.first_name);
  const [kudosEarned] = useState(props.user.received);
  const [kudosAllocated] = useState(props.user.sent);
  const [alerts, setAlerts] = useState(r_messages.length);
  const [sidebarState, setSidebarState] = useState(sidebarOptions.None);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const isMobile = (windowDimensions.width <= 768) ? 1 : 0;

  const users_url = "http://localhost:3001/api/allUsers";
  const sent_url = "http://localhost:3001/api/appreciations/sent";
  const received_url = "http://localhost:3001/api/appreciations/received";
  
  let navigate = useNavigate();
  let location = useLocation();

  function updateAlerts(alerts) {
    setAlerts(alerts)
  }

  function updateUsers(users) {
    props.onChange(users)
  }

  const populateUsers = (event) => {
    axios.get(users_url)
    .then(response => {
        let temp = [];
        response.data.users.forEach(element => {
          let pair = {
            name : element["first_name"] + " " + element["last_name"],
            id : element["user_id"]
          }
          temp.push(pair);
        });
        updateUsers(temp);
    })
    .catch(error => {
        console.log(error);
    });
  }

  const populateAppreciations = (event) => {
    axios.get(sent_url, { params: {
      user_id: props.user.user_id
    }})
    .then(response => {
      let temp = [];
      response.data.appreciations.forEach(item => {
        temp.push(new message(item["user_id"], item["user_receive_id"], item["message"], item["kudos_points"], item["gif"], item["font"]))
      });
      setSentMessages(temp);
    })
    .catch(error => {
      console.log(error);
    });
    axios.get(received_url, { params: {
      user_id: props.user.user_id
    }})
    .then(response => {
      let temp = [];
      response.data.appreciations.forEach(item => {
        temp.push(new message(item["user_id"], item["user_receive_id"], item["message"], item["kudos_points"], item["gif"], item["font"]))
      });
      setReceivedMessages(temp);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const updateContent = (event) => {
    populateAppreciations();
    populateUsers();
  }

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.addEventListener("load", updateContent);
    return () => {
      window.removeEventListener("load", updateContent);
    };
  }, []);

  useEffect(() => {
    updateContent();
  }, [location]);

  return (
    <main>
      {/** Desktop view */}
      { isMobile === 0 &&
        <div className="2xl:flex bg-[#F0EFEF] 2xl:bg-blue-700">
          <div className="w-full bg-[#F0EFEF]">
            <div className="flex items-center justify-between pt-4">
              <div className="flex ml-12 pt-4">
                <img className="w-16 h-auto mt-1" src={allyLogo} alt="Logo"/>
                <h1 className="ml-2 font-bold text-4xl">kudos</h1>
              </div>
              <div className="flex justify-end pr-4">
                <div className="pt-2 pr-6">
                  <AlertBell alerts={alerts} onChange={updateAlerts}/>
                </div>
                { props.user.role === "Admin" &&
                  <div className="px-4">
                    <Link to="/extend-dashboard">
                      <MoreStatsButton/>
                    </Link>
                  </div>
                }
                <div onClick={() => {
                    window.localStorage.removeItem('user'); 
                    navigate("/login");
                  }}>
                  <LogoutButton/>
                </div>
              </div>
            </div>
            <div className=" pt-8 pb-8 w-full flex items-center">
              <button>
                <div className="border-blueberry border-4 bg-white w-20 h-auto rounded-full ml-12 flex justify-center">
                  <img className="w-auto h-auto border-0 rounded-full place-content-center" src={catProfile} alt="profile"/>
                </div>
              </button>
              <div>
                <div className="font-poppins font-regular text-gray-500 mx-auto text-2xl 2xl:text-3xl ml-4 flex space-x-1">
                  <button>
                    <h1 className=" text-plum font-poppins font-bold">Hi {name}, </h1>
                  </button>
                  <h1 className="text-black">Welcome Back!</h1>
                </div>
                <h1 className="ml-4 font-poppins font-regular mx-auto text-base 2xl:text-xl text-black">This is your Kudos Dashboard</h1>
              </div>
            </div>
            <div className="flex pl-12 pr-16 -space-x-1">
              <div className="bg-white border-[#D6D6D6] border-2 w-full">
                <div className="flex justify-evenly p-4">
                  <div className="pt-8">
                    <p className="mx-auto w-full text-base 2xl:text-xl font-poppins font-regular">Your Kudos Balance</p>
                    <p className="text-center text-6xl 2xl:text-7xl font-poppins font-medium">{kudosEarned}</p>
                  </div>
                </div>
              </div>
              <div className="mx-auto bg-[#FFFFFF] border-[#D6D6D6] border-2 flex items-center p-6">
                <div className="flex space-x-6">
                  <div>
                    <p className="mx-auto text-2xl 2xl:text-3xl font-poppins font-bold pb-2 leading-normal">Spread some joy by appreciating someone</p>
                    <div onClick={populateUsers}>
                      <Link to="/kudos">
                        <KudosButton/> 
                      </Link>
                    </div>
                  </div>
                  <div className="bg-[#5900b2] border-blueberry border-2 rounded-lg mx-auto flex justify-center">
                    <img className="w-full lg:w-1/2 place-self-center" src={mailGif} alt={"mail gif"}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center pt-8 px-16 md:px-12 pb-8 2xl:pb-32 md:space-x-8 -space-x-1">
              <div className="w-full place-content-center">
                <p className="text-base 2xl:text-xl font-poppins font-bold">Statistics</p>
                <div className="bg-[#FFFFFF] border-[#D6D6D6] border-2 p-4">
                <XYPlot
                  width={windowDimensions.width / 3}
                  height={180}
                  yDomain={[-400, 400]}
                >
                  <VerticalBarSeries data={kudosRecievedData} color="#1C988A" />
                  <VerticalBarSeries data={kudosSentData} color="#CB3974"/>
                </XYPlot>
                <DiscreteColorLegend orientation="horizontal" width={300} items={statsLegend} />
                </div>
              </div>
              <div className="w-full">
                <p className="text-base 2xl:text-xl font-poppins font-bold">Kudos Usage</p>
                <div className="bg-[#FFFFFF] border-[#D6D6D6] border-2 p-4 pt-24">
                  <XYPlot 
                    width={windowDimensions.width / 4}
                    height={100}
                    stackBy="x">
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <HorizontalBarSeries data={[{y: 0, x: kudosAllocated}]} color="#1C988A"/>
                    <HorizontalBarSeries data={[{y: 0, x: kudosEarned}]} color="#CB3974"/>
                  </XYPlot>
                  <DiscreteColorLegend orientation="horizontal" width={300} items={usageLegend} />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#F0EFEF] 2xl:bg-white w-full 2xl:w-2/5 h-screen">
            <div className="w-full">
              <div className="mx-4 mt-4 flex justify-center">
                <ThemeProvider theme={appTheme}>
                <CssBaseline enableColorScheme />
                  <Button 
                  variant={sidebarState === sidebarOptions.Received ? "contained" : "outlined"}
                  color="blueberry"
                  size="small"
                  onClick={() => {
                    if (sidebarState === sidebarOptions.Received) {
                      setSidebarState(sidebarOptions.None)
                    } else {
                      setSidebarState(sidebarOptions.Received)
                    }
                  }}
                  >
                    Recieved Appreciations
                  </Button>
                </ThemeProvider>
                <ThemeProvider theme={appTheme}>
                <CssBaseline enableColorScheme />
                  <Button 
                  variant={sidebarState === sidebarOptions.Sent ? "contained" : "outlined"}
                  color="blueberry"
                  size="small"
                  onClick={() => {
                    if (sidebarState === sidebarOptions.Sent) {
                      setSidebarState(sidebarOptions.None)
                    } else {
                      setSidebarState(sidebarOptions.Sent)
                    }
                  }}
                  >
                    Sent Appreciations
                  </Button>
                </ThemeProvider>
              </div>
              <div className="w-full flex justify-center pt-4 font-poppins">
                {sidebarState === sidebarOptions.Received && 
                  <div>
                    {receivedMessages.map((message, id) => {
                        return(
                          <div key={id}>
                            <Message 
                            sender={message.sender} 
                            reciever={message.reciever} 
                            text={message.text} 
                            points={message.points} 
                            gif={message.gif} 
                            font={message.font}/>
                          </div>
                        )
                    })}
                  </div>
                }
                {sidebarState === sidebarOptions.Sent && 
                  <div>
                  {sentMessages.map((message, id) => {
                      return(
                        <div key={id}>
                          <Message
                          sender={message.sender} 
                          reciever={message.reciever} 
                          text={message.text} 
                          points={message.points} 
                          gif={message.gif} 
                          font={message.font}/>
                        </div>
                      )
                  })}
                </div>
                }
              </div>
            </div>
          </div>
        </div>
      }
      {/** Mobile view */}
      { isMobile === 1 &&
        <div>
          <div className="flex justify-evenly pt-4">
            <div className="flex">
              <img className="w-auto h-8 mt-1 mx-2" src={allyLogo} alt="Logo"/>
              <h1 className="font-bold text-3xl">kudos</h1>
            </div>
            <div className="flex justify-end">
              <div className="mt-2 px-6">
                <AlertBell alerts={alerts} onChange={updateAlerts}/>
              </div>
              <Link to="/login">
                <LogoutButton/>
              </Link>
            </div>
          </div>
          <div className="w-full flex items-center justify-evenly pt-6">
            <button>
              <div className="border-blueberry border-4 bg-white w-20 h-auto rounded-full flex justify-evenly">
                <img className="w-auto h-auto border-0 rounded-full place-content-center" src={catProfile} alt="profile"/>
              </div>
            </button>
            <div>
              <div className="font-poppins font-regular text-gray-500 mx-auto text-lg flex space-x-1 justify-center">
                <button>
                  <h1 className=" text-plum font-poppins font-bold text-center">Hi {name}, </h1>
                </button>
              </div>
              <h1 className="text-black text-center">Welcome Back!</h1>
              <h1 className="font-poppins font-regular text-base text-black text-center">This is your Kudos Dashboard</h1>
            </div>
          </div>
          <div className="w-full flex justify-center pt-8">
            <div className="bg-white border-[#D6D6D6] border-2 w-3/4">
              <div className="flex justify-evenly p-4">
                <div>
                  <p className="mx-auto w-full text-base 2xl:text-xl font-poppins font-regular">Your Kudos Balance</p>
                  <p className="mx-auto text-6xl 2xl:text-7xl font-poppins font-medium">{kudosEarned}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center pt-4">
            <div className="flex w-3/4 bg-[#FFFFFF] border-[#D6D6D6] border-2 p-6">
              <div className="w-full text-center">
                <p className="text-xl font-poppins font-bold pb-4">Spread some joy by appreciating someone</p>
                <Link to="/kudos">
                  <div className="w-full flex justify-center" onClick={populateUsers}>
                    <KudosButton/> 
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full pt-8">
            <div className="w-3/4">
              <p className="text-base font-poppins font-bold">Statistics</p>
              <div className="bg-[#FFFFFF] border-[#D6D6D6] border-2 p-4">
                <XYPlot
                  width={windowDimensions.width/2}
                  height={180}
                  yDomain={[-400, 400]}
                >
                  <VerticalBarSeries data={kudosRecievedData} color="#1C988A" />
                  <VerticalBarSeries data={kudosSentData} color="#CB3974"/>
                </XYPlot>
                <DiscreteColorLegend orientation="horizontal" width={300} items={statsLegend} />
              </div>
              { props.user.role === "Admin" &&
                <div className="w-full flex justify-center pt-2">
                  <Link to="/extend-dashboard">
                    <MoreStatsButton/>
                  </Link>
                </div>
              }
            </div>
          </div>
          <div className="w-full flex justify-center py-8">
            <div className="w-3/4">
              <p className="text-base font-poppins font-bold">Kudos Usage</p>
              <div className="bg-[#FFFFFF] border-[#D6D6D6] border-2 p-4 pt-12">
                <XYPlot 
                  width={windowDimensions.width / 1.5}
                  height={100}
                  stackBy="x">
                  <VerticalGridLines />
                  <HorizontalGridLines />
                  <HorizontalBarSeries data={[{y: 0, x: kudosAllocated}]} color="#1C988A"/>
                  <HorizontalBarSeries data={[{y: 0, x: kudosEarned}]} color="#CB3974"/>
                </XYPlot>
                <DiscreteColorLegend orientation="horizontal" width={300} items={usageLegend} />
              </div>
            </div>
          </div>
          <div className="bg-[#F0EFEF] w-full flex justify-center">
            <div className="w-3/4">
              <div className="flex justify-center">
                <ThemeProvider theme={appTheme}>
                <CssBaseline enableColorScheme />
                  <Button 
                  variant={sidebarState === sidebarOptions.Received ? "contained" : "outlined"}
                  color="blueberry"
                  size="small"
                  onClick={() => {
                    if (sidebarState === sidebarOptions.Received) {
                      setSidebarState(sidebarOptions.None)
                    } else {
                      setSidebarState(sidebarOptions.Received)
                    }
                  }}
                  >
                    Recieved Appreciations
                  </Button>
                </ThemeProvider>
                <ThemeProvider theme={appTheme}>
                <CssBaseline enableColorScheme />
                  <Button 
                  variant={sidebarState === sidebarOptions.Sent ? "contained" : "outlined"}
                  color="blueberry"
                  size="small"
                  onClick={() => {
                    if (sidebarState === sidebarOptions.Sent) {
                      setSidebarState(sidebarOptions.None)
                    } else {
                      setSidebarState(sidebarOptions.Sent)
                    }
                  }}
                  >
                    Sent Appreciations
                  </Button>
                </ThemeProvider>
              </div>
              <div className="w-full flex justify-center pt-8 font-poppins">
                <div>
                  {sidebarState === sidebarOptions.Received && 
                    <div>
                      {receivedMessages.map((message, id) => {
                          return(
                            <div key={id}>
                              <Message 
                              sender={message.sender} 
                              reciever={message.reciever} 
                              text={message.text} 
                              points={message.points} 
                              gif={message.gif} 
                              font={message.font}
                              size={"8"}/>
                            </div>
                          )
                      })}
                    </div>
                  }
                  {sidebarState === sidebarOptions.Sent && 
                    <div>
                      {sentMessages.map((message, id) => {
                          return(
                            <div key={id}>
                              <Message
                              sender={message.sender} 
                              reciever={message.reciever} 
                              text={message.text} 
                              points={message.points} 
                              gif={message.gif} 
                              font={message.font}/>
                            </div>
                          )
                      })}
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </main>
  );
}