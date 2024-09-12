import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const formatDate = (date) => {
    // Convert the date string to a JavaScript Date object
    const newDate = new Date(date);
    // Extract only the year, month, and day
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0"); // getMonth is zero-based, so add 1
    const day = String(newDate.getDate()).padStart(2, "0");

    // Return the date in YYYY-MM-DD format
    return `${year}-${month}-${day}`;
  };

  const handleSubmitDelete = (id) => {
    axios
      .delete("http://localhost:8081/delete/" + id)
      .then((res) => {
        location.reload();
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  // Count the number of TODO tasks
  const todoCount = data.filter((task) => task.Status === "TODO").length;
  const progressCount = data.filter(
    (task) => task.Status === "Progress"
  ).length;
  const completeCount = data.filter(
    (task) => task.Status === "Complete"
  ).length;
  return (
    <div>
      <Box>
        <Grid container>
          {/* <Grid size={2}>2</Grid> */}
          <Grid size={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" }, // Column on small screens, row on medium and up
                alignItems: "center", // Center items vertically in the flex container
                justifyContent: "space-between", // Add space between the <h2> and the button
                m: { xs: 1, md: 8 },
              }}
            >
              <h2
                style={{
                  margin: 0,
                  padding: 3,
                  fontSize: "clamp(.9rem, 2vw, 2rem)", // Responsive font size
                }}
              >
                Welcome To The DashBoard,{" "}
                <span style={{ color: "#010774" }}>Kashfa</span>
              </h2>
              <Box
                sx={{
                  marginTop: { xs: "1em", md: 0 }, // Add top margin on small screens to separate the button from h2
                }}
              >
                <Link to="/create">
                  <Button
                    sx={{
                      color: "white",
                      backgroundColor: "#131aa1",
                      padding: "8px 16px",
                      fontSize: "clamp(.4rem, 1vw, 1rem)",
                    }}
                  >
                    New Task{" "}
                    <span style={{ fontSize: "1em", color: "white" }}>+</span>
                  </Button>
                </Link>
              </Box>
            </Box>

            <Box sx={{ display: "flex", m: 2, p: 3 }}>
              <Grid container spacing={6}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      width: {
                        xs: "15em", // Full width on extra-small screens (mobile)
                        sm: "15em%", // 50% width on small screens (tablets)
                        md: "25em", // 30% width on medium screens (desktops)
                        lg: "25em", // Fixed width on large screens
                      },
                      height: "auto", // Adjusted height for more content
                      p: 3,
                      backgroundColor: "#ffff",
                      borderTop: "8px solid #ffc074",
                      display: "flex", // Enable flexbox
                      flexDirection: "column", // Stack elements vertically
                      justifyItems: "center", // Center child elements vertically
                      justifyContent: "center", // Center child elements horizontally
                      alignItems: "center", // Center child elements horizontally
                      textAlign: "center",
                    }}
                  >
                    <h3 style={{ color: "#ffc074", textAlign: "center" }}>
                      TODO ({todoCount})
                    </h3>
                    {data.map((task, index) => {
                      if (task.Status === "TODO") {
                        return (
                          <Box
                            elevation={3}
                            sx={{
                              p: 2,
                              border: "2px solid #dedede",
                              borderRadius: "15px",
                              borderLeft: "8px solid #ffc074",
                              cursor: "pointer",
                              width: {
                                xs: "7em", // Full width on extra-small screens (mobile)
                                sm: "10em", // 50% width on small screens (tablets)
                                md: "15em", // 30% width on medium screens (desktops)
                                lg: "20em", // Fixed width on large screens
                              },
                              height: "auto",
                              margin: "10px", // Add margin to space out the boxes
                              display: "flex",
                              flexDirection: "column", // Stack content vertically
                              alignItems: "center", // Center content horizontally
                              justifyContent: "center", // Center content vertically if needed
                            }}
                            key={index}
                          >
                            <h4>{task.Name}</h4>
                            <p>
                              Status :
                              <span
                                style={{
                                  color: "#ffc074",
                                  marginLeft: "5px",
                                }}
                              >
                                {task.Status}
                              </span>
                              <br />
                              Assign : {task.Assign}
                              <br />
                              Type : {task.Type} <br />
                              Date : {formatDate(task.Date)}
                            </p>
                            <button
                              onClick={() => handleSubmitDelete(task.ID)}
                              style={{
                                backgroundColor: "#dc3545", // Bootstrap danger red
                                color: "#fff", // White text
                                border: "none", // No border
                                padding: "4px 8px", // Add some padding for a better button look
                                borderRadius: "4px", // Slight border radius for smooth corners
                                cursor: "pointer", // Pointer on hover
                                fontSize: "0.6em",
                                transition: "background-color 0.3s ease", // Smooth transition
                              }}
                              onMouseOver={(e) =>
                                (e.target.style.backgroundColor = "#c82333")
                              } // Darker red on hover
                              onMouseOut={(e) =>
                                (e.target.style.backgroundColor = "#dc3545")
                              } // Return to original red on mouse out
                            >
                              ╳
                            </button>
                          </Box>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      width: {
                        xs: "15em", // Full width on extra-small screens (mobile)
                        sm: "15em", // 50% width on small screens (tablets)
                        md: "25em", // 30% width on medium screens (desktops)
                        lg: "25em", // Fixed width on large screens
                      },
                      height: "auto", // Adjusted height for more content
                      p: 3,
                      backgroundColor: "#ffff",
                      borderTop: "8px solid #747bff",
                      display: "flex", // Enable flexbox
                      flexDirection: "column", // Stack elements vertically
                      justifyItems: "center", // Center child elements vertically
                      justifyContent: "center", // Center child elements horizontally
                      alignItems: "center", // Center child elements horizontally
                      textAlign: "center",
                    }}
                  >
                    <h3 style={{ color: "#747bff", textAlign: "center" }}>
                      Progress ({progressCount})
                    </h3>
                    {data.map((task, index) => {
                      if (task.Status === "Progress") {
                        return (
                          <Box
                            elevation={3}
                            sx={{
                              p: 2,
                              border: "2px solid #dedede",
                              borderRadius: "15px",
                              borderLeft: "8px solid #747bff",
                              cursor: "pointer",
                              width: {
                                xs: "7em", // Full width on extra-small screens (mobile)
                                sm: "10em", // 50% width on small screens (tablets)
                                md: "15em", // 30% width on medium screens (desktops)
                                lg: "20em", // Fixed width on large screens
                              },
                              height: "auto",
                              margin: "10px", // Add margin to space out the boxes
                              display: "flex",
                              flexDirection: "column", // Stack content vertically
                              alignItems: "center", // Center content horizontally
                              justifyContent: "center", // Center content vertically if needed
                            }}
                            key={index}
                          >
                            <h4>{task.Name}</h4>
                            <p>
                              Status :
                              <span
                                style={{
                                  color: "#747bff",
                                  marginLeft: "5px",
                                }}
                              >
                                {task.Status}
                              </span>
                              <br />
                              Assign: {task.Assign}
                              <br />
                              Type: {task.Type} <br />
                              Date: {formatDate(task.Date)}
                            </p>
                            <button
                              onClick={() => handleSubmitDelete(task.ID)}
                              style={{
                                backgroundColor: "#dc3545", // Bootstrap danger red
                                color: "#fff", // White text
                                border: "none", // No border
                                padding: "4px 8px", // Add some padding for a better button look
                                borderRadius: "4px", // Slight border radius for smooth corners
                                cursor: "pointer", // Pointer on hover
                                fontSize: "0.6em",
                                transition: "background-color 0.3s ease", // Smooth transition
                              }}
                              onMouseOver={(e) =>
                                (e.target.style.backgroundColor = "#c82333")
                              } // Darker red on hover
                              onMouseOut={(e) =>
                                (e.target.style.backgroundColor = "#dc3545")
                              } // Return to original red on mouse out
                            >
                              ╳
                            </button>
                          </Box>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      width: {
                        xs: "15em", // Full width on extra-small screens (mobile)
                        sm: "15em%", // 50% width on small screens (tablets)
                        md: "25em", // 30% width on medium screens (desktops)
                        lg: "25em", // Fixed width on large screens
                      },
                      height: "auto", // Adjusted height for more content
                      p: 3,
                      backgroundColor: "#ffff",
                      borderTop: "8px solid #74ffb5",
                      display: "flex", // Enable flexbox
                      flexDirection: "column", // Stack elements vertically
                      justifyItems: "center", // Center child elements vertically
                      justifyContent: "center", // Center child elements horizontally
                      alignItems: "center", // Center child elements horizontally
                      textAlign: "center",
                    }}
                  >
                    <h3 style={{ color: "#74ffb5", textAlign: "center" }}>
                      Complete ({completeCount})
                    </h3>

                    {data.map((task, index) => {
                      if (task.Status === "Complete") {
                        return (
                          <Box
                            elevation={3}
                            sx={{
                              p: 2,
                              border: "2px solid #dedede",
                              borderRadius: "15px",
                              borderLeft: "8px solid #74ffb5",
                              cursor: "pointer",
                              width: {
                                xs: "7em", // Full width on extra-small screens (mobile)
                                sm: "10em", // 50% width on small screens (tablets)
                                md: "25em", // 30% width on medium screens (desktops)
                                lg: "20em", // Fixed width on large screens
                              },
                              height: "auto",
                              margin: "10px", // Add margin to space out the boxes
                              display: "flex",
                              flexDirection: "column", // Stack content vertically
                              alignItems: "center", // Center content horizontally
                              justifyContent: "center", // Center content vertically if needed
                            }}
                            key={index}
                          >
                            <h4>{task.Name}</h4>
                            <p>
                              Status:
                              <span
                                style={{
                                  color: "#74ffb5",
                                  marginLeft: "5px",
                                }}
                              >
                                {task.Status}
                              </span>
                              <br />
                              Assign: {task.Assign}
                              <br />
                              Type: {task.Type} <br />
                              Date: {formatDate(task.Date)}
                            </p>
                            <button
                              onClick={() => handleSubmitDelete(task.ID)}
                              style={{
                                backgroundColor: "#dc3545", // Bootstrap danger red
                                color: "#fff", // White text
                                border: "none", // No border
                                padding: "4px 8px", // Add some padding for a better button look
                                borderRadius: "4px", // Slight border radius for smooth corners
                                cursor: "pointer", // Pointer on hover
                                fontSize: "0.6em",
                                transition: "background-color 0.3s ease", // Smooth transition
                              }}
                              onMouseOver={(e) =>
                                (e.target.style.backgroundColor = "#c82333")
                              } // Darker red on hover
                              onMouseOut={(e) =>
                                (e.target.style.backgroundColor = "#dc3545")
                              } // Return to original red on mouse out
                            >
                              ╳
                            </button>
                          </Box>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
