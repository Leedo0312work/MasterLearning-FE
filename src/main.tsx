import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import '~/styles/global.scss';
import '~/index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ConfirmProvider } from 'material-ui-confirm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AgoraRTC, { AgoraRTCProvider } from 'agora-rtc-react';

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
ReactDOM.createRoot(document?.getElementById('root')).render(
    // <React.StrictMode>
    <QueryClientProvider
        client={
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                    },
                },
            })
        }
    >
        <ConfirmProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <AgoraRTCProvider client={client}>
                    <App />
                </AgoraRTCProvider>
            </LocalizationProvider>
        </ConfirmProvider>
    </QueryClientProvider>,
    // {/* </React.StrictMode>, */}
);

//branch -> dev -> pull request -> merge
