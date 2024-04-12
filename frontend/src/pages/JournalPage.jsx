import { useState } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Text,
  useColorModeValue,
  Input,
  Button,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const JournalPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const textColor = useColorModeValue("black", "white"); // Get text color based on theme mode

  const handlePrevMonth = () => {
    const prevMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() - 1,
      1
    );
    setSelectedDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      1
    );
    setSelectedDate(nextMonth);
  };

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getWeekdayName = (date) => {
    const options = { weekday: "short" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const getDateString = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  const renderCalendar = () => {
    if (!selectedDate) return []; // Return empty array if selectedDate is null

    const firstDayOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const daysInCurrentMonth = daysInMonth(selectedDate);
    const today = new Date();

    let days = [];
    let dayCounter = 1;

    // Render empty grid cells for days before the start of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<GridItem key={`empty-${i}`} />);
    }

    // Render grid cells for each day of the month
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const currentDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        i
      );
      const dateString = getDateString(currentDate);
      const isToday = currentDate.toDateString() === today.toDateString();

      days.push(
        <GridItem key={dateString} textAlign="center" p={2}>
          <IconButton
            aria-label={`Select ${dateString}`}
            icon={
              <Text fontSize="sm" color={isToday ? textColor : "inherit"}>
                {i}
              </Text> // Use textColor variable
            }
            bg={isToday ? "blue.500" : "transparent"}
            borderRadius="full"
            onClick={() => handleDateClick(currentDate)}
          />
        </GridItem>
      );
      dayCounter++;
    }

    return days;
  };

  const handleDateClick = (date) => {
    // Implement logic to fetch workout logs for the selected date and display them
    console.log(`Fetching workout logs for ${date}`);
  };

  return (
    <Box p={4}>
      <Flex align="center" justify="space-between" mb={4}>
        <IconButton
          aria-label="Previous month"
          icon={<ChevronLeftIcon />}
          onClick={handlePrevMonth}
        />
        <Text fontSize="lg">
          {selectedDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </Text>
        <IconButton
          aria-label="Next month"
          icon={<ChevronRightIcon />}
          onClick={handleNextMonth}
        />
      </Flex>
      <Grid templateColumns="repeat(7, 1fr)" gap={2}>
        <GridItem textAlign="center" p={2}>
          Sun
        </GridItem>
        <GridItem textAlign="center" p={2}>
          Mon
        </GridItem>
        <GridItem textAlign="center" p={2}>
          Tue
        </GridItem>
        <GridItem textAlign="center" p={2}>
          Wed
        </GridItem>
        <GridItem textAlign="center" p={2}>
          Thu
        </GridItem>
        <GridItem textAlign="center" p={2}>
          Fri
        </GridItem>
        <GridItem textAlign="center" p={2}>
          Sat
        </GridItem>
        {renderCalendar()}
      </Grid>
      <Box mt={4}>
        <Text fontSize="xl">Add Workout Log</Text>
        <Input placeholder="Enter workout details" mt={2} />
        <Button colorScheme="blue" mt={2}>
          Add Log
        </Button>
      </Box>
    </Box>
  );
};

export default JournalPage;
