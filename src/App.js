import React, { useEffect, useState } from "react";
import Generator from "./components/Generator";
import Profile from "./components/Profile";
import { ROUTES } from "./utils/routes";
import { loadData } from "./utils/localStorage";

function App() {
  const [page, setPage] = useState();
  const [resume, setResume] = useState();
  const [openAiKey, setOpenAiKey] = useState();

  useEffect(() => {
    const fetchLocalData = async () => {
      const loadedOpenAiKey = await loadData("openAiKey");
      const loadedResume = await loadData("resume");
      setOpenAiKey(loadedOpenAiKey);
      setResume(loadedResume);
    };
    fetchLocalData();
  }, []);

  switch (page) {
    case ROUTES.GENERATOR:
      return (
        <Generator setPage={setPage} resume={resume} openAiKey={openAiKey} />
      );
    case ROUTES.PROFILE:
      return (
        <Profile
          setPage={setPage}
          resume={resume}
          setResume={setResume}
          openAiKey={openAiKey}
          setOpenAiKey={setOpenAiKey}
        />
      );
    default:
      return (
        <Generator setPage={setPage} resume={resume} openAiKey={openAiKey} />
      );
  }
}

export default App;
