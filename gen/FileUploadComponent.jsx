import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import URLHelper from '../Helper/URLHelper';
import { Button, Col, Form, Row } from 'react-bootstrap';

const FileUploadComponent = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        console.log(URLHelper.urlgen(props.url + '/CSV/upload'));
        console.log(formData);
        const response = await axios.post(URLHelper.urlgen(props.url + '/CSV/upload'), formData);

        if (response.status === 200) {
          console.log(response)
          window.location.reload()
          // File uploaded successfully
          // Process the response or show a success message
        } else {
          // Handle error response
          // Show an error message or perform appropriate actions
        }
      } catch (error) {
        console.log(error);
        // Handle fetch error
        // Show an error message or perform appropriate actions
      }
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg="4" sm="12" md="6">
            <Form.Control type="file" size='sm' onChange={handleFileChange} />
          </Col>

          <Col lg="7" sm="12" md="6" className='m-1'>
            <Button variant="success" type="submit" size='sm'  >Upload</Button>
          </Col>
        </Row>

      </Form>
    </div>
  );
};

export default FileUploadComponent;
