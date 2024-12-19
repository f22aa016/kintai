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

function Login() {
  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#f7f7f7", // 通常時の枠線
              },
              "&:hover fieldset": {
                borderColor: "#f7f7f7", // ホバー時の枠線
              },
              "&.Mui-focused fieldset": {
                borderColor: "#f7f7f7", // フォーカス時の枠線
              },
              color: "#f7f7f7", // 入力値の色
            },
            "& .MuiInputLabel-root": {
              color: "#f7f7f7", // ラベルの色
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#f7f7f7", // フォーカス時のラベル色
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: "#f7f7f7", // 入力値の色
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
  const [loading, setLoading] = useState(false); // ローディング状態
  const [showLoadingScreen, setShowLoadingScreen] = useState(false); // ロード画面表示状態
  const [showMikepadLoading, setShowMikepadLoading] = useState(false); // mikepad loading表示状態

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
    setShowLoadingScreen(true); // ログイン処理中にロード画面を表示

    try {
      const res = await authApi.login({ username, password });
      setLoading(false);
      setShowLoadingScreen(false); // ログイン後にロード画面を非表示
      localStorage.setItem("token", res.token);
      console.log("ログインに成功しました");

      // mikepad loadingの表示
      setShowMikepadLoading(true);
      setTimeout(() => {
        setShowMikepadLoading(false); // 2秒後に非表示
        navigate("/"); // ログイン成功後にホームページへ遷移
      }, 2000);
    } catch (err) {
      setLoading(false);
      setShowLoadingScreen(false); // エラーが発生してもロード画面を非表示
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
    }
  };

  return (
    <div className="body_loginscreen">
      {showLoadingScreen && (
        <div className="loading-screen">
          <img
            src="https://images.pexels.com/photos/1699574/pexels-photo-1699574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="loading"
            width="860"
            height="820"
            style={{ filter: "brightness(65%)" }}
          />
        </div>
      )}

      <div className="gradation">
        <div id="loading" className={showLoadingScreen ? "" : "hidden"}>
          <img
            src="https://images.pexels.com/photos/1699574/pexels-photo-1699574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="loading"
            width="860"
            height="820"
            style={{ 
              height: "100vh", // 画面高さ全体
              objectFit: "cover", // 画面を完全に覆う
              filter: "brightness(65%)",}}
          />
        </div>
      </div>

      {/* mikepad loading */}
      {showMikepadLoading && (
        <div className="mikepad-loading">
          <div className="binding"></div>
          <div className="pad">
            <div className="line line1"></div>
            <div className="line line2"></div>
            <div className="line line3"></div>
          </div>
          <div className="text">mikepad is loading...</div>
        </div>
      )}

      <div className="form-container">
        <h1 className="h1_loginscreen">Time Stamp</h1>
        <p className="subtitle">勤怠管理システム</p>
        <Box
          component="form"
          onSubmit={handleLogin}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
            maxWidth: "250px",
            margin: "0 auto",
          }}
        >
          <ThemeProvider theme={theme}>
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
              helperText={passwordErrText}
              error={passwordErrText !== ""}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className={`password-eye ${
                      passwordType !== "password" ? "active" : ""
                    }`}
                  >
                    <IconButton onClick={togglePasswordVisibility} edge="end" sx={{ color: "#f7f7f7" }}>
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
              backgroundColor: "#1976d2",
              color: "white",
              "&:hover": {
                backgroundColor: "#1565c0",
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
      </div>
    </div>
  );
}

export default Login;
