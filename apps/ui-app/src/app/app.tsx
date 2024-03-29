import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ConsultAnalysis from './consult-analysis/page';
import PerformReport from './perform-report/page';
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./home/page";
import Footer from "./components/footer/footer";
import Sidebar from './components/side-bar/side-bar';
import NotFound from './not-found/page';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Sidebar/>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/perform-report" element={<ProtectedRoute component={PerformReport} />} />
            <Route path="/consult-analisys" element={<ProtectedRoute component={ConsultAnalysis} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
