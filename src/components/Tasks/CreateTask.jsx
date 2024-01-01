import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { successToast, errorToast } from "../../helper/ToasterHelper.js";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import QuillToolbar from "../../utility/ReactQuillModules.js";
import WorkStore from '../../store/Work/WorkStore.js';

const CreateTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [loading, setLoading] = useState(false); // Initialize loading as false
  const navigate = useNavigate();

  const { WorkCreateRequest } = WorkStore((state) => ({
    WorkCreateRequest: state.WorkCreateRequest,
  }));

  useEffect(() => {
    setLoading(true);
    (async () => {
      await WorkCreateRequest();
    })();
    setLoading(false);
  }, []);
  const HandleCreateNewTask = async () => {
    try {
      if (!taskTitle || !taskDescription) {
        errorToast("Please fill all the field.");
        return;
      }
      setLoading(true);
      await WorkCreateRequest(taskTitle, taskDescription);
      const { WorkCreate } = WorkStore.getState();
      if (WorkCreate) {
        successToast("New task added");
        setTimeout(() => {
          navigate("/allTask");
        }, 1000);
      } else {
        errorToast(
          "Failed to add a new task. Check if the same task already added!"
        );
      }
    } catch (error) {
      console.error(error);
      errorToast("An error occurred while adding the task");
    } finally {
      setTaskTitle("");
      setTaskDescription("");
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <Container className="mt-3">
        <Card>
          <Card.Body className="d-flex flex-column gap-4">
            <Card.Title>Create New</Card.Title>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                placeholder="Task Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </InputGroup>

            <ReactQuill
              theme="snow"
              placeholder="Task Description"
              value={taskDescription}
              modules={{
                toolbar: QuillToolbar,
              }}
              onChange={setTaskDescription}
            />
            {loading ? (
              <Button disabled className="btn-disabled">
                Task Adding...
              </Button>
            ) : (
              <Button onClick={HandleCreateNewTask}>Add Task</Button>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default CreateTask;
