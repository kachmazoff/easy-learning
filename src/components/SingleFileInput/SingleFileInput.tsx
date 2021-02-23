import React from "react";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

interface SingleFileInputProps {
  value?: string | File;
  placeholder?: string;
  onChange?: (file: File | undefined) => void;
}

interface SingleFileInputState {
  file: string | null;
}

const getImageUrl = (filename: string) =>
  `http://localhost:8000/files/download?filename=${filename}`;

export class SingleFileInput extends React.Component<
  SingleFileInputProps,
  SingleFileInputState
> {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    this.setState({
      file: URL.createObjectURL(files[0]),
    });
    this.props.onChange(files[0]);
  };

  clear = () => {
    this.setState({ file: null });
    this.props.onChange(undefined);
  };

  render() {
    const { file } = this.state;
    const { value } = this.props;

    if (!file && !value) {
      return (
        <div>
          <label className={styles.fileLabel}>
            <UploadOutlined className={styles.inputIcon} />
            {this.props.placeholder || "Выберите файл"}
            <input type="file" onChange={this.handleChange} />
          </label>
        </div>
      );
    }

    const imageSrc =
      file ||
      (typeof value === "string"
        ? getImageUrl(value)
        : URL.createObjectURL(value));

    return (
      <div style={{ position: "relative" }}>
        <img src={imageSrc} style={{ width: "100%" }} />
        <button className={styles.removeButton} onClick={this.clear}>
          <CloseOutlined className={styles.icon} />
        </button>
      </div>
    );
  }
}

SingleFileInput.defaultProps = {
  placeholder: "Выберите файл",
  onChange: () => {},
};
