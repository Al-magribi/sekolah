import {
  Box,
  Fade,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { createExam } from "../../../Redux/Exam/exam_action";
import { CREATE_EXAM_RESET } from "../../../Redux/Exam/exam_const";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { toast, ToastContainer } from "react-toastify";

import "./datepicker.css";

const generateTokenIn = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let token = "";
  token += letters.charAt(Math.floor(Math.random() * letters.length));
  token += letters.charAt(Math.floor(Math.random() * letters.length));
  token += numbers.charAt(Math.floor(Math.random() * numbers.length));
  token += numbers.charAt(Math.floor(Math.random() * numbers.length));
  token += letters.charAt(Math.floor(Math.random() * letters.length));
  token += letters.charAt(Math.floor(Math.random() * letters.length));
  return token;
};

const generateTokenOut = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let token = "";
  token += letters.charAt(Math.floor(Math.random() * letters.length));
  token += letters.charAt(Math.floor(Math.random() * letters.length));
  token += numbers.charAt(Math.floor(Math.random() * numbers.length));
  token += numbers.charAt(Math.floor(Math.random() * numbers.length));
  token += letters.charAt(Math.floor(Math.random() * letters.length));
  token += letters.charAt(Math.floor(Math.random() * letters.length));
  return token;
};

const Add = ({ open, close }) => {
  const dispatch = useDispatch();

  const { loading, success, message } = useSelector((state) => state.newExam);

  const { userInfo: user } = useSelector((state) => state.userLogin);
  const { grades } = useSelector((state) => state.grades);

  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const [name, setName] = useState("");
  const tokenIn = generateTokenIn();
  const tokenOut = generateTokenOut();
  const [end, setEnd] = useState(null);
  const [start, setStart] = useState(null);
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [choice, setChoice] = useState("");
  const [essay, setEssay] = useState("");
  const [passing, setPassing] = useState("");

  useEffect(() => {
    const initialDate = setHours(setMinutes(new Date(), 0), 9);
    setStart(initialDate);
  }, []);

  const addHandler = (e) => {
    e.preventDefault();

    const startTime = format(start, "yyyy-MM-dd HH:mm");
    const endTime = format(end, "yyyy-MM-dd HH:mm");

    const data = {
      user: user?._id,
      tokenIn: tokenIn,
      tokenOut: tokenOut,
      name: name,
      subject: subject,
      grade: grade,
      start: startTime,
      end: endTime,
      choice: choice,
      essay: essay,
      passing: passing,
    };

    dispatch(createExam(data));
  };

  useEffect(() => {
    if (success) {
      toast.success(message);
      setName("");
      setGrade("");
      setSubject("");
      setStart(null);
      setEnd(null);
      setChoice("0");
      setEssay("0");
      setPassing("");

      dispatch({ type: CREATE_EXAM_RESET });

      close();
    }
  }, [success, dispatch, message]);

  return (
    <div>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 350, md: 400 },
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 2,
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <Loader />
          ) : (
            <form
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
              onSubmit={addHandler}
            >
              {/* TINGKAT */}
              <FormControl required fullWidth sx={{ mb: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  --Pilih Tingkat--
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={grade}
                  label="--Pilih Guru--"
                  onChange={(e) => setGrade(e.target.value)}
                >
                  {grades?.map((grade) => (
                    <MenuItem key={grade._id} value={grade.grade}>
                      {grade.grade}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                required
                fullWidth
                name="name"
                label="Nama Ujian"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                required
                fullWidth
                name="subject"
                label="Mata Pelajaran"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                required
                fullWidth
                name="choice"
                label="Bobot PG"
                value={choice}
                onChange={(e) => setChoice(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                required
                fullWidth
                name="essay"
                label="Bobot Essay"
                value={essay}
                onChange={(e) => setEssay(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                required
                fullWidth
                name="passing"
                label="KKM"
                value={passing}
                onChange={(e) => setPassing(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Box
                sx={{
                  width: "100%",
                  height: 60,
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "start",
                  flexDirection: "column",
                  mb: 2,
                }}
              >
                <Typography sx={{ mb: 1 }}>Mulai</Typography>
                <DatePicker
                  selected={start}
                  onChange={(date) => setStart(date)}
                  showTimeSelect
                  filterTime={filterPassedTime}
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </Box>

              <Box
                sx={{
                  width: "100%",
                  height: 60,
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "start",
                  flexDirection: "column",
                  mb: 2,
                }}
              >
                <Typography sx={{ mb: 1 }}>Selesai </Typography>
                <DatePicker
                  selected={end}
                  onChange={(date) => setEnd(date)}
                  showTimeSelect
                  filterTime={filterPassedTime}
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                  mt: 2,
                }}
              >
                <Button variant="contained" color="success" type="submit">
                  Tambahkan
                </Button>
                <Button variant="contained" color="error" onClick={close}>
                  batalkan
                </Button>
              </Box>
            </form>
          )}
        </Box>
      </Fade>
    </div>
  );
};

export default Add;