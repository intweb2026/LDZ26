// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ApiDataContext = createContext();

// export const useApiData = () => {
//   const context = useContext(ApiDataContext);
//   if (!context) {
//     throw new Error("useApiData must be used within an ApiDataProvider");
//   }
//   return context;
// };

// export const ApiDataProvider = ({ children, initialData = null }) => {
//   const navigate = typeof window !== 'undefined' ? useNavigate() : null;
//   const [data, setData] = useState(initialData);
//   const [isLoading, setIsLoading] = useState(!initialData);

//   // Set default theme values immediately
//   useEffect(() => {
//     if (typeof window === 'undefined') return; // Skip on server

//     const setDefaultTheme = () => {
//       document.documentElement.style.setProperty("--primary-color", "#00baff");
//       document.documentElement.style.setProperty("--secondary-color", "#080808");
//       document.documentElement.style.setProperty("--dark-color", "#019fda");
//       document.documentElement.style.setProperty("--light-color", "#ffffff");
//       document.documentElement.style.setProperty(
//         "--linearGradient-color",
//         "linear-gradient(108.01deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 41.4%, rgba(0, 186, 255, 0.491765) 82.8%, rgba(0, 186, 255, 0.24) 124.19%)"
//       );
//     };

//     setDefaultTheme();

//     // Only fetch if we don't have initial data
//     if (!initialData) {
//       fetchData();
//     }
//   }, [initialData]);

//   const fetchData = () => {
//     const requestOptions = {
//       method: "GET",
//     };

//     fetch(`https://www.australia.lithium-downstream-summit.com/admin1/homepagedata`, requestOptions)
//       .then((response) => response.json())
//       .then((data) => {
//         if (
//           data &&
//           (data.detail === "The Token is expired" ||
//             data.message === "Invalid token")
//         ) {
//           if (navigate) navigate("/logout");
//         }
//         if (data && data.status) {
//           setData(data["homePageSettings"]);
//           setIsLoading(false);
//         } else {
//           if (typeof window !== 'undefined') {
//             toast.error(data?.message);
//           }
//           setIsLoading(false);
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//         if (typeof window !== 'undefined') {
//           setTimeout(() => {
//             toast.error("There was an error, Please try again later.", {
//               position: "top-right",
//               autoClose: 5000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });
//           }, 1000);
//         }
//       });
//   };

//   // Update theme when data changes
//   useEffect(() => {
//     if (typeof window === 'undefined') return; // Skip on server

//     if (data?.themeSetting?.[0]) {
//       const theme = data.themeSetting[0];
//       document.documentElement.style.setProperty(
//         "--primary-color",
//         theme.primaryColor
//       );
//       document.documentElement.style.setProperty(
//         "--secondary-color",
//         theme.secondaryColor
//       );
//       document.documentElement.style.setProperty(
//         "--dark-color",
//         theme.darkColor
//       );
//       document.documentElement.style.setProperty(
//         "--light-color",
//         theme.lightColor
//       );
//       document.documentElement.style.setProperty(
//         "--linearGradient-color",
//         theme.gradientColor
//       );
//     }
//   }, [data]);

//   const value = {
//     data,
//     isLoading,
//     refetch: () => fetchData(),
//   };

//   return (
//     <ApiDataContext.Provider value={value}>{children}</ApiDataContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApiDataContext = createContext();

export const useApiData = () => {
  const context = useContext(ApiDataContext);
  if (!context) {
    throw new Error("useApiData must be used within an ApiDataProvider");
  }
  return context;
};

export const ApiDataProvider = ({ children, initialData = null }) => {
  const navigate = typeof window !== 'undefined' ? useNavigate() : null;
  const [data, setData] = useState(() => {
    // Always read home data from initialData.home
    return initialData?.home ?? null;
  });
  const [isLoading, setIsLoading] = useState(() => {
    return !initialData?.home;
  });

  // Set default theme values immediately
  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip on server

    const setDefaultTheme = () => {
      document.documentElement.style.setProperty("--primary-color", "#00baff");
      document.documentElement.style.setProperty("--secondary-color", "#080808");
      document.documentElement.style.setProperty("--dark-color", "#019fda");
      document.documentElement.style.setProperty("--light-color", "#ffffff");
      document.documentElement.style.setProperty(
        "--linearGradient-color",
        "linear-gradient(108.01deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 41.4%, rgba(0, 186, 255, 0.491765) 82.8%, rgba(0, 186, 255, 0.24) 124.19%)"
      );
    };

    setDefaultTheme();

    // Only fetch if we don't have initial data
    if (!initialData?.home) {
      fetchData();
    }
  }, [initialData]);

  const fetchData = () => {
    const requestOptions = {
      method: "GET",
    };

   fetch(`${process.env.REACT_APP_API_URL}/admin1/homepagedata`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          (data.detail === "The Token is expired" ||
            data.message === "Invalid token")
        ) {
          if (navigate) navigate("/logout");
        }
        if (data && data.status) {
          setData(data["homePageSettings"]);
          setIsLoading(false);
        } else {
          if (typeof window !== 'undefined') {
            toast.error(data?.message);
          }
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        if (typeof window !== 'undefined') {
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
        }
      });
  };

  // Update theme when data changes
  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip on server

    if (data?.themeSetting?.[0]) {
      const theme = data.themeSetting[0];
      document.documentElement.style.setProperty(
        "--primary-color",
        theme.primaryColor
      );
      document.documentElement.style.setProperty(
        "--secondary-color",
        theme.secondaryColor
      );
      document.documentElement.style.setProperty(
        "--dark-color",
        theme.darkColor
      );
      document.documentElement.style.setProperty(
        "--light-color",
        theme.lightColor
      );
      document.documentElement.style.setProperty(
        "--linearGradient-color",
        theme.gradientColor
      );
    }
  }, [data]);

  const value = {
    data,
    isLoading,
    // Provide direct access to commonly used data
    homeVideoSettings: data?.homeVideoSctionSettings?.[0],
    eventDetails: data?.homeVideoSctionEventDetails?.[0],
    eventGeneralSettings: data?.eventGeneralSettings?.[0],
    themeSettings: data?.themeSetting?.[0],
    // navLogos is intentionally kept here for SSR compatibility
    // But Navbar component will fetch it directly to ensure latest data
    navLogos: data?.navLogos?.[0],
    refetch: () => fetchData(),
  };

  return (
    <ApiDataContext.Provider value={value}>{children}</ApiDataContext.Provider>
  );
};
