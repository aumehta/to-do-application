import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Icon from '@mui/material/Icon';
import AddCircle from '@mui/icons-material/AddCircle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from 'material-ui/Button';
import Checkbox from '@mui/material/Checkbox';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


export default function AppBar() {
  const [open, setOpen] = React.useState(false);
  const [taskIndex, setTaskIndex] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickAddOpen = () => {
    setShowTitle(true);
    setShowEditBar(false); 
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseCancel = () => {
    setOpen(false);
    addingItem();
  };

  const toastSuccessDelete= () => {
    toast.success('Task was successfully deleted')};

    const toastSuccessUpdate= () => {
      toast.success('Task was successfully updated')};

      const toastSuccessAdd= () => {
        toast.success('Task was successfully added')};
  //TITLE VALIDATOR

  let [titleValidator, setTitleValidator] = React.useState(false);
  let [showTitle, setShowTitle] = React.useState(true);
  let [showEditBar, setShowEditBar] = React.useState(true);
 
  let [title, setTitle] = React.useState('');
  let [titleText, setTitleText] = React.useState('');


  let validateTitle = (value) => {
    let returnNum = -1
    setTitleValidator(false)
    setTitleText('')
    if (!value) {
      setTitleText('Title is Required!');
      setTitleValidator(true);
      returnNum = returnNum+1
    }
    for(let i=0; i<tasks.length; i++){
      if(tasks[i].title===value){
        setTitleText('Title is not unique!');
        setTitleValidator(true); 
        returnNum = returnNum+1     
      }
    }  
    return returnNum 
  };

  let checkTitle = (value) => {
    setTitle(value);
    validateTitle(value);
  };
  


  //DESCRIPTION VALIDATOR

  let [descriptionValidator, setDescriptionValidator] = React.useState(false);

  let [description, setDescription] = React.useState('');
  let [descriptionText, setDescriptionText] = React.useState('');

  let validateDescription = (value) => {
    let returnNewValue = -1
    setDescriptionValidator(false)
    setDescriptionText('')
    if (!value) {
      setDescriptionText('Description is Required!');
      setDescriptionValidator(true);
      returnNewValue = returnNewValue+1
    }
    return returnNewValue 
  };

  let checkDescription = (value) => {
    setDescription(value);
    validateDescription(value);
  };

  const [deadline, setDeadline] = React.useState('');
  let [priority, setPriority] = React.useState('Low');

  const changePriority = (event) => {
    setPriority(event.target.value);
  };
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  let [isComplete, setIsComplete] = React.useState(false);

  const handleCheckbox = (index) => (event) => {
    let copyArr = [...tasks];
    let thisTask = copyArr[index];
    let isThisComplete = thisTask.isComplete;
    copyArr[index] = {
      title: thisTask.title,
      description: thisTask.description,
      deadline: thisTask.deadline,
      priority: thisTask.priority,
      isComplete: !isThisComplete,
    };
    setTasks(copyArr);
  };


  const handleUpdateOpen = (index) => (event) => {
    setOpen(true);
    setTaskIndex(index)
    let copyArr = [...tasks];
    let thisTask = copyArr[index];
    setShowTitle(false);
    setShowEditBar(true); 
    setTitle(thisTask.title);
    setDescription(thisTask.description);
    setDeadline(thisTask.deadline);
    setPriority(thisTask.priority);
    setIsComplete(thisTask.isComplete);
  };

  // const toast = ToastService.new({
  //   place: "bottomRight",
  //   duration: 1,
  // });
  
  const handleDeleteOpen = (index ) => (event) => {
    let taskTitle = tasks[index].title
    setTasks((current) =>
      current.filter((task) => task.title !== taskTitle)
    );
    toastSuccessDelete()
    addingItem()
    
  };


  const handleUpdateClose = ()  => {
    tasks[taskIndex] = {
      title: title, 
      description: description,
      deadline: deadline,
      priority: priority,
      isComplete:false
    };
    setOpen(false); 
    toastSuccessUpdate()
    addingItem()
  };

  const addingItem = () => {
    setTitle('');
    setTitleText('')
    setDescription('');
    setDescriptionText('')
    setDeadline('');
    setPriority('Low');
  };

  function addDialogValidate() {
    let numDes = validateDescription(description)
    let numTitle = validateTitle(title)
    if ((numTitle<0) && (numDes <0)){
      createData();
      handleClose(); 
      toastSuccessAdd()
      addingItem();
    }
  }

  let [tasks, setTasks] = React.useState([]);

  function createData() {
    let newTask = {
      title: title,
      description: description,
      deadline: deadline,
      priority: priority,
      isComplete: false,
    };
    tasks.push(newTask);
    
  }

  return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <MenuIcon />
          <Typography variant="button" component="div" sx={{ flexGrow: 1 }}>
            FRAMEWORKS
          </Typography>
          <Button
            id="addbtn"
            variant="contained"
            startIcon={<AddCircle />}
            size="small"
            color="primary"
            onClick={handleClickAddOpen}
          >
            Add
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar>
                {showEditBar && (
            <Button
                    id="addbtn"
                    variant="contained"
                    startIcon={<EditIcon />}

                    size="small"
                    color="primary"
                  >
                    Edit Task
                    
 
                  </Button>
            )}  

                  {showEditBar ==false&& (

          
                  <Button
                    id="addbtn"
                    variant="contained"
                    startIcon={<AddCircle />}
                    size="small"
                    color="primary"
                  >
                    Add Task
                  </Button>
                    )}
                </Toolbar>
              </AppBar>
            </Box>

            <DialogContent>
              <Stack spacing={2}>
                {showTitle && (
                  <TextField
                    margin="dense"
                    label="Title"
                    fullWidth
                    variant="outlined"
                    error={titleValidator}
                    helperText={titleText}
                    sx={{ width: 1 }}
                    id="titleinput"
                    value={title}
                    placeholder="Type title..."
                    onChange={(e) => checkTitle(e.target.value)}
                  />
                )}
                <TextField
                  autoFocus
                  margin="dense"
                  id="description"
                  label="Description"
                  fullWidth
                  variant="outlined"
                  value={description}
                  error={descriptionValidator}
                  helperText={descriptionText}
                  onChange={(e) => checkDescription(e.target.value)}
                />
                <TextField
                  id="date"
                  label="Deadline"
                  type="date"
                  name="deadline"
                  sx={{ width: 275 }}
                  value={deadline}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setDeadline(e.target.value)}
                />
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Priority
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue="Low"
                    id="priority"
                    onChange={changePriority}
                  >
                    <FormControlLabel
                      value="Low"
                      control={<Radio />}
                      label="Low"
                    />
                    <FormControlLabel
                      value="Med"
                      control={<Radio />}
                      label="Med"
                    />
                    <FormControlLabel
                      value="High"
                      control={<Radio />}
                      label="High"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </DialogContent>
            <DialogActions>

            {showEditBar && (
            <Button
                    id="addbtn"
                    variant="contained"
                    startIcon={<EditIcon />}
                    size="small"
                    color="primary"
                    onClick={handleUpdateClose}

                  >
                    Edit Task 
                  </Button>
            )}
            {showEditBar==false&& (

              <Button
                onClick={addDialogValidate}
                id="addbtndialog"
                variant="contained"
                startIcon={<AddCircle />}
                size="small"
                color="primary"
              >
                Add
              </Button>
                   )}
              <Button
                onClick={handleCloseCancel}
                id="cancelbtn"
                variant="contained"
                startIcon={<CancelIcon />}
                size="small"
                color="error"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell> IsComplete </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow
                key={task.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{task.title}</TableCell>
                <TableCell align="center">{task.description}</TableCell>
                <TableCell align="center">{task.deadline}</TableCell>
                <TableCell align="center">{task.priority}</TableCell>
                <TableCell align="center">
                  {/* {task.isComplete}{' '} */}
                  <Checkbox onChange={handleCheckbox(index)} 
                  />
                </TableCell>
                <TableCell align="center">
                  <Stack>
                    {task.isComplete == false && (
                      <Button
                        id="updatebtn"
                        variant="contained"
                        startIcon={<EditIcon />}
                        size="small"
                        color="primary"
                        onClick={handleUpdateOpen(index)
                      }
                      >
                        UPDATE
                      </Button>
                    )}

                    <Button
                      onClick={handleDeleteOpen(index)}
                      id="cancelbtn"
                      variant="contained"
                      startIcon={<CancelIcon />}
                      size="small"
                      color="error"
                    >
                      DELETE
                    </Button>

                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer
  position="bottom-right"
  autoClose={5000}
  hideProgressBar={true}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>
    </Box>
    
  );
}
