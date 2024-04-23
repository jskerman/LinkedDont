import React, { useEffect, useState } from "react";
import Generator from "./components/Generator";
import Profile from "./components/Profile";
import { ROUTES } from "./utils/routes";
import { loadData } from "./utils/localStorage";

function App() {
  const [page, setPage] = useState();
  const [prompt, setPrompt] = useState();
  const [openAiKey, setOpenAiKey] = useState();

  useEffect(() => {
    const fetchLocalData = async () => {
      const loadedOpenAiKey = await loadData("openAiKey");
      const loadedPrompt = await loadData("prompt");
      setOpenAiKey(loadedOpenAiKey);
      setPrompt(loadedPrompt);
    };
    fetchLocalData();
  }, []);

  switch (page) {
    case ROUTES.GENERATOR:
      return (
        <Generator setPage={setPage} promptText={prompt} openAiKey={openAiKey} />
      );
    case ROUTES.PROFILE:
      return (
        <Profile
          setPage={setPage}
          promptText={prompt}
          setPrompt={setPrompt}
          openAiKey={openAiKey}
          setOpenAiKey={setOpenAiKey}
        />
      );
    default:
      return (
        <Generator setPage={setPage} promptText={prompt} openAiKey={openAiKey} />
      );
  }
}

export default App;
