import React, { useState } from "react";
import { Card, Container, InputGroup, FormControl, Button } from "react-bootstrap";
import { AddNewTask } from "../apiRequest/apiRequest";
import { successToast, errorToast } from "../helper/ToasterHelper";
import { Toaster } from "react-hot-toast";

const CreateTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleAddTask = async () => {
    try {
      const success = await AddNewTask(taskTitle, taskDescription);

      if (success) {
        successToast("New task added.");
        // Optionally, redirect or perform other actions after adding the task
      } else {
        errorToast("Failed to add new task.");
      }
    } catch (error) {
      console.error(error);
      errorToast("An error occurred while adding the task.");
    } finally {
      // Reset input fields after adding the task or handling the error
      setTaskTitle("");
      setTaskDescription("");
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <Container className="mt-3">
        <Card>
          <Card.Body>
            <Card.Title>New Task</Card.Title>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                placeholder="Task Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                as="textarea"
                placeholder="Task Description"
                rows={10}
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </InputGroup>
            <Button onClick={handleAddTask}>Add Task</Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default CreateTask;