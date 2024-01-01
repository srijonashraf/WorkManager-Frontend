import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { successToast, errorToast } from "../../helper/ToasterHelper";
import userStore from "../../store/Employee/UserStore";
import ProfileStore from "../../store/Employee/ProfileStore.js";
import VerificationInput from "react-verification-input";
import {
    getOTPRequested,
    getOTPEmail,
    setOTP as setOTPFunction,
    getNewUser,
    clearSessions,
} from "../../helper/SessionHelper";

const VerifyOTP = () => {
    const otpRequested = getOTPRequested();
    const otpEmail = getOTPEmail();
    if (!otpRequested && !getNewUser()) {
        window.location.href = "/";
    }
    const [OTP, setOTP] = useState("");
    const [loading, setLoading] = useState(false);

    const { RecoverVerifyOTPRequest } = userStore((state) => ({
        RecoverVerifyOTPRequest: state.RecoverVerifyOTPRequest
    }));
    const { ProfileVerificationRequest } = ProfileStore((state) => ({
        ProfileVerificationRequest: state.ProfileVerificationRequest
    }));

    const HandleVerifyOTP = async (e) => {
        e.preventDefault();

        try {
            if (OTP.length !== 6) {
                errorToast("Please enter a valid 6-digit OTP");
                return;
            } else {
                setLoading(true);
                await RecoverVerifyOTPRequest(OTP, otpEmail);
                const { RecoverVerifyOTP } = userStore.getState();
                if (RecoverVerifyOTP && RecoverVerifyOTP.length > 0) {
                    //OTP is verified then we will set the redirect location based on condition
                    if (getNewUser()) {
                        //This method will update email verified: true to database only for the new users.
                        await ProfileVerificationRequest(otpEmail);
                        const { ProfileVerification } = ProfileStore.getState();
                        if (ProfileVerification && ProfileVerification.length > 0) {
                            alert("Verification complete! Please login again...");
                            clearSessions();
                            window.location.href = "/";
                        } else {
                            errorToast("An unexpected error occurred");
                        }
                    } else if (otpRequested) {
                        successToast("Verification Complete");
                        setOTPFunction(OTP);
                        setTimeout(() => {
                            window.location.href = "/createPassword";
                        }, 2000);
                    }
                } else {
                    errorToast("OTP not matched");
                }
            }

        } catch (error) {
            errorToast("An unexpected error occurred");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Toaster position="bottom-center" />
            <Container>
                <Row className="justify-content-center center-screen">
                    <Col xs={12} md={6} lg={5}>
                        <Card className="border-0 rounded-4 mx-auto shadow p-3">
                            <Card.Body>
                                <h4 className="mb-3">OTP Verification</h4>
                                <Form
                                    onSubmit={HandleVerifyOTP}
                                    className="animated fadeInUp d-flex flex-column gap-3 align-items-center"
                                >
                                    <VerificationInput
                                        onChange={(value) => setOTP(value)}
                                        // inputStyle={defaultInputStyle}
                                        fields={6}
                                        classNames="text-center"
                                    />
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-100"
                                        disabled={loading || OTP.length !== 6}
                                    >
                                        {loading ? "Loading..." : "Next"}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default VerifyOTP;
