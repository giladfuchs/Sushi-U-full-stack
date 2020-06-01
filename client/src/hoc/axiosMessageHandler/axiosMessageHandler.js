import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";
import Spinner from "../../components/UI/Spinner/Spinner";

const axiosMessageHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      message: null,
    };
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        req.method !== "get" && this.setState({ message: <Spinner /> });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => {
          this.state.message &&
            this.setState({ message: "your ruequst success" });
          return res;
        },

        (error) => {
          // let msg = error.message;
          // try {
          //   msg = error.response.data.message;
          // } catch (err) {}
          // console.log("asdfdf");
          console.log(error);

          this.setState({
            message: error.response.data.message || error.message,
          });
          throw error;
        }
      );
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    errorConfirmedHandler = () => {
      this.setState({ message: null });
    };
    render() {
      return (
        <Aux>
          <Modal
            show={this.state.message}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.message ? this.state.message : null}
          </Modal>

          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default axiosMessageHandler;
