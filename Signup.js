import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import InputControl from "./InputControl";
import { auth } from "./firebase";
import { Segment, Container, Form, Grid, Header, Message, Button } from "semantic-ui-react";

function Signup() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        pass: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission = () => {
        if (!values.name || !values.email || !values.pass) {
            setErrorMsg("Please fill in all fields");
            return;
        }
        setErrorMsg("");

        setSubmitButtonDisabled(true);
        createUserWithEmailAndPassword(auth, values.email, values.pass)
            .then(async (res) => {
                setSubmitButtonDisabled(false);
                const user = res.user;
                await updateProfile(user, {
                    displayName: values.name,
                });
                navigate("/");
            })
            .catch((err) => {
                setSubmitButtonDisabled(false);
                setErrorMsg(err.message);
            });
    };

    return (
        <Container>
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="teal" textAlign="center">
                        Signup
                    </Header>
                    <Form size="large">
                        <Segment stacked>
                            <Form.Field>
                                <InputControl
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Full Name"
                                    onChange={(event) =>
                                        setValues((prev) => ({ ...prev, name: event.target.value }))
                                    }
                                />
                            </Form.Field>
                            <Form.Field>
                                <InputControl
                                    icon="mail"
                                    iconPosition="left"
                                    placeholder="E-mail address"
                                    onChange={(event) =>
                                        setValues((prev) => ({ ...prev, email: event.target.value }))
                                    }
                                />
                            </Form.Field>
                            <Form.Field>
                                <InputControl
                                    icon="lock"
                                    iconPosition="left"
                                    type="password"
                                    placeholder="Password"
                                    onChange={(event) =>
                                        setValues((prev) => ({ ...prev, pass: event.target.value }))
                                    }
                                />
                            </Form.Field>
                            {errorMsg && (
                                <Message negative>
                                    <p>{errorMsg}</p>
                                </Message>
                            )}
                            <Button
                                color="teal"
                                fluid
                                size="large"
                                onClick={handleSubmission}
                                disabled={submitButtonDisabled}
                            >
                                Signup
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already have an account? <Link to="/login">Login</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        </Container>
    );
}

export default Signup;
