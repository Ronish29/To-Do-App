import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Divider,
} from "@mui/material";

const CompletedTodos = () => {
  const [completedTodos, setCompletedTodos] = useState({});

  useEffect(() => {
    // getting 'todos' from localStorage 
    const todos = JSON.parse(localStorage.getItem("todos")) || {};

    // filter completed tasks and grouping them by date
    const groupedCompletedTodos = Object.keys(todos).reduce((result, date) => {
      const completedTasks = todos[date].filter((todo) => todo.completed); // filter completed tasks
      
      if (completedTasks.length > 0) {
        result[date] = completedTasks; // group tasks by date if there are any completed tasks for that day
      }
      
      return result;
    }, {});

    setCompletedTodos(groupedCompletedTodos);
  }, []); 

  return (
    <Paper sx={{ padding: 3 }}>
      {/* Title for the list of completed tasks */}
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
        Completed Tasks by Date
      </Typography>

      {/* conditional rendering based on whether there are any completed tasks */}
      {Object.keys(completedTodos).length === 0 ? (
        // Message displayed if no completed tasks are found
        <Typography color="textSecondary">
          No completed tasks available.
        </Typography>
      ) : (
        // Rendering the list of completed tasks grouped by date in descending order
        Object.keys(completedTodos)
          .sort((a, b) => new Date(b) - new Date(a))  // Sorting dates in descending order
          .map((date) => (
            <div key={date}>
              {/* Displaying the date as a section header */}
              <Typography variant="h6" sx={{ mt: 2 }}>
                {date}
              </Typography>

              {/* Divider to visually separate each group of tasks */}
              <Divider sx={{ mb: 1 }} />

              {/* List of completed tasks for the specific date */}
              <List>
                {completedTodos[date].map((todo, index) => (
                  <ListItem
                    key={index}
                    sx={{ mb: 1, backgroundColor: "#f5f5f5", borderRadius: 2 }}
                  >
                    {/* Displaying each completed task's text */}
                    <ListItemText primary={todo.text} sx={{ color: "#888", textDecoration: "line-through" }} />
                  </ListItem>
                ))}
              </List>
            </div>
          ))
      )}
    </Paper>
  );
};

export default CompletedTodos;
