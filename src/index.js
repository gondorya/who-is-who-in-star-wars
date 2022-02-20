import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";


const store = configureStore();

const theme = createTheme({
    typography: {
        "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
    }
});

const jsx = (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </ThemeProvider>

);

render(jsx, document.getElementById('app'));