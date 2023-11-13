import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();
  const navigate = useNavigate();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    console.log("uploadFile to", url);

    try {
      const authToken = localStorage.getItem("basic_token");

      console.log("File to upload: ", file!.name);
      const response = await axios({
        method: "GET",
        url,
        params: {
          name: encodeURIComponent(file!.name),
        },
        headers: {
          authorization: `Basic ${authToken}`,
        },
      });
      console.log("Uploading to: ", response.data);
      const result = await fetch(response.data.signedUrl, {
        method: "PUT",
        body: file,
      });
      removeFile();
      console.log("Result: ", result);
    } catch (error: any) {
      console.log("error", error);
      navigate("/error", { state: { error: { message: error.data.message } } });
    }
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
