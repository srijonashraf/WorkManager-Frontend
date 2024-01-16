import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProfileStore from "../../store/Employee/ProfileStore.js";
import WorkStore from "../../store/Work/WorkStore.js";
import UserStore from "../../store/Employee/UserStore.js";
import {
  setNewUser,
  setOTPEmail,
  setToken,
} from "../../helper/SessionHelper.js";
import { errorToast, successToast } from "../../helper/ToasterHelper.js";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  const {
    WorkStatusCountIndividual,
  } = WorkStore();
  const {
    ProfileDetails,
  } = ProfileStore();

  const {
    RecoverVerifyEmailRequest
  } = UserStore();

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

  const HandleVerifyButton = async () => {
    setLoading(true);

    try {
      let response = await RecoverVerifyEmailRequest(ProfileDetails?.email);

      if (response.status === 200) {
        successToast("Verification code sent to your email");
        setNewUser(true);
        setOTPEmail(ProfileDetails?.email);
        setToken("");
        window.location.href = "/verifyOTP";
      } else {
        errorToast("Failed to send verification code");
      }
    } catch (error) {
      console.error("Error while verifying email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="bottom-center" />
      {ProfileDetails && ProfileDetails.length > 0 && !ProfileDetails.verified ? (
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
                  {`(${ProfileDetails.firstName || ""} ${ProfileDetails.lastName || ""}) `}
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
