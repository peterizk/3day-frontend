// EasyTitheForm.js
import { useEffect } from "react";

export default function EasyTitheForm() {
  /**  The EasyTithe script writes its own <div> wrapper and markup.
   *   We just inject the script once when the component mounts.
   */
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://forms.ministryforms.net/embed.aspx?formId=60125f9c-8124-4525-91b0-ea4be6c36021";
    script.async = true;
    document.body.appendChild(script);

    // tidy-up on hot-reload/unmount
    return () => document.body.removeChild(script);
  }, []);

  /*  The script will automatically look for – or create – a container that
      matches its formId; this empty div simply guarantees there’s a mount point. */
  return (
    <div id="mf-60125f9c-8124-4525-91b0-ea4be6c36021" style={{ width: "100%" }} />
  );
}
