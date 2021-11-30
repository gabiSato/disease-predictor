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
      if (arg?.data) {
        this.setState({
          data: arg.data,
          loading: false,
        });
      }
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
