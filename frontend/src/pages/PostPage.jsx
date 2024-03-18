import { Avatar, Box, Button, Divider, Flex, Image, Text } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import Actions from '../components/Actions';
import { useState } from 'react';
import Comment from '../components/Comment';

const PostPage = () => {
  const [liked, setLiked] = useState(false);
  return (<>
    <Flex>
      <Flex w={"full"} alignItems={"center"} gap={3}>
        <Avatar src='/zuck-avatar1.png' size={"md"} name='Jared Mesa'/>
        <Flex>
          <Text fontSize={"sm"} fontWeight={"bold"}>JaredMesa</Text>
          <Image src='/verified.png' w={4} h={4} ml={4}/>
        </Flex>
      </Flex>
      <Flex gap={4} alignItems={"center"}>
        <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
        <BsThreeDots/>
      </Flex>
    </Flex>

    <Text my={3}>Hey guys! I live here</Text>

    <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
      <Image src={"/post1.jpeg"} w={"full"}/>
    </Box>

    <Flex gap={3} my={3}>
      <Actions liked={liked} setLiked={setLiked}/>
    </Flex>

    <Flex gap={2} alignItems={"center"}>
      <Text color={"gray.light"} fontSize={"sm"}>10 replies</Text>
      <Box w={0.5}h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
      <Text color={"gray.light"} fontSize={"sm"}>
        {10 + (liked ? 1 : 0)} likes
      </Text>
    </Flex>

    <Divider my={4}/>

    <Flex justifyContent={"space-between"}>
      <Flex gap={2} alignItems={"center"}>
        <Text fontSize={"2xl"}>👋</Text>
        <Text color={"gray.light"}>Create your account to like, reply and post.</Text>
      </Flex>
      <Button>Create</Button>
    </Flex>

    <Divider my={4}/>

    <Comment
      comment="Looks really good!"
      createdAt="2d"
      likes={12}
      username="Johndoe"
      userAvatar="https://bit.ly/dan-abramov"
    />
    <Comment
      comment="very nice."
      createdAt="2d"
      likes={3}
      username="janedoe"
      userAvatar="https://bit.ly/ryan-florence"
    />
    <Comment
      comment="interesting"
      createdAt="2d"
      likes={9}
      username="sallydoe"
      userAvatar="https://bit.ly/code-beast"
    />
    </>
  );
}

export default PostPage