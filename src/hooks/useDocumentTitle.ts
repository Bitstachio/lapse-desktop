import { useEffect } from "react";

/**
 * Sets the document title to the provided string and restores the previous title when the component unmounts.
 *
 * @param {string} title - The title to set for the document, either a fixed string or a dynamic state value.
 */
const useDocumentTitle = (title: string) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

export default useDocumentTitle;
