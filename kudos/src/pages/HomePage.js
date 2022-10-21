import { React, useState, useEffect } from "react";
import { appTheme } from "../components/Palette";
import "../App.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { KudosButton, LogoutButton, MoreStatsButton } from "../components/Button";
import { kudosSentData, kudosRecievedData, statsLegend } from "../components/TestData";
import { 
  XYPlot,
  VerticalBarSeries,
  DiscreteColorLegend
  } from "react-vis";
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
  const [user_id] = useState(props.user.user_id);
  const [kudosEarned] = useState(props.user.received);
  const [sidebarState, setSidebarState] = useState(sidebarOptions.None);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const isMobile = (windowDimensions.width <= 768) ? 1 : 0;
  const pageLimit = 3;

  const users_url = "http://localhost:3001/api/allUsers";
  const sent_url = "http://localhost:3001/api/appreciations/sent";
  const received_url = "http://localhost:3001/api/appreciations/received";
  
  let navigate = useNavigate();
  let location = useLocation();

  const previousMessages = (event) => {
    let result = pageIndex - pageLimit;
    if (result >= 0) {
      setPageIndex(result);
    }
  }

  function nextMessages(messages) {
    let result = pageIndex + pageLimit;
    if (result <= messages.length) {
      setPageIndex(result);
    }
  }

  function updateUsers(users) {
    props.onChange(users)
  }

  const populateUsers = (event) => {
    axios.get(users_url, { params: {
      user_id: user_id,
    }})
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
      user_id: user_id
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
      user_id: user_id
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
  });

  useEffect(() => {
    window.addEventListener("load", updateContent);
    return () => {
      window.removeEventListener("load", updateContent);
    };
  });

  useEffect(() => {
    updateContent();
  }, [location]);

  return (
    <main>
      {/** Desktop view */}
      { isMobile === 0 &&
        <div className="2xl:flex bg-blueberry">
          <div className="w-full">
            <div className="flex items-center justify-between pt-4">
              <div className="flex ml-10 pt-5">
                <h1 className="font-thin font-serif text-4xl text-white">₭udos</h1>
              </div>
              <div className="flex justify-end pt-2 pr-10">
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
              <div>
                <div className="font-serif font-regular text-gray-500 mx-auto text-3xl ml-10 flex space-x-1">
                  <button>
                    <h1 className=" text-seafoam font-serif font-bold text-xl lg:text-3xl">Hi {name}, </h1>
                  </button>
                  <h1 className="text-white text-xl lg:text-3xl">thank you for spreading love.</h1>
                </div>
                <h1 className="font-serif font-regular mx-auto text-base lg:text-xl text-white ml-10">This is your Kudos Dashboard</h1>
              </div>
            </div>
            <div className="w-full p-10">
              <div className="flex space-x-10">
                <div className="bg-champagne w-full p-2">
                  <div className="w-full h-full flex justify-center border-2 border-plum border-dashed">
                    <div className="place-self-center">
                      <p className="text-xl text-plum font-serif font-regular">Your Kudos Balance</p>
                      <p className="text-center text-plum text-7xl font-serif font-medium">{kudosEarned}</p>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-champagne flex items-center p-2">
                  <div className="flex border-2 border-plum border-dashed p-4">
                    <div>
                      <div className="w-full text-center">
                        <p className="text-4xl text-plum font-serif font-thin py-4 leading-normal ">Spread some joy by appreciating someone</p>
                      </div>
                      <div className="w-full flex justify-center pb-4" onClick={populateUsers}>
                        <Link to="/kudos">
                          <KudosButton/> 
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center pt-8 px-16 md:px-10 pb-8 md:space-x-8 -space-x-1">
              <div className="w-full place-content-center">
                <div className="bg-champagne p-4">
                <div class="grid-container">
                  <div class="item1">Letters Sent</div>
                  <div class="item2">Letters Received</div>
                  <div class="item3">Total Letters Sent Across Ally</div>  
                  <div class="item4">
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
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-screen pb-4">
            <div className="w-full">
              <div className="w-full pt-6 flex justify-center space-x-4">
                <ThemeProvider theme={appTheme}>
                <CssBaseline enableColorScheme />
                  <Button 
                  variant={sidebarState === sidebarOptions.Received ? "contained" : "outlined"}
                  color="seafoam"
                  size="large"
                  onClick={() => {
                    setPageIndex(0);
                    if (sidebarState === sidebarOptions.Received) {
                      setSidebarState(sidebarOptions.None);
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
                  color="seafoam"
                  size="large"
                  onClick={() => {
                    setPageIndex(0);
                    if (sidebarState === sidebarOptions.Sent) {
                      setSidebarState(sidebarOptions.None);
                    } else {
                      setSidebarState(sidebarOptions.Sent)
                    }
                  }}
                  >
                    Sent Appreciations
                  </Button>
                </ThemeProvider>
              </div>
              <div className="w-full flex justify-center pt-4 font-serif">
                {sidebarState === sidebarOptions.Received && 
                  <div>
                    {receivedMessages.slice(pageIndex, pageIndex + pageLimit).map((message, id) => {
                        return(
                          <div key={id} className={"w-full"}>
                            <Message 
                            sender={message.sender} 
                            reciever={message.reciever} 
                            text={message.text} 
                            points={message.points} 
                            gif={message.gif} 
                            font={`text-lg ${message.font}`}/>
                          </div>
                        )
                    })}
                    <div className="w-full flex justify-center space-x-4 pt-4 pb-8">
                      <ThemeProvider theme={appTheme}>
                      <CssBaseline enableColorScheme />
                        <Button 
                        variant="contained" 
                        color="seafoam"
                        onClick={previousMessages}>
                          Previous
                        </Button>
                        <Button 
                        variant="contained"
                        color="seafoam"
                        onClick={() => {nextMessages(receivedMessages)}}>
                          Next
                        </Button>
                      </ThemeProvider>
                    </div>
                  </div>
                }
                {sidebarState === sidebarOptions.Sent && 
                <div>
                  {sentMessages.slice(pageIndex, pageIndex + pageLimit).map((message, id) => {
                      return(
                        <div key={id} className={"w-full"}>
                          <Message
                          sender={message.sender} 
                          reciever={message.reciever} 
                          text={message.text} 
                          points={message.points} 
                          gif={message.gif} 
                          font={`text-lg ${message.font}`}/>
                        </div>
                      )
                  })}
                  <div className="w-full flex justify-center space-x-4 pt-4 pb-8">
                    <ThemeProvider theme={appTheme}>
                    <CssBaseline enableColorScheme />
                      <Button 
                      variant="contained" 
                      color="seafoam"
                      onClick={previousMessages}>
                        Previous
                      </Button>
                      <Button 
                      variant="contained"
                      color="seafoam"
                      onClick={() => {nextMessages(sentMessages)}}>
                        Next
                      </Button>
                    </ThemeProvider>
                  </div>
                </div>
                }
              </div>
            </div>
          </div>
        </div>
      }
      {/** Mobile view */}
      { isMobile === 1 &&
        <div className="bg-blueberry h-screen">
          <div className="flex justify-evenly pt-4">
            <div className="flex">
              <h1 className="font-thin font-serif text-white text-3xl">₭udos</h1>
            </div>
            <div className="flex justify-end">
              <Link to="/login">
                <LogoutButton/>
              </Link>
            </div>
          </div>
          <div className="w-full flex items-center justify-evenly pt-6">
            <div>
              <div className="font-serif font-regular text-lg flex space-x-1 justify-center">
                <button>
                  <h1 className=" text-seafoam font-serif font-bold text-center">Hi {name}, </h1>
                </button>
              </div>
              <h1 className="text-white text-center">Welcome Back!</h1>
              <h1 className="font-serif font-regular text-base text-white text-center">This is your Kudos Dashboard</h1>
            </div>
          </div>
          <div className="w-full flex justify-center pt-8">
            <div className="bg-champagne w-3/4">
              <div className="flex justify-evenly p-2">
                <div className="w-full h-full flex justify-center border-2 border-plum border-dashed p-6">
                  <div className="place-self-center">
                    <p className="mx-auto w-full text-xl text-plum font-serif font-regular">Your Kudos Balance</p>
                    <p className="mx-auto text-7xl text-plum font-serif font-medium text-center">{kudosEarned}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center pt-4">
            <div className="flex w-3/4 bg-champagne p-2">
              <div className="w-full border-2 border-plum border-dashed p-6">
                <div className="w-full text-center">
                  <p className="text-xl text-plum font-serif font-thin pb-4">Spread some joy by appreciating someone</p>
                  <Link to="/kudos">
                    <div className="w-full flex justify-center" onClick={populateUsers}>
                      <KudosButton/> 
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full pt-6">
            <div className="w-3/4">
              <p className="text-base font-serif font-bold text-white">Statistics</p>
              <div className="bg-champagne p-4">
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
                <div className="w-full flex justify-center pt-6">
                  <Link to="/extend-dashboard">
                    <MoreStatsButton/>
                  </Link>
                </div>
              }
            </div>
          </div>
          {/* <div className="w-full flex justify-center py-8">
            <div className="w-3/4">
              <p className="text-base text-white font-serif font-bold">Kudos Usage</p>
              <div className="bg-champagne p-4 pt-12">
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
          </div> */}
          <div className="w-full flex justify-center pt-8">
            <div className="w-full">
              <div className="flex justify-center space-x-4">
                <ThemeProvider theme={appTheme}>
                <CssBaseline enableColorScheme />
                  <Button 
                  variant={sidebarState === sidebarOptions.Received ? "contained" : "outlined"}
                  color="seafoam"
                  size="small"
                  onClick={() => {
                    setPageIndex(0);
                    if (sidebarState === sidebarOptions.Received) {
                      setSidebarState(sidebarOptions.None);
                    } else {
                      setSidebarState(sidebarOptions.Received)
                    }
                  }}
                  >
                    Received Appreciations
                  </Button>
                </ThemeProvider>
                <ThemeProvider theme={appTheme}>
                <CssBaseline enableColorScheme />
                  <Button 
                  variant={sidebarState === sidebarOptions.Sent ? "contained" : "outlined"}
                  color="seafoam"
                  size="small"
                  onClick={() => {
                    setPageIndex(0);
                    if (sidebarState === sidebarOptions.Sent) {
                      setSidebarState(sidebarOptions.None);
                    } else {
                      setSidebarState(sidebarOptions.Sent)
                    }
                  }}
                  >
                    Sent Appreciations
                  </Button>
                </ThemeProvider>
              </div>
              <div className="w-full flex justify-center pt-8 font-serif">
                <div>
                  {sidebarState === sidebarOptions.Received && 
                    <div>
                      {receivedMessages.slice(pageIndex, pageIndex + pageLimit).map((message, id) => {
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
                      <div className="w-full flex justify-center space-x-4 pt-4 pb-8">
                        <ThemeProvider theme={appTheme}>
                        <CssBaseline enableColorScheme />
                          <Button 
                          variant="contained" 
                          color="seafoam"
                          onClick={previousMessages}>
                            Previous
                          </Button>
                          <Button 
                          variant="contained"
                          color="seafoam"
                          onClick={() => {nextMessages(receivedMessages)}}>
                            Next
                          </Button>
                        </ThemeProvider>
                      </div>
                    </div>
                  }
                  {sidebarState === sidebarOptions.Sent && 
                    <div>
                      {sentMessages.slice(pageIndex, pageIndex + pageLimit).map((message, id) => {
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
                      <div className="w-full flex justify-center space-x-4 pt-4 pb-8">
                        <ThemeProvider theme={appTheme}>
                        <CssBaseline enableColorScheme />
                          <Button 
                          variant="contained" 
                          color="seafoam"
                          onClick={previousMessages}>
                            Previous
                          </Button>
                          <Button 
                          variant="contained"
                          color="seafoam"
                          onClick={() => {nextMessages(sentMessages)}}>
                            Next
                          </Button>
                        </ThemeProvider>
                      </div>
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