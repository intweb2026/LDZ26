import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../Footer";
import SubscribeForm from "./SubscribeForm";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/attandees.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
import Slider from "react-slick";
import { Helmet } from "react-helmet-async";
import { usePageSeo } from "../common/usePageSeo";
import { useApiData } from "../common/ApiContext";
import API_BASE_URL from '../config/apiConfig';

const allTopics = [
  {
    id: 1,
    title:
      "DECENTRALISING FINANCE: BITCOIN’S ROLE IN THE EVOLUTION OF GLOBAL MONEY",
    day: "Day 1",
    date: "WEDNESDAY, 1 JULY, 2026",
    time: "11:30 - 11:55",
    speaker: "Speaker A",
    category: "Market Dynamics",
  },
  {
    id: 2,
    title: "FROM CODE TO CAPITAL: HOW BITCOIN INNOVATION IS RESHAPING FINANCIAL MARKETS",
    day: "Day 1",
    date: "WEDNESDAY, 1 JULY, 2026",
    time: "13:30 - 13:55",
    speaker: "Speaker B",
    category: "Mining Security",
  },
  {
    id: 3,
    title: "BITCOIN BEYOND CURRENCY: DRIVING INNOVATION ACROSS GLOBAL FINANCIAL SYSTEMS",
    day: "Day 1",
    date: "WEDNESDAY, 1 JULY, 2026",
    time: "14:00 - 14:25",
    speaker: "Speaker C",
    category: "Blockchain Technology",
  },
];

