import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Grid,
  GridItem,
  useColorModeValue,
  List,
  ListItem,
} from "@chakra-ui/react";
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";

const JournalPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [journalEntry, setJournalEntry] = useState("");
  const [savedEntries, setSavedEntries] = useState({});

  const handleDateChange = (day) => {
    setSelectedDate(day);
  };

  const handleJournalEntryChange = (event) => {
    setJournalEntry(event.target.value);
  };

  const handleSubmit = () => {
    // Save the journal entry for the selected date
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    const formattedTime = format(new Date(), "h:mm a");
    setSavedEntries((prevEntries) => ({
      ...prevEntries,
      [formattedDate]: {
        entry: journalEntry,
        time: formattedTime,
      },
    }));
    setJournalEntry("");
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startDate = startOfWeek(selectedDate);
  const endDate = endOfWeek(selectedDate);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const calendarBgColor = useColorModeValue("gray.100", "gray.800");
  const selectedDateBgColor = useColorModeValue("gray.200", "gray.700");
  const hoveredDateBgColor = useColorModeValue("gray.300", "gray.600");
  const dayTextColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Box p={8}>
      <Heading mb={6}>Workout Log</Heading>
      <Flex justify="space-between" align="center" mb={6}>
        <Button onClick={() => handleDateChange(addDays(selectedDate, -7))}>
          Previous Week
        </Button>
        <Text>{format(selectedDate, "MMM yyyy")}</Text>
        <Button onClick={() => handleDateChange(addDays(selectedDate, 7))}>
          Next Week
        </Button>
      </Flex>
      <Grid templateColumns="repeat(7, 1fr)" gap={4}>
        {weekDays.map((day) => (
          <GridItem key={day} textAlign="center">
            <Text fontWeight="bold" color={dayTextColor}>
              {day}
            </Text>
          </GridItem>
        ))}
        {days.map((day) => (
          <GridItem
            key={format(day, "yyyy-MM-dd")}
            bg={
              format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                ? selectedDateBgColor
                : format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
                ? hoveredDateBgColor
                : calendarBgColor
            }
            _hover={{
              bg: hoveredDateBgColor,
            }}
            borderRadius={4}
            p={2}
            cursor="pointer"
            onClick={() => handleDateChange(day)}
            color={dayTextColor}
          >
            <Text>{format(day, "d")}</Text>
          </GridItem>
        ))}
      </Grid>
      <Box mt={6}>
        <Input
          placeholder="Enter your workout log entry"
          value={journalEntry}
          onChange={handleJournalEntryChange}
          mb={4}
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.700", "gray.300")}
        />
        <Button
          colorScheme={useColorModeValue("blue", "teal")}
          onClick={handleSubmit}
        >
          Save
        </Button>
        {savedEntries[format(selectedDate, "yyyy-MM-dd")] && (
          <Box mt={6}>
            <Heading size="md" mb={2}>
              Saved Entries
            </Heading>
            <List spacing={2}>
              <ListItem>
                <Text fontWeight="bold">
                  {savedEntries[format(selectedDate, "yyyy-MM-dd")].time}
                </Text>
                <Text>
                  {savedEntries[format(selectedDate, "yyyy-MM-dd")].entry}
                </Text>
              </ListItem>
            </List>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default JournalPage;
