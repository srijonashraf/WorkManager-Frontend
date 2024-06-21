import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import {
  ProfileUpdate,
  GetProfileDetails,
} from "../../apiRequest/apiRequest.js";
import { successToast, errorToast } from "../../helper/ToasterHelper.js";
import { Toaster } from "react-hot-toast";
import { getBase64, validateFile } from "../../helper/FormHelper.js";
import Avatar from "react-avatar";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    img: "",
    firstName: "",
    lastName: "",
    mobile: "",
    currentPassword: "",
    newPassword: "",
    address: "",
  });

  const [profileDetailsResponse, setProfileDetailsResponse] = useState(null);
  let userImgRef = useRef();
  let userImgView = useRef();

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const response = await GetProfileDetails();

        if (
          response &&
          response.data &&
          response.data.status === "success" &&
          response.data.data.length > 0
        ) {
          setProfileDetailsResponse(response);
          const userDetails = response.data.data[0];
          setFormValues({
            email: userDetails.email,
            img: userDetails.img,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            mobile: userDetails.mobile,
            currentPassword: "",
            newPassword: "",
            address: userDetails.address,
          });
        } else {
          console.log("Frontend: Profile Details failed to fetch");
        }
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    fetchProfileDetails();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        // Validate the file before processing
        if (validateFile(file)) {
          getBase64(file).then((base64) => {
            setFormValues((prevValues) => ({
              ...prevValues,
              img: base64,
            }));
            PreviewImage();
          });
        } else {
          errorToast(
            "Please select a valid image file [jpg,jpeg,png *Max 4MB*]"
          );
          userImgRef.current.value = null;
        }
      } catch (error) {
        // Handle validation errors
        console.error(error.message);
        // Optionally, you can reset the input or show an error message to the user
      }
    }
  };

  const PreviewImage = () => {
    const ImgFile = userImgRef.current.files[0];
    if (ImgFile) {
      getBase64(ImgFile).then((base64Img) => {
        userImgView.src = base64Img;
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UpdateProfileRequest();
  };

  const UpdateProfileRequest = async () => {
    try {
      const passwordFromDB =
        (await profileDetailsResponse?.data.data[0]?.password) || "";

      if (
        !formValues.email ||
        !formValues.firstName ||
        !formValues.lastName ||
        !formValues.mobile ||
        !formValues.address
      ) {
        errorToast("Please fill the basic information Field.");
        return;
      }

      setLoading(true);

      if (!formValues.currentPassword) {
        formValues.currentPassword = passwordFromDB;
      }

      if (formValues.currentPassword === passwordFromDB) {
        const updatedProfile = {
          email: formValues.email,
          img: formValues.img,
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          mobile: formValues.mobile,
          password: formValues.newPassword || passwordFromDB,
          address: formValues.address,
          position: profileDetailsResponse?.data.data[0]?.position,
          department: profileDetailsResponse?.data.data[0]?.department,
        };

        const response = await ProfileUpdate(updatedProfile);

        if (response) {
          successToast("Profile Updated Successfully!");

          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } else {
          errorToast("Failed to update Profile Data!");
        }
      } else {
        errorToast("Current Password does not match. Please try again.");
      }
    } catch (err) {
      console.error(err);
      errorToast("Failed to update Profile Data!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container>
        <Toaster position="top-right" />
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={8} lg={8}>
            <Card className="border-0 rounded-4 mx-auto shadow">
              <Card.Body>
                {/* <BiUserCircle className="display-1 text-primary" /> */}
                <Avatar
                  ref={(input) => (userImgView = input)}
                  src={formValues.img}
                  size="80"
                  round={true}
                />
                {/* <img
                  ref={(input) => (userImgView = input)}
                  class="rounded-circle"
                  style={{ width: "150px" }}
                  src={formValues.img}
                  alt=""
                /> */}

                <hr />
                <Form
                  className="animated fadeInUp mt-2"
                  onSubmit={handleSubmit}
                >
                  <Row className="mb-3">
                    <Col>
                      <InputGroup>
                        <FormControl
                          type="email"
                          placeholder="Email Address"
                          value={formValues.email}
                          disabled
                        />
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          ref={userImgRef}
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <InputGroup>
                        <FormControl
                          type="text"
                          placeholder="First Name"
                          name="firstName"
                          value={formValues.firstName}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup>
                        <FormControl
                          type="text"
                          placeholder="Last Name"
                          name="lastName"
                          value={formValues.lastName}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <InputGroup>
                        <FormControl
                          type="password"
                          placeholder="Current Password"
                          name="currentPassword"
                          value={formValues.currentPassword}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup>
                        <FormControl
                          type="password"
                          placeholder="New Password"
                          name="newPassword"
                          value={formValues.newPassword}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <InputGroup>
                        <FormControl
                          type="tel"
                          placeholder="Mobile"
                          name="mobile"
                          value={formValues.mobile}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup>
                        <FormControl
                          type="text"
                          placeholder="Address"
                          name="address"
                          value={formValues.address}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    onClick={handleSubmit}
                    disabled={
                      loading ||
                      formValues.email === import.meta.env.VITE_DEMO_EMAIL
                    }
                  >
                    {loading ? "Loading..." : "Update Profile"}
                  </Button>
                  <Row className="text-center p-2 mt-2 bg-dark text-white rounded-1">
                    <p>
                      Its a demo account, you can not update your details here.
                    </p>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
