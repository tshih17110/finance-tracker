import React, { useEffect, useState } from 'react';
import { PlaidLink } from 'react-plaid-link';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import axios from 'axios';

function Link() {
  const[linkToken, setLinkToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/create_link_token");
        setLinkToken(response.data["link_token"]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleOnSuccess = async (public_token, metadata) => {
    try {
      const data = {
        public_token: public_token,
      };
      const response = await axios.post("/api/exchange_public_token", data);
      sessionStorage.setItem("accessToken", response.data["access_token"]);
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {linkToken ? (
        <RouterLink to="/link">
          <PlaidLink
            token={linkToken}
            env="sandbox"
            onSuccess={handleOnSuccess}
          >
            Connect Plaid Link
          </PlaidLink>
        </RouterLink>
      ) : null}
    </div>
  );
}

export default Link;

