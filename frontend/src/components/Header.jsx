import { Button, Flex, Image, Link, useColorMode } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";

const Header = () => {
   const {colorMode, toggleColorMode} = useColorMode();
  return <Flex justifyContent={"center"} mt={6} mb={12}>
    <Image 
        cursor={"pointer"}
        alt="logo"
        w={9}
        src={colorMode === "dark" ? "/logo.svg" : "/logo.svg"}
        onClick={toggleColorMode}
    />
  </Flex>
}

export default Header