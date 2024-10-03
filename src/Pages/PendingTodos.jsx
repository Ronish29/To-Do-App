import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Divider,
} from "@mui/material";

const PendingTodos = () => {
  const [pendingTodos, setPendingTodos] = useState({});

  useEffect(() => {
    // getting 'todos' from localStorage
    const todos = JSON.parse(localStorage.getItem("todos")) || {};

    // filter  pending tasks  and grouping them by date
    const groupedPendingTodos = Object.keys(todos).reduce((result, date) => {
      const pendingTasks = todos[date].filter((todo) => !todo.completed); // filter pending tasks
      
      if (pendingTasks.length > 0) {
        result[date] = pendingTasks; // group tasks by date if there are any pending tasks for that day
      }

      return result;
    }, {});
    
    console.log(groupedPendingTodos);
    setPendingTodos(groupedPendingTodos);
  }, []); 
  
  return (
    <Paper sx={{ padding: 3 }}>
      {/* Title for the list of pending tasks */}
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
        Pending Tasks by Date
      </Typography>

      {/* conditional rendering based on whether there are any pending tasks */}
      {Object.keys(pendingTodos).length === 0 ? (
        // Message displayed if no pending tasks are found
        <Typography color="textSecondary">
          No pending tasks available.
        </Typography>
      ) : (
        // Rendering the list of pending tasks grouped by date
        Object.keys(pendingTodos)
        .sort((a, b) => new Date(b) - new Date(a)) // Sorting dates in descending order
        .map((date) => (
          <div key={date}>
            {/* Displaying the date as a section header */}
            <Typography variant="h6" sx={{ mt: 2 }}>
              {date}
            </Typography>

            {/* Divider to visually separate each group of tasks */}
            <Divider sx={{ mb: 1 }} />

            {/* List of pending tasks for the specific date */}
            <List>
              {pendingTodos[date].map((todo, index) => (
                <ListItem
                  key={index}
                  sx={{ mb: 1, backgroundColor: "#f5f5f5", borderRadius: 2 }}
                >
                  {/* Displaying each pending task's text */}
                  <ListItemText primary={todo.text} sx={{ color: "#888" }} />
                </ListItem>
              ))}
            </List>
          </div>
        ))
      )}
    </Paper>
  );
};

export default PendingTodos;
