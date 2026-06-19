import React, { useState, useEffect } from "react";
import "../assets/css/ForumSection.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from '../config/apiConfig';
const speakerVideo = "/images/WebVideo/iq-hub-video.mp4";
const homePageIqHubVideo = "/images/WebVideo/iq-hub-video.mp4";
const homePageIqHubVideoPoster = "/images/WebImages/home-video-poster.jpg";
// const bgIg =
//   "https://www.desalination-resource-recovery.com/api/images/1742798974985.png";

const ForumSection = () => {
  const [taglineData, setTaglineData] = useState([]);
  const [isClickPlay, setClickPlay] = useState(false);
  useEffect(() => {
    callTaglineListApi();
    // eslint-disable-next-line
  }, []);
  const callTaglineListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`${API_BASE_URL}/admin1/taglinedata`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setTaglineData(data["taglineData"]);
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
  return (
    <article
      className="ForumSction_forumSection__Rvsvv"
      style={{
        backgroundImage: `url(${taglineData[0]?.thirdSectionBackgroundImage})`,
      }}
    >
      <h2>{taglineData[0]?.thirdSectionFirstTitle}</h2>
      <div className="ForumSction_forumContainer__wbFFJ">
        <div className="ForumSction_forumLeft__29GMV">
          <span>
            {/* <p>
              {taglineData[0]?.thirdSectionDescription?.replace(
                /^"(.*)"$/,
                "$1"
              )}
            </p> */}
            <div
              lang="en"
              dangerouslySetInnerHTML={{
                __html: taglineData[0]?.thirdSectionDescription?.replace(
                  /^"(.*)"$/,
                  "$1",
                ),
              }}
            ></div>
          </span>
        </div>
        <div className="ForumSction_forumRight__f3wIx">
          <div className="lazyload-wrapper">
            {!isClickPlay && (
              <svg
                onClick={() => setClickPlay(true)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <rect width="512" height="512" rx="64" fill="#000"></rect>
                <polygon
                  points="200,150 380,256 200,362"
                  fill="#FFFFFF"
                ></polygon>
              </svg>
            )}
            <video
              width="100%"
              height="100%"
              poster={homePageIqHubVideoPoster}
              playsinline
              controls={isClickPlay}
            >
              <source src={homePageIqHubVideo} type="video/mp4" />
            </video>
            {/* <iframe
              src={speakerVideo}
              frameborder="0"
              webkitallowfullscreen
              mozallowfullscreen
              className="ForumSction_iFrame__q2G3W"
            ></iframe> */}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ForumSection;
