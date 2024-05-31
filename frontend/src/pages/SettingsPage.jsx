import { Button, Stack, Text, useColorMode } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";

const SettingsPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const showToast = useShowToast();
  const logout = useLogout();
  const freezeAccount = async () => {
    if (!window.confirm("Are you sure you want to freeze your account?"))
      return;

    try {
      const res = await fetch("/api/users/freeze", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      if (data.success) {
        logout();
        showToast("Success", "Your account has been frozen.", "success");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return (
    <>
      <Text my={1} fontWeight={"bold"}>
        Freeze Your Account
      </Text>
      <Text my={1}>You can unfreeze your account anytime by logging in.</Text>
      <Button size={"sm"} colorScheme="red" onClick={freezeAccount}>
        Freeze
      </Button>

      <Text my={1} mt={10} fontWeight={"bold"}>
        Dark/Light Mode
      </Text>
      <Stack direction="row" spacing={4}>
        <Button
          size={"sm"}
          colorScheme="blue"
          onClick={() => toggleColorMode("light")}
          isDisabled={colorMode === "light"}
        >
          Light Mode
        </Button>
        <Button
          size={"sm"}
          colorScheme="gray"
          onClick={() => toggleColorMode("dark")}
          isDisabled={colorMode === "dark"}
        >
          Dark Mode
        </Button>
      </Stack>
    </>
  );
};

export default SettingsPage;
