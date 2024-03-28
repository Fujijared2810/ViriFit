import { Avatar, Divider, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Comment = ({ reply, lastReply }) => {
  const navigate = useNavigate();

  const { colorMode } = useColorMode();
  const dividerColor = colorMode === "dark" ? "gray.700" : "gray.700";

  const navigateToUserProfile = (username) => {
    navigate(`/${username}`); // Replace with your user profile route
  };
  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar
          src={reply.userProfilePic}
          size={"sm"}
          onClick={() => navigateToUserProfile(reply.username)}
          cursor={"pointer"}
        />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {reply.username}
            </Text>
          </Flex>
          <Text>{reply.text}</Text>
        </Flex>
      </Flex>
      {!lastReply ? <Divider borderColor={dividerColor} /> : null}
    </>
  );
};

export default Comment;
