import { React, useState, useEffect } from "react";
import { appTheme } from "../components/Palette";
import "../App.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { KudosButton, LogoutButton, MoreStatsButton } from "../components/Button";
import { XYPlot, VerticalBarSeries, XAxis } from "react-vis";
import { Message } from "../components/Message";
import { Message as message, months } from "../components/TestData";
import background from "../assets/tile_background.png";
import axios from "axios";
import { prefix } from "..";

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
  const [sidebarState, setSidebarState] = useState(sidebarOptions.Received);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]); // for stats in grid
  const [sentMessagesAmt, setSentMessagesAmt] = useState([]); // for stats in grid
  const [receivedMessagesAmt, setReceivedMessagesAmt] = useState([]); // for stats in grid
  const [pageIndex, setPageIndex] = useState(0);
  const [monthlySent, setMonthlySent] = useState([0]);
  const [monthlyReceived, setMonthlyReceived] = useState([0]);
  const [monthlySentPlotPoints, setMonthlySentPlotPoints] = useState([]);
  const [monthlyReceivedPlotPoints, setMonthlyRecievedPlotPoints] = useState([]);
  //const [sentKudosTotal, setSentKudosTotal] = useState("");
  const [receivedKudosTotal, setReceivedKudos] = useState("");
  const isMobile = (windowDimensions.width <= 768) ? 1 : 0;
  const pageLimit = 3;

  const users_url = prefix + "/api/allUsers";
  const sent_url = prefix + "/api/appreciations/sent";
  const received_url = prefix + "/api/appreciations/received";
  const all_appreciations_url = prefix + "/api/appreciations/all";
  const sent_monthly_url = prefix + "/api/appreciations/monthlySent";
  const received_monthly_url = prefix + "/api/appreciations/monthlyReceived";
  //const sent_kudos_total_url = prefix + "/api/user/sent";
  const received_kudos_total_url = prefix + "/api/user/received";

  const scale = 1;
  const offset = 21.5;
  
  let navigate = useNavigate();
  let location = useLocation();

  const previousMessages = () => {
    let result = pageIndex - pageLimit;
    if (result >= 0) {
      setPageIndex(result);
    }
  }

  function nextMessages(messages) {
    let result = pageIndex + pageLimit;
    if (result < messages.length) {
      setPageIndex(result);
    }
  }

  function updateUsers(users) {
    props.onChange(users)
  }

  const populateUsers = () => {
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

  const populateAppreciations = () => {
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

  const populateAllLettersSent = () => {
    axios.get(all_appreciations_url, { params: {
      user_id: user_id,
    }})
    .then(response => {
        let table_len = 0;
        table_len = response.data.kudos.length;
        setAllMessages(table_len);
    })
    .catch(error => {
        console.log(error);
    });
  }

  const populateUsersLettersSent = () => {
    axios.get(sent_url, { params: {
      user_id: user_id,
    }})
    .then(response => {
        let table_len = 0;
        table_len = response.data.appreciations.length;
        setSentMessagesAmt(table_len);
    })
    .catch(error => {
        console.log(error);
    });
  }

  const populateUsersLettersReceived = () => {
    axios.get(received_url, { params: {
      user_id: user_id,
    }})
    .then(response => {
        let table_len = 0;
        table_len = response.data.appreciations.length;
        setReceivedMessagesAmt(table_len);
    })
    .catch(error => {
        console.log(error);
    });
  }

  // const obtainSentBalance = () => {
  //   axios.get(sent_kudos_total_url, { params: {
  //     user_id: user_id,
  //   }})
  //   .then(response => {
  //     setSentKudosTotal(response.data.result[0]["Sent"]);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }

  const obtainReceivedBalance = () => {
    axios.get(received_kudos_total_url, { params: {
      user_id: user_id,
    }})
    .then(response => {
      let result = response.data.result[0]["Received"];
      setReceivedKudos(result != null ? result : 0);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const populateMonthlyStatistics = () => {
    let sent = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let received = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    let sentPlotPoints = [];
    let receivedPlotPoints = [];

    let current_date = new Date(Date.now());

    axios.get(sent_monthly_url, { params: {
      user_id: user_id,
    }})
    .then(response => {
      response.data.kudos.forEach((elem) => {
        let entry_date = new Date(Date.parse(elem["createdAt"]));
        let month = entry_date.getMonth();
        let year = entry_date.getFullYear();
        if (current_date.getFullYear() === year) {
          sent[month] += elem["kudos_points"];
        }    
      });
      sent.forEach((elem, index) =>{
        sentPlotPoints.push({y: elem * scale, x: (50 * index + 70) - offset, y0: 0});
      });
      setMonthlySent(sent);
      setMonthlySentPlotPoints(sentPlotPoints);
    })
    .catch(error => {
      console.log(error);
    });

    axios.get(received_monthly_url, { params: {
      user_id: user_id,
    }})
    .then(response => {
      response.data.kudos.forEach((elem) => {
        let entry_date = new Date(Date.parse(elem["createdAt"]));
        let month = entry_date.getMonth();
        let year = entry_date.getFullYear();
        if (current_date.getFullYear() === year) {
          received[month] += elem["kudos_points"];
        }
      });
      received.forEach((elem, index) =>{
        receivedPlotPoints.push({y: elem * scale, x: (50 * index + 50), y0: 0});
      });
      setMonthlyReceived(received);
      setMonthlyRecievedPlotPoints(receivedPlotPoints);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const updateContent = () => {
    populateAppreciations();
    populateUsers();
    populateAllLettersSent();
    populateUsersLettersReceived();
    populateUsersLettersSent();
    populateMonthlyStatistics();
    //obtainSentBalance();
    obtainReceivedBalance();
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
    // eslint-disable-next-line
  }, [location]); 

  return (
    <main>
      {/** Desktop view */}
      { isMobile === 0 &&
        <div className="2xl:flex" style={{ backgroundImage: `url(${background})` }}>
          <div className="w-full">
            <div className="flex items-center justify-between pt-4">
              <div className="flex ml-10 pt-5">
                <h1 className="font-thin font-serif text-4xl text-white line-through">k</h1>
                <h1 className="font-thin font-serif text-4xl text-white">udos</h1>
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
            <div className=" pt-8 w-full flex items-center">
              <div>
                <div className="font-serif font-regular text-gray-500 mx-auto text-3xl ml-10 flex space-x-1">
                  <button>
                    <h1 className=" text-seafoam font-serif font-bold text-xl lg:text-3xl">Hi {name}, </h1>
                  </button>
                  <h1 className="text-white text-serif text-xl lg:text-3xl">thank you for spreading love.</h1>
                </div>
                <h1 className="font-serif font-regular mx-auto text-base lg:text-xl text-white ml-10">This is your Kudos Dashboard</h1>
              </div>
            </div>
            <div className="w-full p-10">
              <div className="flex space-x-10">
                <div className="bg-champagne w-full p-2">
                  <div className="w-full h-full flex justify-center border-2 border-plum border-dashed">
                    <div className="place-self-center">
                      <p className="text-3xl text-plum font-serif font-regular ">Your Kudos Balance</p>
                      <p className="text-center text-plum text-7xl font-serif font-medium">{receivedKudosTotal}</p>
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
            <div className="flex justify-center w-full p-10 pt-2">
              <div className="grid-background">
                <div className="grid-container">
                  <div className="item1">
                    Letters Sent
                    <p className="font-bold">{sentMessagesAmt}</p>
                  </div>
                  <div className="item2">
                    Letters Received
                    <p className="font-bold">{receivedMessagesAmt}</p>
                  </div>
                  <div className="item3">
                    Total Letters Sent Across Ally
                    <p className="font-bold">{allMessages}</p>
                  </div>  
                  <div className="item4">
                    <div className="flex items-center px-2 pb-8">
                      <div className="text-2xl">
                        <p className="text-grapefruit">Sent</p>
                        <p className="text-seafoam">Received</p>
                      </div>
                      <XYPlot
                      width={windowDimensions.width / 2.5}
                      height={200}
                      yDomain={[0, (Math.max.apply(Math, (monthlySent, monthlyReceived)))]}
                      >
                      <VerticalBarSeries data={monthlyReceivedPlotPoints} color="#CB3974" />
                      <VerticalBarSeries data={monthlySentPlotPoints} color="#1C988A"/>
                      <XAxis 
                      style={{
                        text: {stroke: 'none', fill: '#5F285E', fontWeight: 100}
                      }}
                      tickValues={[50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600]}
                      tickFormat={d => {
                          return months[d/50 - 1]; 
                      }}/>
                      <div className="text-lg text-blueberry pt-4">Months</div>
                      </XYPlot>   
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
                    Received Appreciations
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
        <div className="h-screen" style={{ backgroundImage: `url(${background})` }}>
          <div className="flex justify-evenly pt-4">
            <div className="flex pt-2">
              <h1 className="font-thin font-serif text-4xl text-white line-through">k</h1>
              <h1 className="font-thin font-serif text-4xl text-white">udos</h1>
            </div>
            <div className="flex justify-end pt-2">
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
          <div className="w-full flex items-center justify-evenly pt-6">
            <div>
              <div className="font-serif font-regular text-lg flex space-x-1 justify-center">
                <button>
                  <h1 className=" text-seafoam font-serif font-bold text-center">Hi {name}, </h1>
                </button>
              </div>
              <h1 className="text-white font-serif text-center">Welcome Back!</h1>
              <h1 className="font-serif font-regular text-base text-white text-center">This is your Kudos Dashboard</h1>
            </div>
          </div>
          <div className="w-full flex justify-center pt-8">
            <div className="bg-champagne w-3/4">
              <div className="flex justify-evenly p-2">
                <div className="w-full h-full flex justify-center border-2 border-plum border-dashed p-6">
                  <div className="place-self-center">
                    <p className="mx-auto w-full text-xl text-plum font-serif font-regular ">Your Kudos Balance</p>
                    <p className="mx-auto text-5xl text-plum font-serif font-medium text-center">{receivedKudosTotal}</p>
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
          <div className="flex justify-center pt-8 pb-8 md:px-10">
              <div className="grid-background">
                <div className="grid-container">
                  <div className="item1">
                    Letters Sent
                    <p className="font-bold">{sentMessagesAmt}</p>
                  </div>
                  <div className="item2">
                    Letters Received
                    <p className="font-bold">{receivedMessagesAmt}</p>
                  </div>
                  <div className="item3">
                    Total Letters Sent Across Ally
                    <p className="font-bold">{allMessages}</p>
                  </div>  
                  <div className="item4 flex justify-start">
                    <div className="pb-10">
                        <XYPlot
                        width={windowDimensions.width / 1.6}
                        height={200}
                        xDomain={[50, 600]}
                        yDomain={[0, (Math.max.apply(Math, (monthlySent, monthlyReceived)))]}
                        >
                        <VerticalBarSeries data={monthlyReceivedPlotPoints} color="#CB3974" />
                        <VerticalBarSeries data={monthlySentPlotPoints} color="#1C988A"/>
                        <XAxis 
                        style={{
                          text: {stroke: 'none', fill: '#5F285E', fontWeight: 100}
                        }}
                        tickValues={[50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600]}
                        tickFormat={d => {
                            return months[d/50 - 1]; 
                        }}/>
                        <div className="text-lg text-blueberry pt-4">Months</div>
                        </XYPlot>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <div className="w-full flex justify-center">
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