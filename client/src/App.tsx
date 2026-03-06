import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChatBot } from "@/components/ChatBot";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useState } from "react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pricing" component={Pricing} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [language, setLanguage] = useState('fr');

  const handleTranslatePage = (lang: string) => {
    setLanguage(lang);
    if (window.location.hostname !== 'localhost') {
      // Use Google Translate for production
      const element = document.documentElement;
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.head.appendChild(script);
      window.googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: 'fr', includedLanguages: 'fr,en,ar,es,de' },
          'google_translate_element'
        );
      };
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageSelector onLanguageSelect={handleTranslatePage} />
        <Toaster />
        <ChatBot />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
