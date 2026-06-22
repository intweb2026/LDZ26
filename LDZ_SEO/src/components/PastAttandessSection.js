import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pointer } from "lucide-react";
import "../assets/css/PastAttandessSection.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApiData } from "../../src/common/ApiContext";
import API_BASE_URL, { mediaUrl } from '../config/apiConfig';
const PastAttandessSection = () => {
  const navigate = useNavigate();
  const [subscriberName, setSubscriberName] = useState("");
  const [subscriberNameError, setSubscriberNameError] = useState("");
  const [subscriberErrorMessage, setSubscriberErrorMessage] = useState("");
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscriberEmailError, setSubscriberEmailError] = useState("");
  const [expertSpeakerList, setExpertSpeakerList] = useState([]);
  const [homePastAttandeeList, setHomePastAttandeeList] = useState([]);
  const {
    homeVideoSettings,
    eventDetails,
    eventGeneralSettings,
    themeSettings,
  } = useApiData();
  useEffect(() => {
    callExpertSpeakerListApi();
    callHomePastAttandeeListApi();
    // eslint-disable-next-line
  }, []);

  const callExpertSpeakerListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`${API_BASE_URL}/admin1/expertspeakers`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setExpertSpeakerList(data["expertSpeakers"]);
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

  const callHomePastAttandeeListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`${API_BASE_URL}/admin1/homepastattandees`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setHomePastAttandeeList(data["homePastAttandees"]);
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

  // ✅ Subscription email function
  async function sendSubscriptionEmail(email) {
    const htmlContent = `
      <p><strong>Thank you for subscribing!</strong></p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><u><strong>Quick Access</strong></u><br/>
      Link: ${'<a href="' + API_BASE_URL + '">' + API_BASE_URL + '</a>'}</p>
    `;

    const emailPayload = {
      toemail: email,
      cc: "",
      subject: `SUBSCRIPTION: ${eventDetails?.eventName}`,
      html: htmlContent,
    };

    try {
      const emailResponse = await fetch(
        `${API_BASE_URL}/admin1/sendmail`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailPayload),
        }
      );
      const emailResult = await emailResponse.json();
      if (emailResult.status === "success") {
        console.log("✅ Subscription email sent successfully");
      } else {
        console.error("❌ Subscription email sending failed:", emailResult.message);
      }
    } catch (error) {
      console.error("❌ Error sending subscription email:", error);
    }
  }

  // ✅ Made async to await API + email
  const submitBtnClk = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setSubscriberEmailError(false);
    setSubscriberNameError(false);
    setSubscriberErrorMessage("");

    if (subscriberEmail === "") {
      setSubscriberErrorMessage(
        <p style={{ color: 'red', fontSize: '14px', fontWeight: 500, textAlign: 'left', marginTop: '2px', position: 'absolute' }}>
          Email address is required
        </p>
      );
      setSubscriberEmailError(true);
      return;
    } else if (!emailRegex.test(subscriberEmail)) {
      setSubscriberErrorMessage(
        <p style={{ color: 'red', fontSize: '14px', fontWeight: 500, textAlign: 'left', marginTop: '2px', position: 'absolute' }}>
          Invalid email address
        </p>
      );
      setSubscriberEmailError(true);
      return;
    }

    const finalData = new FormData();
    finalData.append("subscriberName", subscriberName);
    finalData.append("subscriberEmail", subscriberEmail);

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin1/addsubscriber`,
        { method: "POST", body: finalData }
      );
      const data = await response.json();

      if (data.status) {
        // ✅ Send confirmation email only on success
        await sendSubscriptionEmail(subscriberEmail);

        setSubscriberErrorMessage(
          <p style={{ color: 'green' }}>Subscribed Successfully</p>
        );
        setTimeout(() => setSubscriberErrorMessage(""), 5000);

        setSubscriberEmail("");
        setSubscriberName("");
      } else {
        // toast.error(data?.message);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleButtonHover = (e, isHovering) => {
    if (isHovering) {
      e.target.style.backgroundColor = "white";
      e.target.style.color = "#00baff";
      e.target.style.borderColor = "#00baff";
    } else {
      e.target.style.backgroundColor = "#00baff";
      e.target.style.color = "white";
      e.target.style.borderColor = "transparent";
    }
  };
  return (
    <article
      className="HomeScreen_registerSection__LKEHw"
      style={{ backgroundImage: `url(${mediaUrl(homeVideoSettings?.eventExpertSpeakerBackImage)})` }}
    >
      <div className="HomeScreen_registerContainer__X9V4n">
        <div className="HomeScreen_expertSpeakers__Zs1Eo">
          <h2>Expert Speakers</h2>
          <div>
            {expertSpeakerList.map((speaker, index) => (
              <div key={index}>
                <h4>{speaker?.expertSpeakerName}</h4>
                <p>{speaker?.expertSpeakerCompany}</p>
              </div>
            ))}
            {/* <div>
              <h4>Maher Al Kaabi</h4>
              <p>Alserkal Group</p>
            </div>
            <div>
              <h4>Ahmed Yousry</h4>
              <p>ACWA Power</p>
            </div>
            <div>
              <h4>Oren Heymans</h4>
              <p>Entegris</p>
            </div> */}
          </div>
          <a href="/featured-speakers">
            Show more Speakers
            <svg
              className="NewsSection_iconArrow__DM6M5"
              width="28"
              height="16"
              viewBox="0 0 28 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.2071 8.70711C23.5976 8.31658 23.5976 7.68342 23.2071 7.29289L16.8431 0.928932C16.4526 0.538408 15.8195 0.538408 15.4289 0.928932C15.0384 1.31946 15.0384 1.95262 15.4289 2.34315L21.0858 8L15.4289 13.6569C15.0384 14.0474 15.0384 14.6805 15.4289 15.0711C15.8195 15.4616 16.4526 15.4616 16.8431 15.0711L23.2071 8.70711ZM0 9H22.5V7H0V9Z"
                style={{ fill: "#000000" }}
              ></path>
            </svg>
          </a>
        </div>
        <div className="HomeScreen_listContainer__AQf28">
          <h2>Past Attendees</h2>
          <div className="ListCard_listContainer__dQYSB">
            {homePastAttandeeList.map((attendee, index) => (
              <div
                className="ListCard_listItems__-IQDE"
                style={{ marginBottom: "5px" }}
                key={index}
              >
                <svg
                  stroke="currentColor"
                  fill="var(--secondary-color)"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    marginTop: "2px",
                    marginRight: "16px",
                    minWidth: "10px",
                    maxWidth: "10px",
                  }}
                >
                  <path d="M405.333 64H106.667C83.198 64 64 83.198 64 106.667v298.666C64 428.802 83.198 448 106.667 448h298.666C428.802 448 448 428.802 448 405.333V106.667C448 83.198 428.802 64 405.333 64z"></path>
                </svg>
                <p>{attendee?.attandeeName}</p>
              </div>
            ))}
            {/* <div className="ListCard_listItems__-IQDE">
              <svg
                stroke="currentColor"
                fill="#080808"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  marginTop: "5px",
                  marginRight: "16px",
                  minWidth: "10px",
                  maxWidth: "10px",
                }}
              >
                <path d="M405.333 64H106.667C83.198 64 64 83.198 64 106.667v298.666C64 428.802 83.198 448 106.667 448h298.666C428.802 448 448 428.802 448 405.333V106.667C448 83.198 428.802 64 405.333 64z"></path>
              </svg>
              <p>Ramboll Group</p>
            </div>
            <div className="ListCard_listItems__-IQDE">
              <svg
                stroke="currentColor"
                fill="#080808"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  marginTop: "5px",
                  marginRight: "16px",
                  minWidth: "10px",
                  maxWidth: "10px",
                }}
              >
                <path d="M405.333 64H106.667C83.198 64 64 83.198 64 106.667v298.666C64 428.802 83.198 448 106.667 448h298.666C428.802 448 448 428.802 448 405.333V106.667C448 83.198 428.802 64 405.333 64z"></path>
              </svg>
              <p>SAUR</p>
            </div>
            <div className="ListCard_listItems__-IQDE">
              <svg
                stroke="currentColor"
                fill="#080808"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  marginTop: "5px",
                  marginRight: "16px",
                  minWidth: "10px",
                  maxWidth: "10px",
                }}
              >
                <path d="M405.333 64H106.667C83.198 64 64 83.198 64 106.667v298.666C64 428.802 83.198 448 106.667 448h298.666C428.802 448 448 428.802 448 405.333V106.667C448 83.198 428.802 64 405.333 64z"></path>
              </svg>
              <p>SmartValve</p>
            </div>
            <div className="ListCard_listItems__-IQDE">
              <svg
                stroke="currentColor"
                fill="#080808"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  marginTop: "5px",
                  marginRight: "16px",
                  minWidth: "10px",
                  maxWidth: "10px",
                }}
              >
                <path d="M405.333 64H106.667C83.198 64 64 83.198 64 106.667v298.666C64 428.802 83.198 448 106.667 448h298.666C428.802 448 448 428.802 448 405.333V106.667C448 83.198 428.802 64 405.333 64z"></path>
              </svg>
              <p>Royal Haskoning DHV</p>
            </div>
            <div className="ListCard_listItems__-IQDE">
              <svg
                stroke="currentColor"
                fill="#080808"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  marginTop: "5px",
                  marginRight: "16px",
                  minWidth: "10px",
                  maxWidth: "10px",
                }}
              >
                <path d="M405.333 64H106.667C83.198 64 64 83.198 64 106.667v298.666C64 428.802 83.198 448 106.667 448h298.666C428.802 448 448 428.802 448 405.333V106.667C448 83.198 428.802 64 405.333 64z"></path>
              </svg>
              <p>ENOWA.NEOM</p>
            </div>
            <div className="ListCard_listItems__-IQDE">
              <svg
                stroke="currentColor"
                fill="#080808"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  marginTop: "5px",
                  marginRight: "16px",
                  minWidth: "10px",
                  maxWidth: "10px",
                }}
              >
                <path d="M405.333 64H106.667C83.198 64 64 83.198 64 106.667v298.666C64 428.802 83.198 448 106.667 448h298.666C428.802 448 448 428.802 448 405.333V106.667C448 83.198 428.802 64 405.333 64z"></path>
              </svg>
              <p>Flowless</p>
            </div>
            <div className="ListCard_listItems__-IQDE">
              <svg
                stroke="currentColor"
                fill="#080808"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  marginTop: "5px",
                  marginRight: "16px",
                  minWidth: "10px",
                  maxWidth: "10px",
                }}
              >
                <path d="M405.333 64H106.667C83.198 64 64 83.198 64 106.667v298.666C64 428.802 83.198 448 106.667 448h298.666C428.802 448 448 428.802 448 405.333V106.667C448 83.198 428.802 64 405.333 64z"></path>
              </svg>
              <p>Azer Group</p>
            </div>
            <div className="ListCard_listItems__-IQDE">
              <svg
                stroke="currentColor"
                fill="#080808"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  marginTop: "5px",
                  marginRight: "16px",
                  minWidth: "10px",
                  maxWidth: "10px",
                }}
              >
                <path d="M405.333 64H106.667C83.198 64 64 83.198 64 106.667v298.666C64 428.802 83.198 448 106.667 448h298.666C428.802 448 448 428.802 448 405.333V106.667C448 83.198 428.802 64 405.333 64z"></path>
              </svg>
              <p>Upande Limited</p>
            </div>
            <div className="ListCard_listItems__-IQDE">
              <svg
                stroke="currentColor"
                fill="#080808"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  marginTop: "5px",
                  marginRight: "16px",
                  minWidth: "10px",
                  maxWidth: "10px",
                }}
              >
                <path d="M405.333 64H106.667C83.198 64 64 83.198 64 106.667v298.666C64 428.802 83.198 448 106.667 448h298.666C428.802 448 448 428.802 448 405.333V106.667C448 83.198 428.802 64 405.333 64z"></path>
              </svg>
              <p>Deltares</p>
            </div> */}
          </div>
          <a href="/attendees">
            Show more Attendees
            <svg
              className="NewsSection_iconArrow__DM6M5"
              width="28"
              height="16"
              viewBox="0 0 28 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.2071 8.70711C23.5976 8.31658 23.5976 7.68342 23.2071 7.29289L16.8431 0.928932C16.4526 0.538408 15.8195 0.538408 15.4289 0.928932C15.0384 1.31946 15.0384 1.95262 15.4289 2.34315L21.0858 8L15.4289 13.6569C15.0384 14.0474 15.0384 14.6805 15.4289 15.0711C15.8195 15.4616 16.4526 15.4616 16.8431 15.0711L23.2071 8.70711ZM0 9H22.5V7H0V9Z"
                style={{ fill: "#000000" }}
              ></path>
            </svg>
          </a>
        </div>
        <div className="HomeScreen_cardContainer__dWb-Q">
          <h2 className="HomeScreen_hiddentext__QHgxf">hidden text</h2>
          <div className="HomeScreen_card__eORgl">
            <h3>subscribe for updates</h3>
            <form
              id="LDZ-(Subscribe For Updates 2026)"
              enctype="multipart/form-data"
              method="POST"
              data-hs-cf-bound="true"
              onSubmit={submitBtnClk}
            >
              <input
                name="name"
                // type="text"
                placeholder="Name"
                value={subscriberName}
                onChange={(e) => {
                  setSubscriberName(e.target.value);
                  setSubscriberNameError(false);
                }}
              />
              <input
                name="email"
                // type="email"
                placeholder="Email Address"
                value={subscriberEmail}
                onChange={(e) => {
                  setSubscriberEmail(e.target.value);
                  if (subscriberErrorMessage) setSubscriberErrorMessage("");
                  setSubscriberEmailError(false);
                }}
              />
              <button type="submit">Join</button>
            </form>
            {subscriberErrorMessage && (subscriberErrorMessage)}
            {/* <p style={{ color: 'green', fontSize: '14px', fontWeight: 500, textAlign: 'left', marginTop: '2px', position: 'absolute' }}>{subscriberErrorMessage}</p> */}
          </div>
          <h5 className="HomeScreen_hiddentext__QHgxf">hidden text</h5>
        </div>
      </div>
    </article>

    // <div className="relative bg-[#14c0fff8] py-12 overflow-hidden">
    // <img src={bg_img} className="hidden md:block absolute right-0 top-0 h-full w-1/2 opacity- z-2 "/>

    //     <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-black z-10 relative">
    //       {/* Expert Speakers */}
    //       <div>
    //         <h2 className="text-black text-2xl font-bold mb-4 tracking-wider">EXPERT SPEAKERS</h2>
    //         <div className="space-y-4">
    //           <div className="bg-white p-4 rounded-lg shadow-md">
    //             <p className="text-gray-800 font-semibold text-lg">Maher Al Kaabi</p>
    //             <p className="text-gray-600 text-sm">Alserkal Group</p>
    //           </div>
    //           <div className="bg-white p-4 rounded-lg shadow-md">
    //             <p className="text-gray-800 font-semibold text-lg">Ahmed Yousry</p>
    //             <p className="text-gray-600 text-sm">ACWA Power</p>
    //           </div>
    //           <div className="bg-white p-4 rounded-lg shadow-md">
    //             <p className="text-gray-800 font-semibold text-lg">Oren Heymans</p>
    //             <p className="text-gray-600 text-sm">Entegris</p>
    //           </div>
    //         </div>
    //         <a onClick={() => navigate("/featured-Speakers")} className="text-black mt-4 flex items-center hover:underline text-sm font-bold" style={{cursor:'Pointer'}}>
    //           SHOW MORE SPEAKERS
    //           <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    //           </svg>
    //         </a>
    //       </div>

    //       {/* Past Attendees */}
    //       <div>
    //         <h2 className="text-black text-2xl font-bold mb-4 tracking-wider">PAST ATTENDEES</h2>
    //         <ul className="bg-white text-black py-3 space-y-4 text-sm">
    //           <li className="flex items-center">
    //             <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
    //             Ramboll Group
    //           </li>
    //           <li className="flex items-center">
    //             <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
    //             SAUR
    //           </li>
    //           <li className="flex items-center">
    //             <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
    //             SmartValve
    //           </li>
    //           <li className="flex items-center">
    //             <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
    //             Royal Haskoning DHV
    //           </li>
    //           <li className="flex items-center">
    //             <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
    //             ENOWA-NEOM
    //           </li>
    //           <li className="flex items-center">
    //             <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
    //             Flowless
    //           </li>
    //           <li className="flex items-center">
    //             <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
    //             Azer Group
    //           </li>
    //           <li className="flex items-center">
    //             <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
    //             Upande Limited
    //           </li>
    //           <li className="flex items-center">
    //             <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
    //             Deltares
    //           </li>
    //         </ul>
    //         <a onClick={() => navigate("/attandees")} style={{cursor:'pointer'}} className="text-black mt-4 flex items-center hover:underline text-sm font-bold">
    //           SHOW MORE ATTENDEES
    //           <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    //           </svg>
    //         </a>
    //       </div>

    //       {/* CTA Card */}
    //       <div className="flex items-center justify-center">
    //         <div className="bg-white p-6 rounded-lg shadow-lg text-center">
    //          <img src={ticket_img} />
    //           <button className="bg-black text-white mt-3 py-2 px-6 rounded hover:bg-[#bfbfbf] hover:!text-black transition text-sm font-semibold" onClick={() => navigate("/booking")}>
    //             REGISTER NOW
    //           </button>
    //         </div>
    //       </div>
    //     </div>

    // </div>
  );
};

export default PastAttandessSection;
