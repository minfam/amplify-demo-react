import React, { useEffect } from "react";
import "./App.css";

import Amplify, { Analytics, API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
Amplify.configure(awsconfig);

const listTodos = `query listTodos {
  listTodos{
    items{
      id
      name
      description
    }
  }
}`;

const addTodo = `mutation createTodo($name:String! $description: String!) {
  createTodo(input:{
    name:$name
    description:$description
  }){
    id
    name
    description
  }
}`;

function App() {
  useEffect(() => {
    Analytics.record({
      name: "HomePage",
      attributes: {
        username: "minpham"
      }
    });
  }, []);

  const todoMutation = async () => {
    const todoDetails = {
      name: "Party tonight!",
      description: "Amplify CLI rocks!"
    };

    const newTodo = await API.graphql(graphqlOperation(addTodo, todoDetails));
    alert(JSON.stringify(newTodo));
  };

  const listQuery = async () => {
    console.log("listing todos");
    const allTodos = await API.graphql(graphqlOperation(listTodos));
    alert(JSON.stringify(allTodos));
  };
  return (
    <div className="App">
      <p> Pick a file</p>
      {/* <input type="file" onChange={this.uploadFile} /> */}
      <button onClick={listQuery}>GraphQL Query</button>
      <button onClick={todoMutation}>GraphQL Mutation</button>
    </div>
  );
}

const signUpConfig = {
  header: "My Customized Sign Up",
  hideAllDefaults: true,
  defaultCountryCode: "1",
  signUpFields: [
    {
      label: "My user name",
      key: "username",
      required: true,
      displayOrder: 1,
      type: "string"
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 2,
      type: "password"
    },
    {
      label: "PhoneNumber",
      key: "phone_number",
      required: true,
      displayOrder: 3,
      type: "string"
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 4,
      type: "string"
    }
  ]
};

const usernameAttributes = "My user name";

export default withAuthenticator(App, {
  signUpConfig,
  usernameAttributes
});
