import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import EmbedCreditCard from "./pages/EmbedCreditCard";
import CursorFollower from "./components/CursorFollower";
import PageTransition from "./components/PageTransition";
import ScrollProgress from "./components/ScrollProgress";
import LoadingScreen from "./components/LoadingScreen";
import AmbientSound from "./components/AmbientSound";
import LenisProvider from "./components/LenisProvider";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/embed/credit-card"} component={EmbedCreditCard} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';
    return () => {
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
    };
  }, []);

  if (loading) return <LoadingScreen onFinish={() => setLoading(false)} />;

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <LenisProvider>
            <CursorFollower />
            <ScrollProgress />
            <AmbientSound />
            <Toaster />
            <PageTransition>
              <Router />
            </PageTransition>
          </LenisProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
