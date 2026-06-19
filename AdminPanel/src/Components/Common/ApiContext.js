// ApiContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/apiConfig";

// Create the context
const ApiDataContext = createContext();

// Custom hook to use the context
export const useApiData = () => {
  const context = useContext(ApiDataContext);
  if (!context) {
    throw new Error("useApiData must be used within an ApiDataProvider");
  }
  return context;
};

// Provider component
export const ApiDataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const navigate = useNavigate(); // Move useNavigate inside the component
  
  console.log("data: ", data);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`${API_BASE_URL}/admin1/homepagedata`, requestOptions)
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
          setData(data["homePageSettings"]);
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

  const value = {
    data,
    // Provide direct access to commonly used data
    homeVideoSettings: data?.homeVideoSctionSettings?.[0],
    eventDetails: data?.homeVideoSctionEventDetails?.[0],
    eventGeneralSettings: data?.eventGeneralSettings?.[0],
    themeSettings: data?.themeSetting?.[0],
    navLogos: data?.navLogos?.[0],
    refetch: () => fetchData(),
  };

  return (
    <ApiDataContext.Provider value={value}>{children}</ApiDataContext.Provider>
  );
};