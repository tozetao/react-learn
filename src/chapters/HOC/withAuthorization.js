import React, { Component } from "react"

export default function withAuthorization(AppComp) {
  return class AuthorizationWrapper extends Component {
    render() {
      if (this.props.isLoggedIn) {
        return <AppComp />
      }
      return null
    }
  }
}
