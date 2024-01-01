import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import unauthorized from "../../utility/unauthorized.js";
import {
  setExpireMessage,
  setNewUser,
  setOTPEmail,
  setToken,
} from "../../helper/SessionHelper.js";
import { errorToast, successToast } from "../../helper/ToasterHelper.js";
import { Toaster } from "react-hot-toast";
import ProfileStore from "../../store/Employee/ProfileStore.js";
import WorkStore from "../../store/Work/WorkStore.js";
import UserStore from "../../store/Employee/UserStore.js";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  const {
    WorkStatusCountIndividualRequest,
  } = WorkStore((state) => ({
    WorkStatusCountIndividualRequest: state.WorkStatusCountIndividualRequest
  }));
  const {
    ProfileDetailsRequest,
  } = ProfileStore((state) => ({
    ProfileDetailsRequest: state.ProfileDetailsRequest,
  }));

  const { RecoverVerifyEmailRequest } = UserStore((state) => ({
    RecoverVerifyEmailRequest: state.RecoverVerifyEmailRequest
  }));

  const formattedTime = currentTime.toLocaleTimeString(undefined, {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  // For Clock
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every 1000 milliseconds (1 second)

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await WorkStatusCountIndividualRequest();
        await ProfileDetailsRequest();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [WorkStatusCountIndividualRequest, ProfileDetailsRequest]);

  const { WorkStatusCountIndividual } = WorkStore.getState();
  const { ProfileDetails } = ProfileStore.getState();
  const HandleVerifyButton = async () => {
    setLoading(true);
    await RecoverVerifyEmailRequest(ProfileDetails[0].email);
    const { RecoverVerifyEmail } = UserStore.getState();
    try {
      if (RecoverVerifyEmail && RecoverVerifyEmail.length > 0) {
        successToast("Verification code sent to your email");
        setNewUser(true);
        setOTPEmail(ProfileDetails[0].email);
        setToken("");
        window.location.href = "/verifyOTP";
      } else {
        errorToast("Failed to send verification code");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="bottom-center" />
      {ProfileDetails[0]?.verified === false ? (
        <Container
          id="top"
          className="container-fluid d-flex flex-row gap-2 align-items-center bg-danger text-white"
        >
          <h4 className="mt-3">Please verify your email address!</h4>
          <Button
            disabled={loading}
            className="rounded-1"
            variant="outline-light"
            onClick={HandleVerifyButton}
          >
            {" "}
            {loading ? "Loading..." : "Verify"}
          </Button>
        </Container>
      ) : (
        <>
          <Container>
            <h2 className="mt-3 d-flex align-items-baseline gap-2 justify-content-between">
              <div>
                Hi!{" "}
                <span className="h4">
                  {`(${ProfileDetails[0]?.firstName || ""} ${ProfileDetails[0]?.lastName || ""
                    }) `}
                  <span className="blog-title-emoji">👋</span>
                </span>
              </div>
              <p className="h1">{formattedTime}</p>
            </h2>
            {WorkStatusCountIndividual?.statuses && (
              <Row xs={12}>
                {WorkStatusCountIndividual.statuses.map((statusCount) => (
                  <Col key={statusCount.status} md={4} className="mb-3">
                    <Card className="border-0 shadow">
                      <Card.Body
                        className="cursorPointer"
                        onClick={() =>
                          navigate(
                            `/${statusCount.status
                              .replace(/\s+/g, "")
                              .toLowerCase()}`
                          )
                        }
                      >
                        <Card.Title>{statusCount.status}</Card.Title>
                        <Card.Text className="fw-bold text-muted">
                          {statusCount.count}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Container>
        </>
      )}
    </div>
  );
};

export default Dashboard;
