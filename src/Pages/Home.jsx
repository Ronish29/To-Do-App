import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Fade,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Checkbox,
  Card,
  Paper,
} from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import { useTheme } from "@mui/material";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || {};
    const todosForSelectedDate =
      storedTodos[selectedDate.format("YYYY-MM-DD")] || [];
    setTodos(todosForSelectedDate);
  }, [selectedDate]);

  const updateLocalStorage = (newTodos) => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || {};
    storedTodos[selectedDate.format("YYYY-MM-DD")] = newTodos;
    localStorage.setItem("todos", JSON.stringify(storedTodos));
  };

  const handleAddTodo = () => {
    if (todo.trim() === "") return;
    const newTodos = [...todos, { text: todo, completed: false }];
    setTodos(newTodos);
    setTodo("");
    updateLocalStorage(newTodos);
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);
    updateLocalStorage(newTodos);
  };

  const handleEditTodo = (index) => {
    setEditingTodo({ index, text: todos[index].text });
    setOpenDialog(true);
  };

  const handleUpdateTodo = () => {
    if (editingTodo.text.trim() === "") return;
    const newTodos = todos.map((todo, index) =>
      index === editingTodo.index ? { ...todo, text: editingTodo.text } : todo,
    );
    setTodos(newTodos);
    updateLocalStorage(newTodos);
    setOpenDialog(false);
  };

  const handleToggleTodo = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(newTodos);
    updateLocalStorage(newTodos);
  };

  const completedTodos = todos.filter((todo) => todo.completed);
  const inProgressTodos = todos.filter((todo) => !todo.completed);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper>
        <Box
          p={2}
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
                Add Tasks
              </Typography>
              <Box sx={{ display: "flex", mb: 3 }}>
                <TextField
                  label="Add New Task"
                  variant="outlined"
                  fullWidth
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                  sx={{ mr: 1 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddTodo}
                  startIcon={<AddIcon />}
                  sx={{
                    minWidth: "120px",
                  }}
                >
                  Add
                </Button> 
              </Box>

              {todos.length === 0 && (
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  No tasks added For Selected date 
                </Typography>
              )}


              {todos.length > 0 && (
                <>
                  {/* conditional render for complted Tasks */}
                  {completedTodos.length > 0 ? (
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                      Completed Tasks For Date
                    </Typography>
                  ) : (
                    completedTodos.length === 0 &&
                    inProgressTodos.length > 0 && (
                      <Typography
                        variant="h6"
                        sx={{ mb: 2, fontWeight: "bold" }}
                      >
                        No tasks completed
                      </Typography>
                    )
                  )}
                  {completedTodos.length > 0 && (
                    <List>
                      {completedTodos.map((item, index) => (
                        <Fade in={true} key={index}>
                          <ListItem
                            sx={{
                              mb: 2,
                              backgroundColor:
                                theme.palette.mode === "dark"
                                  ? theme.palette.grey[800]
                                  : theme.palette.grey[100],
                              borderRadius: 2,
                            }}
                          >
                            <Checkbox
                              checked={item.completed}
                              onChange={() =>
                                handleToggleTodo(
                                  todos.findIndex((todo) => todo === item),
                                )
                              }
                              sx={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? theme.palette.primary.light
                                    : theme.palette.primary.main,
                                "&.Mui-checked": {
                                  color:
                                    theme.palette.mode === "dark"
                                      ? theme.palette.primary.light
                                      : theme.palette.primary.main,
                                },
                              }}
                            />
                            <ListItemText
                              primary={item.text}
                              sx={{
                                textDecoration: "none",
                                cursor: "pointer",
                                color: theme.palette.text.primary,
                              }}
                            />
                            <Tooltip title="Delete">
                              <IconButton
                                onClick={() =>
                                  handleDeleteTodo(
                                    todos.findIndex((todo) => todo === item),
                                  )
                                }
                              >
                                <DeleteIcon
                                  sx={{ color: theme.palette.error.main }}
                                />
                              </IconButton>
                            </Tooltip>
                          </ListItem>
                        </Fade>
                      ))}
                    </List>
                  )}

                  {/* condtional render for progress task */}
                  {inProgressTodos.length > 0 ? (
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                      In Progress Tasks For Date
                    </Typography>
                  ) : completedTodos.length > 0 ? (
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                      All tasks completed
                    </Typography>
                  ) : null}
                  {inProgressTodos.length > 0 && (
                    <List>
                      {inProgressTodos.map((item, index) => (
                        <Fade in={true} key={index}>
                          <ListItem
                            sx={{
                              mb: 2,
                              backgroundColor:
                                theme.palette.mode === "dark"
                                  ? theme.palette.grey[800]
                                  : theme.palette.grey[100],
                              borderRadius: 2,
                            }}
                          >
                            <Checkbox
                              checked={item.completed}
                              onChange={() =>
                                handleToggleTodo(
                                  todos.findIndex((todo) => todo === item),
                                )
                              }
                              sx={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? theme.palette.primary.light
                                    : theme.palette.primary.main,
                                "&.Mui-checked": {
                                  color:
                                    theme.palette.mode === "dark"
                                      ? theme.palette.primary.light
                                      : theme.palette.primary.main,
                                },
                              }}
                            />
                            <ListItemText
                              primary={item.text}
                              sx={{
                                textDecoration: "none",
                                cursor: "pointer",
                                color: theme.palette.text.primary,
                              }}
                            />
                            <Tooltip title="Edit">
                              <IconButton
                                onClick={() =>
                                  handleEditTodo(
                                    todos.findIndex((todo) => todo === item),
                                  )
                                }
                              >
                                <EditIcon
                                  sx={{ color: theme.palette.primary.main }}
                                />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                onClick={() =>
                                  handleDeleteTodo(
                                    todos.findIndex((todo) => todo === item),
                                  )
                                }
                              >
                                <DeleteIcon
                                  sx={{ color: theme.palette.error.main }}
                                />
                              </IconButton>
                            </Tooltip>
                          </ListItem>
                        </Fade>
                      ))}
                    </List>
                  )}
                </>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
                Calendar
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card
                  sx={{
                    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                    borderRadius: 5,
                    width: "fit-content",
                  }}
                >
                  <DateCalendar
                    value={selectedDate}
                    onChange={(newDate) => setSelectedDate(newDate)}
                    sx={{
                      ".Mui-selected": {
                        backgroundColor: "#1e3c72",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#2a5298",
                        },
                      },
                      ".MuiPickersDay-today": {
                        border: "1px solid #1e3c72",
                      },
                    }}
                  />
                </Card>
              </Box>
            </Grid>
          </Grid>

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Todo"
                fullWidth
                variant="outlined"
                value={editingTodo ? editingTodo.text : ""}
                onChange={(e) =>
                  setEditingTodo({ ...editingTodo, text: e.target.value })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button
                onClick={handleUpdateTodo}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default Home;
