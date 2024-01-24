import { useState, useEffect } from "react";
import { useMixpanel } from "gatsby-plugin-mixpanel";

export const useABTest = (events) => {
  const mixpanel = useMixpanel();
  const [copyVersion, setCopyVersion] = useState(null);

  useEffect(() => {
    const versions = Object.keys(events);
    const randomIndex = Math.floor(Math.random() * versions.length);

    const selectedVersion = versions[randomIndex];

    setCopyVersion(selectedVersion);
    mixpanel.track(`Rendered ${selectedVersion}`);
  }, []);

  const handleTrackEvent = () => {
    mixpanel.track(events[copyVersion]);
  };

  return { copyVersion, handleTrackEvent };
};