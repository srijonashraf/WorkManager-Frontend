import React, { useState } from "react";
import { Container, FormControl, InputGroup, Button } from "react-bootstrap";
import { Row, Col, Card, Form } from "react-bootstrap";
import { getOTPEmail, getOTP, clearSessions } from "../../helper/SessionHelper";
import { Toaster } from "react-hot-toast";
import { successToast, errorToast } from "../../helper/ToasterHelper";
import userStore from "../../store/Employee/UserStore.js";

const CreatePassword = () => {
    const [initialPass, setInitialPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [loading, setLoading] = useState(false);
    const email = getOTPEmail();
    const otp = getOTP();
    const { RecoverPasswordRequest } = userStore((state => ({
        RecoverPasswordRequest: state.RecoverPasswordRequest
    })));

    if (!otp) {
        window.location.href = "/login";
    }

    const HandlePasswordChange = (e) => {
        setInitialPass(e.target.value);
    };

    const HandleConfirmPasswordChange = (e) => {
        setConfirmPass(e.target.value);
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();

        if (initialPass !== confirmPass) {
            console.error("Passwords do not match");
            errorToast("Password do not match");
            return confirmPass;
        }

        try {
            setLoading(true);
            await RecoverPasswordRequest(email, otp, confirmPass);
            const { RecoverPassword } = userStore.getState();
            if (RecoverPassword && RecoverPassword.length > 0) {
                successToast("Password Changed");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            } else {
                errorToast("Failed to change password. Please try again.");
            }
        } catch (error) {

            errorToast("Failed to change password. Please try again.");
        } finally {
            setLoading(false);
            clearSessions();
        }
    };

    return (
        <div>
            <Container>
                <Toaster position="bottom-center" />
                <Row className="justify-content-center center-screen">
                    <Col xs={12} md={6} lg={5}>
                        <Card className="border-0 rounded-4 mx-auto shadow p-3">
                            <Card.Body>
                                <h4>Create New Password</h4>
                                <Form onSubmit={HandleSubmit}>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            type="password"
                                            placeholder="Enter New Password"
                                            onChange={HandlePasswordChange}
                                            value={initialPass}
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            type="password"
                                            placeholder="Confirm Password"
                                            onChange={HandleConfirmPasswordChange}
                                            value={confirmPass}
                                        />
                                    </InputGroup>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? "Loading..." : "Submit"}
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

export default CreatePassword;
