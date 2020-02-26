import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Authenticator } from "aws-amplify-react";
import styled from "@emotion/styled";

import awsExports from "./aws-exports";
import Screens from "./components/Screens";

const Title = styled("h1")`
  text-align: center;
  //text-transform: uppercase;
  color: #7A9461;
  margin-bottom: 8px;
`;

const theme = {
  formContainer: {
    margin: 0,
    padding: "8px 24px 24px"
  },
  formSection: {
    backgroundColor: "#ffffff",
    borderRadius: "4px"
  },
  sectionHeader: {
    color: "#77A8AB"
  },
  sectionHeaderContent: {
    color: "#77A8AB"
  },
  sectionFooterSecondaryContent: {
    color: "#77A8AB"
  },
  inputLabel: {
    color: "#77A8AB"
  },
  input: {
    backgroundColor: "#f4f9f4",
    color: "#77A8AB"
  },
  hint: {
    color: "#74b49b"
  },
  button: {
    borderRadius: "3px",
    backgroundColor: "#a7d7c5"
  },
  a: {
    color: "#a7d7c5"
  }
};

function App() {
  const [state, setState] = useState({ isLoggedIn: false, user: null });

  const checkLoggedIn = () => {
    Auth.currentAuthenticatedUser()
      .then(data => {
        const user = { username: data.username, ...data.attributes };
        setState({ isLoggedIn: true, user });
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return state.isLoggedIn ? (
    <Screens />
  ) : (
    <>
      <Title>Jerry's Notes</Title>
      <br></br>
      <img Style="float:left; margin-left:15%" src={"./jerry.gif"}></img>
      <Authenticator
        onStateChange={authState => {
          if (authState === "signedIn") {
            checkLoggedIn();
          }
        }}
        amplifyConfig={awsExports}
        theme={theme}
      />
    </>
  );
}

export default App;
