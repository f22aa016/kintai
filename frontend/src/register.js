import React, { useState } from "react";
import "./Login_style.css";
import InputAdornment from "@mui/material/InputAdornment";
import authApi from "./api/outhApi";
import { Box, TextField, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Register() {
  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#f7f7f7", // 通常時の枠線青色
              },
              "&:hover fieldset": {
                borderColor: "#f7f7f7", // ホバー時の枠線青色
              },
              "&.Mui-focused fieldset": {
                borderColor: "#f7f7f7", // フォーカス時の枠線青色
              },
              color: "#f7f7f7", // 入力値の色を白に
            },
            "& .MuiInputLabel-root": {
              color: "#f7f7f7", // ラベル青色
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#f7f7f7", // フォーカス時のラベル青色
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: "#f7f7f7", // 入力値の色を白に
          },
        },
      },
    },
  });

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [passwordType, setPasswordType] = useState("password");
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");

    let error = false;

    if (username === "") {
      error = true;
      setUsernameErrText("名前を入力してください");
    }
    if (password === "") {
      error = true;
      setPasswordErrText("パスワードを入力してください");
    }

    if (error) return;
    setLoading(true);

    try {
      console.log("asdfghjkl;kjhgfd");
      const res = await authApi.login({ username, password });
      setLoading(false);
      localStorage.setItem("token", res.token);
      console.log("ログインに成功しました");
      navigate("/home"); // ログイン成功後にホームページへ遷移
    } catch (err) {
      console.log(err);
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((err) => {
        if (err.param === "username") {
          setUsernameErrText(err.msg);
        }
        if (err.param === "password") {
          setPasswordErrText(err.msg);
        }
      });
      setLoading(false);
    }
  };

  return (
    <div className="body_loginscreen">
      <div className="gradation">
        <div id="loading" className="hidden">
          <img
            src="https://images.pexels.com/photos/1699574/pexels-photo-1699574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="loading"
            width="860"
            height="820"
            style={{ filter: "brightness(65%)" }}
          />
        </div>
      </div>
      <div className="form-container">
        <h1 className="h1_loginscreen">Time Stamp</h1>
        <p className="subtitle">勤怠管理システム</p>
        <>
          <Box component="form" onSubmit={handleLogin} noValidate
            sx={{
              display: "flex",
              flexDirection: "column", // フォーム要素を縦に並べる
              gap: "16px", // 各要素間の間隔
              width: "100%", // 必要に応じて幅を調整
              maxWidth: "250px", // フォーム全体の最大幅を制限
              margin: "0 auto", // 中央揃え
            }}
          >
            <ThemeProvider theme={theme} >
              <TextField
                id="username"
                label="名前"
                margin="normal"
                name="username"
                required
                helperText={usernameErrText}
                error={usernameErrText !== ""}
                disabled={loading}
                onChange={(e) => setUsername(e.target.value)}

              />
              <TextField
                id="password"
                label="パスワード"
                margin="normal"
                name="password"
                type={passwordType}
                required
                setUsername
                helperText={passwordErrText}
                error={passwordErrText !== ""}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" className={`password-eye ${passwordType !== "password" ? "active" : ""}`}>
                      <IconButton onClick={togglePasswordVisibility} edge="end" sx={{ color: "#f7f7f7", }} > {/*sx:パスワード目の色*/}
                        {passwordType === "password" ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </ThemeProvider>

            <LoadingButton
              sx={{
                mt: 3,
                mb: 2,
                variant: "contained",
                backgroundColor: "#1976d2", // ボタンの背景色
                color: "white", // テキストの色
                "&:hover": {
                  backgroundColor: "#1565c0", // ホバー時の背景色
                },
              }}
              type="submit"
              loading={loading}
            >
              ログイン
            </LoadingButton>
          </Box>
          <Button component={Link} to="../register">
            アカウントを持っていませんか？新規登録
          </Button>
        </>
      </div>
    </div>
  );
}

export default Register;
