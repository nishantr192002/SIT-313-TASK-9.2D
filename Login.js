import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import InputControl from "./InputControl";
import { auth } from "./firebase";
import { Segment, Container, Form, Grid, Header, Message, Button } from "semantic-ui-react"; // Import Semantic UI components

function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        pass: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission = () => {
        if (!values.email || !values.pass) {
            setErrorMsg("Please make sure all fields are filled in correctly");
            return;
        }
        setErrorMsg("");

        setSubmitButtonDisabled(true);
        signInWithEmailAndPassword(auth, values.email, values.pass)
            .then(async (res) => {
                setSubmitButtonDisabled(false);

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
                        Login
                    </Header>
                    <Form size="large">
                        <Segment stacked>
                            <Form.Field>
                                <InputControl
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Email address"
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
                                Login
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Don't have an account?{" "}
                        <Link to="/signup">Sign up</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        </Container>
    );
}

export default Login;