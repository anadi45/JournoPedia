import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React from "react";
// import { useHistory } from "react-router-dom";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

function HomePage() {
  // const history = useHistory();

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("userInfo"));

  //   if (user) {
  //     history.push("/chats");
  //   }
  // }, [history]);

  return (
    <div>Login</div>
    // <Container maxW="xl" centerContent>
    //   <Box
    //     d="flex"
    //     justifyContent="center"
    //     p={3}
    //     bg={"white"}
    //     w="100%"
    //     m="40px 0 15px 0"
    //     borderRadius={"lg"}
    //     borderWidth="1px"
    //   >
    //     <Text
    //       fontSize={"4xl"}
    //       fontFamily="Work sans"
    //       color={"black"}
    //       width="fit-content"
    //       margin={"auto"}
    //     >
    //       Talk-A-Tive
    //     </Text>
    //   </Box>
    //   <Box bg="white" w="100%" p={4} borderRadius={"lg"} borderWidth="1px">
    //     <Tabs variant="soft-rounded">
    //       <TabList mb={"1em"}>
    //         <Tab w={"50%"}>Login</Tab>
    //         <Tab w={"50%"}>Sign Up</Tab>
    //       </TabList>
    //       <TabPanels>
    //         <TabPanel>
    //           <Login />
    //         </TabPanel>
    //         <TabPanel>
    //           <SignUp />
    //         </TabPanel>
    //       </TabPanels>
    //     </Tabs>
    //   </Box>
    // </Container>
  );
}

export default HomePage;