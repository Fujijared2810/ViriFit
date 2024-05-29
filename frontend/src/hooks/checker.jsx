import { useEffect } from "react";
import { Link, useToast } from "@chakra-ui/react";

const Checker = () => {
  const toast = useToast();

  useEffect(() => {
    const checkFirstVisit = () => {
      const visited = localStorage.getItem("visited");
      if (!visited) {
        // Perform actions for first-time visitors
        toast({
          title: "Welcome!",
          description: "It's your first time visiting this website.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
        // Set the 'visited' item in local storage to indicate the user has visited before
        localStorage.setItem("visited", "true");
      } else {
        // Perform actions for returning visitors
        toast({
          title: "Reminder!",
          description: (
            <>
              Kindly answer the questionnaire given in the MS Teams. Thank you.
              Click{" "}
              <Link
                color="blue.500"
                onClick={() => handleLinkClick()}
                textDecoration="underline"
              >
                here
              </Link>{" "}
              to answer the questionnaire.
            </>
          ),
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    checkFirstVisit();
  }, [toast]);

  const handleLinkClick = () => {
    // Open the link in a new window or tab
    window.open(
      "https://forms.office.com/pages/responsepage.aspx?id=aF0ZCJABuEeDRLFy8jzpxagTy5hStyFAsj-XavtknetUNllTQlpJQk9CUlI0SUNWQlhUV1U1TTU3SS4u",
      "_blank"
    );
  };

  return null;
};

export default Checker;
