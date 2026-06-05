import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/keytopics.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const KeyTopics = () => {
  const [keyPointList, setKeyPointList] = useState([]);
  useEffect(() => {
    callEventKeyPointListApi();
    // eslint-disable-next-line
  }, []);

  const callEventKeyPointListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`https://www.australia.lithium-downstream-summit.com/admin1/eventkeypoints`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          (data.detail === "The Token is expired" ||
            data.message === "Invalid token")
        ) {
          localStorage.clear();
          navigate("/logout");
        }
        if (data && data.status) {
          setKeyPointList(data["keyPointsList"]);
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

  const navigate = useNavigate();
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
                __html: topic.pointDescription.replace(/^"(.*)"$/, "$1"),
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
