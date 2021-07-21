import React, { Component } from "react";

interface IErrorBoundaryProps {
  readonly children: JSX.Element | JSX.Element[];
}

interface IErrorBoundaryState {
  readonly error: any;
  readonly errorInfo: any;
}

export default class ErrorBoundary extends Component<IErrorBoundaryProps,IErrorBoundaryState> {
  readonly state: IErrorBoundaryState = {
    error: undefined,
    errorInfo: undefined,
  };

  componentDidCatch(error, errorInfo): void {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { error, errorInfo } = this.state;
    if (errorInfo) {
      const errorDetails =
        process.env.NODE_ENV === "development" ? (
          <details>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        ) : undefined;
      return (
        <React.Fragment>
          <h1 className="error">Hey, awful developer</h1>
          <h2 className="error">An unexpected error has occurred.</h2>
          {errorDetails}
        </React.Fragment>
      );
    }
    return this.props.children;
  }
}
