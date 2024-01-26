import Register from "../components/Register";
import Login from "../components/Login";
import { useState } from "react";
import { Container, Button, Grid, Box } from "@mui/material";

const Home = () => {
  const [toggleLoginAndRegister, setToggleLoginAndRegister] = useState(false);
  return (
    <Container
      component="main"
      maxWidth="xs"
      xs={{ border: "1px solid black" }}
    >
      <Box justifyContent="center">
        {toggleLoginAndRegister ? <Register /> : <Login />}
        <Grid mt={4}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              setToggleLoginAndRegister(!toggleLoginAndRegister);
            }}
          >
            {toggleLoginAndRegister ? "Login" : "Register"}
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
