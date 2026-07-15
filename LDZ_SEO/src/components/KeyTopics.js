import React from "react";
import { cleanHtml } from "../utils/cleanHtml";
import "../assets/css/keytopics.css";
import { useSSRData } from "../common/useSSRData";

const KeyTopics = () => {
  // ✅ SSR data — no client-side API call
  const ssrKeyPointList = useSSRData("eventKeyPoints");
  const keyPointList = ssrKeyPointList || [];
  return (
    <article className="TopicSection_topicSection__Tc8jF">
      <h2>key topics for 2026</h2>
      <div className="TopicSection_topicsContainer__-dntb">
        {keyPointList.map((topic, index) => (
          <div key={index} className="TopicSection_topic__dNISv">
            <h4>{topic.pointLabel}</h4>
            <div
              lang="en"
              dangerouslySetInnerHTML={{
                __html: cleanHtml(topic.pointDescription),
              }}
            ></div>
          </div>
        ))}
      </div>
      <div className="TopicSection_btn__0YjT+">
        <a href="/agenda-page">
          VIEW PROGRAM
        </a>
      </div>
    </article>
  );
};

export default KeyTopics;