const Attandees = () => {
  const sliderRef = useRef(null);

  const navigate = useNavigate();
  const [agendaList, setAgendaList] = useState(null);
  const [pastAttandeeList, setPastAttandeeList] = useState([]);
  const [leadersList, setLeadersList] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const {
    eventDetails,
  } = useApiData();
  const agendaVersion = eventDetails?.agendaVersion;

  useEffect(() => {
    callPastAttandeeListApi();
    callLeadersListApi();
    callAgendaListApi();
  }, []);

  const callAgendaListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      `${API_BASE_URL}/admin1/getagenda`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          (data.detail === "The Token is expired" ||
            data.message === "Invalid token")
        ) {
          localStorage.clear();
          navigate("/logout");
        } else if (data && data.status !== false) {
          // DRF response might be direct array or status wrapped
          setAgendaList(data.agendaList || data);
          // setTotalCount(data?.paginationDetails?.count);
        }
      })
      .catch((error) => {
        setTimeout(() => {
          toast.error("There was an error, Please try again later.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, 1000);
      });
  };

  // const updatedAgendaList = agendaList.filter((item) => item.status === "Speaker").slice(0, 3);
  // Replace the broken line with this:
  const dayItem = Array.isArray(agendaList)
    ? agendaList.find((item) => item.status === "Day")
    : null;

  const updatedAgendaList = Array.isArray(agendaList)
    ? agendaList.filter((item) => item.status === "Speaker").slice(0, 3)
    : [];


  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const callPastAttandeeListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`${API_BASE_URL}/admin1/pastAttandeelist`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          (data.detail === "The Token is expired" ||
            data.message === "Invalid token")
        ) {
          navigate("/logout");
        }
        if (data && data.status) {
          setPastAttandeeList(data["pastAttandees"]);
        } else {
          toast.error(data?.message);
        }
      })
      .catch((error) => {
        setTimeout(() => {
          toast.error("There was an error, Please try again later.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, 1000);
      });
  };

  const callLeadersListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`${API_BASE_URL}/admin1/eventleaderlist`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          (data.detail === "The Token is expired" ||
            data.message === "Invalid token")
        ) {
          navigate("/logout");
        }
        if (data && data.status) {
          setLeadersList(data["eventLeaders"]);
          setIsDataLoaded(true); // Set data loaded flag
        } else {
          toast.error(data?.message);
        }
      })
      .catch((error) => {
        setTimeout(() => {
          toast.error("There was an error, Please try again later.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, 1000);
      });
  };

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function padToFill(array, totalItems) {
    const result = [...array];
    let i = 0;
    while (result.length < totalItems) {
      result.push(array[i % array.length]);
      i++;
    }
    return result;
  }

  const [settings, setSettings] = useState({});
  const [chunkedAttendees, setChunkedAttendees] = useState([]);

  useEffect(() => {
    const updateSettings = () => {
      const width = window.innerWidth;
      let itemsPerSlide = pastAttandeeList.length;
      let gridColumns = 3;
      let gridRows = 4;

      if (width <= 420) {
        itemsPerSlide = 3;
        gridColumns = 1;
        gridRows = 3;
      } else if (width <= 768) {
        itemsPerSlide = 6;
        gridColumns = 2;
        gridRows = 3;
      }

      const autoplayOn = false; // Disabled auto sliding
      const attendeesImg = pastAttandeeList.map((attendees) => attendees);
      const totalSlides = Math.ceil(attendeesImg.length / itemsPerSlide);
      const totalNeeded = totalSlides * itemsPerSlide;
      const padded = padToFill(attendeesImg, totalNeeded);
      const chunked = chunkArray(padded, itemsPerSlide);
      const hasEnoughSlides = attendeesImg.length > itemsPerSlide;

      setSettings({
        dots: false,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        infinite: hasEnoughSlides,
      });

      setChunkedAttendees(
        chunked.map((group, idx) => ({
          id: idx,
          items: group,
          gridColumns,
          gridRows,
        }))
      );
    };

    updateSettings();
    window.addEventListener("resize", updateSettings);
    return () => window.removeEventListener("resize", updateSettings);
  }, [pastAttandeeList]);

  const [leadersSettings, setLeadersSettings] = useState({});
  const [chunkedLeaders, setChunkedLeaders] = useState([]);

  useEffect(() => {
    if (!isDataLoaded || leadersList.length === 0) return;

    const updateSettings = () => {
      const width = window.innerWidth;
      let itemsPerSlide = 6;
      let gridColumns = 3;
      let gridRows = 2;

      if (width <= 638) {
        itemsPerSlide = 2;
        gridColumns = 1;
        gridRows = 1;
      } else if (width <= 1339) {
        itemsPerSlide = 4;
        gridColumns = 2;
        gridRows = 2;
      }

      const leadersImg = leadersList.map((leaders) => leaders);
      const totalSlides = Math.ceil(leadersImg.length / itemsPerSlide);
      const totalNeeded = totalSlides * itemsPerSlide;
      const padded = padToFill(leadersImg, totalNeeded);
      const chunked = chunkArray(padded, itemsPerSlide);

      setLeadersSettings({
        dots: false,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        initialSlide: 0, // Ensure it starts at first slide
        adaptiveHeight: true, // Help with rendering issues
      });

      setChunkedLeaders(
        chunked.map((group, idx) => ({
          id: idx,
          items: group,
          gridColumns,
          gridRows,
        }))
      );
    };

    updateSettings();
    window.addEventListener("resize", updateSettings);
    return () => window.removeEventListener("resize", updateSettings);
  }, [leadersList, isDataLoaded]);

  // Force slider refresh when data is loaded (removed auto-play control)
  useEffect(() => {
    if (isDataLoaded && sliderRef.current && chunkedLeaders.length > 0) {
      setTimeout(() => {
        sliderRef.current.slickGoTo(0);
      }, 100);
    }
  }, [isDataLoaded, chunkedLeaders]);

  const pageSeo = usePageSeo("attandees");
  const seoTitle = pageSeo.pageMetaTitle;
  const seoDesc = pageSeo.pageMetaDescription
  const seoImage = pageSeo.pageOgImage || null;

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:type" content="website" />
        {seoImage && <meta property="og:image" content={seoImage} />}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        {seoImage && <meta name="twitter:image" content={seoImage} />}
        <link rel="canonical" href=`${API_BASE_URL}/attendees` />
      </Helmet>
      <Navbar forceScrolled />
      <div style={{ opacity: 1 }}>
        <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
          <div className="Attendees_container__bjQvI">
            <div className="PastAttendees_container__DHaT5">
              <div className="PastAttendees_AttendeesContainer__BeIwX">
                <h1>past Attendees at our event</h1>
                <div className="PastAttendees_cardContainerOuter__yeePA">
                  <Slider {...settings}>
                    {chunkedAttendees.map((attendee, index) => (
                      <div key={index} className="PastAttendees_cardContainerInner__i-ICs">
                        {attendee.items.map((group) => (
                          <div
                            key={group.id}
                            className="PastAttendees_card__vhIWG"
                          >
                            <img
                              src={group.pastAttandeeLogo}
                              alt={group.pastAttandeeName}
                            ></img>
                            <div className="PastAttendees_overlay__IOoZm">
                              <div className="PastAttendees_text__rUF0f">
                                {group.pastAttandeeName}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
            {agendaVersion !== 'ReleasedSoon' && agendaVersion !== 'RollingOutSoon' ? (
              <div className="TopicsOnAgenda_container__86lkR">
                <div className="TopicsOnAgenda_agendaContainer__TBsgc">
                  <div>
                    <h2>topics on the agenda</h2>
                    <div className="TopicsOnAgenda_cardContainer__r-nhg">
                      {updatedAgendaList.map((topic, index) => (
                        <div key={index} className="TopicsOnAgenda_card__pUjOu">
                          <p>{topic.heading}</p>
                          <div>
                            <p>
                              {topic?.day}: {dayItem?.heading}
                            </p>
                            <p>{topic.startTime} - {topic.endTime}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <a href="/agenda-page">view more topics</a>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="Operators_container__Pn2Qp">
              <div className="Operators_AttendeesContainer__ZP8rw">
                <h2>Meet The Leaders</h2>
                {/* Only render slider when data is loaded */}
                {isDataLoaded && chunkedLeaders.length > 0 ? (
                  <div className="Operators_cardContainerOuter__A0koD">
                    <button onClick={() => sliderRef.current.slickPrev()}>
                      <svg
                        stroke="currentColor"
                        fill="#c9c9c9"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        className="arrows"
                        height="35"
                        width="35"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path>
                      </svg>
                    </button>
                    <div>
                      <Slider key={`leaders-${chunkedLeaders.length}`} ref={sliderRef} {...leadersSettings}>
                        {chunkedLeaders.map((leader, index) => (
                          <div key={index} className="Operators_cardContainerInner__Cmd5S">
                            {leader.items.map((data, dataIndex) => (
                              <div key={dataIndex} className="Operators_card__YB2Bt">
                                <img
                                  src={data.leaderLogo}
                                  alt={data.leaderName}
                                ></img>
                                <div className="Operators_overlay__A7m4i">
                                  <div className="Operators_text__2A1cs">
                                    {data.leaderName}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </Slider>
                    </div>
                    <button onClick={() => sliderRef.current.slickNext()}>
                      <svg
                        stroke="currentColor"
                        fill="#c9c9c9"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        className="arrows"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div>Loading leaders...</div>
                )}
              </div>
            </div>
            <SubscribeForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Attandees;