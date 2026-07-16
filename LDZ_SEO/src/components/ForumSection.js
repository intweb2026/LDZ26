import React, { useState } from "react";
import { cleanHtml } from "../utils/cleanHtml";
import "../assets/css/ForumSection.css";
import { useSSRData } from "../common/useSSRData";
const speakerVideo = "/images/WebVideo/iq-hub-video.mp4";
const homePageIqHubVideo = "/images/WebVideo/iq-hub-video.mp4";
const homePageIqHubVideoPoster = "/images/WebImages/home-video-poster.jpg";
// const bgIg =
//   "https://www.desalination-resource-recovery.com/api/images/1742798974985.png";

const ForumSection = () => {
  // ✅ SSR data — no client-side API call
  const ssrTaglineData = useSSRData("taglineData");
  const taglineData = ssrTaglineData || [];
  const [isClickPlay, setClickPlay] = useState(false);
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
                __html: cleanHtml(taglineData[0]?.thirdSectionDescription),
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
              playsInline
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
