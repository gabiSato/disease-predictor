import React from "react";

const { ipcRenderer } = window.require("electron");

export const ProcessedDataContext = React.createContext({});

export class ProcessedDataProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
    };
  }

  processFile = (filePath) => {
    this.setState({ loading: true, data: [] });

    ipcRenderer.send("process-data", filePath);

    ipcRenderer.on("process-data", (_, arg) => {
      let state = { data: [], loading: false };

      if (arg?.data) state = { ...state, data: arg.data };

      this.setState(state);
    });
  };

  render() {
    const value = {
      state: { ...this.state },
      action: {
        processFile: this.processFile,
      },
    };

    return (
      <ProcessedDataContext.Provider value={value}>
        {this.props.children}
      </ProcessedDataContext.Provider>
    );
  }
}
