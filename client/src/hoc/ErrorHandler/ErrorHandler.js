import React, { Component } from "react";

import Auxillary from "../Auxillary/Auxillary";
import ResponseModal from "../../components/Modals/ResponseModal/ResponseModal";

const ErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
      showModal: false,
    };

    UNSAFE_componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          // return error;
          if (error.message === "Network Error") {
            const modalData = {
              title: "Error",
              button: "danger",
              img: "net_error",
            };
            this.setState({
              error: error,
              showModal: true,
              modalData: modalData,
            });
          } else if (error.message.split(" ")[5] === "403") {
            const modalData = {
              title: "Error",
              button: "danger",
              img: "forbidden",
            };
            this.setState({
              error: error,
              showModal: true,
              modalData: modalData,
            });
            return error;
          } else if (error.message.split(" ")[5] === "401") {
            const modalData = {
              title: "Error",
              button: "danger",
              img: "unauthorized",
            };
            this.setState({
              error: error,
              showModal: true,
              modalData: modalData,
            });
            return error;
          } else return error;
        }
      );
    }

    UNSAFE_componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ showModal: false });
    };

    render() {
      let modal = null;
      let message = "Something Went Wrong !!";
      if (this.state.error) {
        if (this.state.error.message) {
          message = this.state.error.message;
        }
        if (this.state.error.response) {
          message = this.state.error.response.data.message;
        }
        modal = (
          <ResponseModal
            show={this.state.showModal}
            onHide={this.errorConfirmedHandler}
            title={this.state.modalData.title}
            body={message}
            img={this.state.modalData.img}
            button={this.state.modalData.button}
          ></ResponseModal>
        );
      }
      return (
        <Auxillary>
          {modal}
          <WrappedComponent {...this.props} />
        </Auxillary>
      );
    }
  };
};

export default ErrorHandler;
