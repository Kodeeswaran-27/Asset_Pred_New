import React, { useState, useEffect } from "react";
import { Tooltip } from 'react-tooltip';
import "../../App.css";
import live_workspace from "../../Assets/live_workspace.png";
import logout from "../../Assets/logout.png";
import "../Navbar/Navbar.css";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../SSO/authConfig";
import { callMsGraph } from "../SSO/graph"; // Import your MS Graph call function
import { useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { GoUpload } from "react-icons/go";
import { TbChartInfographic } from "react-icons/tb";
import { FaChartPie } from "react-icons/fa";

function Navbar() {
  const { instance, accounts } = useMsal();
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState(""); // Assuming userRole is fetched too

  // Function to acquire token and fetch user data
  function RequestProfileData() {
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((data) => {
          setUserName(data.displayName || "User"); // Assume displayName is the correct field
          setUserRole(data.jobTitle || "Unknown Role"); // Assume jobTitle is the role field
        });
      })
      .catch((error) => {
        console.error("Error acquiring token silently: ", error);
      });
  }

  // useEffect to call RequestProfileData when component mounts
  useEffect(() => {
    RequestProfileData();
  }, []); // Empty dependency array ensures this runs once on mount

  // Handle logout
  const handleLogout = () => {
    instance
      .logoutRedirect({
        postLogoutRedirectUri: "/",
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const navigate = useNavigate();
  const responseData = JSON.parse(sessionStorage.getItem('responseData')) || [];
  //handle home
  return (
    <div className="Navbar">
      <div className="logo">
        <img src={live_workspace} alt="Live workspace" />
      </div>
      <div className="assetTitle">
        <h3>asset prediction</h3>
      </div>
      <div className="logout">
        <div className="tool">
          <button className="icons-btn" onClick={() => {
            navigate("/main/about")
          }}
          data-tooltip-id="home-tooltip"
          >
            <IoHomeOutline className="nav-icons" />
          </button>
          <Tooltip id="home-tooltip" place="bottom"content="Home" />
        </div>

        <div className="tool">
          <button className="icons-btn" 
          onClick={()=>navigate("/main/fileupload")} 
          data-tooltip-id="file-tooltip">
          <GoUpload className="nav-icons"/>
          </button>
          <Tooltip id="file-tooltip" content="File uploader" />
        </div>

        <div className="tool">
          <button className={responseData.length === 0 ? 'icons-btn1-disabled' : 'icons-btn1-enabled'} 
          onClick={() => {
              navigate("/main/predictedData")
          }}
          disabled={responseData.length === 0}
          data-tooltip-id="predict-tooltip"
          >
            <TbChartInfographic className="nav-icons" style={{width:"26px"}} />
          </button>
          <Tooltip id="predict-tooltip" content="Predict" />
        </div>

        <div className="tool">
          <button className={responseData.length === 0 ? 'icons-btn1-disabled' : 'icons-btn1-enabled'}
          onClick={() => {
            navigate("/main/Graph")
          }}
          disabled={responseData.length === 0}
          data-tooltip-id="chart-tool"
          >
            <FaChartPie className="nav-icons"/>
          </button>
          <Tooltip id="chart-tool" content="Chart view" />
        </div>
        <div className="tool mar-left">
          <img
            className="logout_image"
            src={logout}
            alt="Logout"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
            data-tooltip-id="logout-tooltip"
          />
          <Tooltip id="logout-tooltip" content="Logout" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;