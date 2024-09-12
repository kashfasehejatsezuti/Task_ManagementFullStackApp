import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Create() {
  const [values, setValues] = useState({
    name: "",
    status: "",
    assign: "",
    type: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/task", values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #131aa1",
    boxShadow: 24,
    p: 4,
  };

  const status = [
    {
      value: "TODO",
      label: "TODO",
    },
    {
      value: "Progress",
      label: "Progress",
    },
    {
      value: "Complete",
      label: "Complete",
    },
  ];
  const assign = [
    {
      value: "Rafsan",
      label: "Rafsan",
    },
    {
      value: "Kashfa",
      label: "Kashfa",
    },
    {
      value: "Jany",
      label: "Jany",
    },
    {
      value: "Sezuti",
      label: "Sezuti",
    },
  ];
  const type = [
    {
      value: "Frontend",
      label: "Frontend",
    },
    {
      value: "Backend",
      label: "Backend",
    },
    {
      value: "DataBase",
      label: "DataBase",
    },
    {
      value: "Testing",
      label: "Testing",
    },
    {
      value: "DevOpp",
      label: "DevOpp",
    },
  ];
  return (
    <div>
      <Box sx={style}>
        {/* <form>
          <h2>Add New Tasks</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input type="text" placeholder="Enter your Name " />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input type="email" placeholder="Enter your Email " />
          </div>
          <Button
            sx={{
              color: "white",
              backgroundColor: "#131aa1",
              m: 3,
            }}
          >
            Submit
          </Button>
        </form> */}
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "30ch" } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h2>Add New Tasks</h2>
          <TextField
            id="outlined-basic"
            label="Task"
            variant="outlined"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            value={values.name}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Status"
            // defaultValue="None"
            // helperText="Please select the Status"
            onChange={(e) => setValues({ ...values, status: e.target.value })}
            value={values.status}
          >
            {status.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="Assign"
            onChange={(e) => setValues({ ...values, assign: e.target.value })}
            value={values.assign}
            // defaultValue="None"
            // helperText="Please select the Status"
          >
            {assign.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="Type"
            // defaultValue="None"
            // helperText="Please select the Status"
            onChange={(e) => setValues({ ...values, type: e.target.value })}
            value={values.type}
          >
            {type.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            sx={{
              color: "white",
              backgroundColor: "#131aa1",
              m: 3,
              textAlign: "center",
            }}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Create;
