import React, { useMemo, useCallback, useState, useEffect } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "../assets/css//CountSection.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApiData } from "../../src/common/ApiContext";

const CountSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [eventStataticsList, setEventStataticsList] = useState([]);
  const {
    homeVideoSettings,
    eventDetails,
    eventGeneralSettings,
    themeSettings,
  } = useApiData();
  useEffect(() => {
    callStataticsListApi();
    // eslint-disable-next-line
  }, []);

  const callStataticsListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`https://www.australia.lithium-downstream-summit.com/admin1/eventstatatics`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setEventStataticsList(data["eventStatatics"]);
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

  return (
    <div
      className="HomeScreen_statSection__2npwm"
      ref={ref}
      style={{
        backgroundImage: `url(${homeVideoSettings?.eventStataticsBackImage})`,
      }}
    >
      <div className="HomeScreen_statsContainer__ah6rE">
        {eventStataticsList.map((stat, i) => (
          <div>
            <div>
              <span>
                {inView ? <CountUp end={stat.topicCount} duration={1.7} /> : 0}
              </span>
              {stat?.countIcon === "true" && <span>+</span>}
            </div>
            <p>{stat.topicLabel}</p>
          </div>
        ))}
      </div>
    </div>
    // <section ref={ref} className="h-full">
    //     <div className="bg-no-repeat relative h-80 flex items-center z-1 bg-[#00baff] bg-cover bg-left py-20 text-[#181818]">
    //     <img src={bg_img} className="absolute top-0 z-0 object-contain opacity-60 pointer-events-none select-none"/>
    //     <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 text-center gap-20 z-10">
    //         {stats.map((stat, i) => (
    //         <div key={i}>
    //             <h3 className="text-[60px] font-extrabold leading-none">
    //             {inView ? <CountUp end={stat.value} duration={2} /> : 0}
    //             {stat.suffix}
    //             </h3>
    //             <p className="text-lg font-semibold mt-2">{stat.label}</p>
    //         </div>
    //         ))}
    //     </div>
    //   </div>
    // </section>
  );
};

export default CountSection;
