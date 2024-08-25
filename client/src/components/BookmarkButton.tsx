import { Bookmark } from "lucide-react";
export const bookmarkPage = () => {
  const pageTitle = document.title;
  const pageURL = window.location.href;

  // @ts-ignore
  if (window.sidebar && window.sidebar.addPanel) {
    // For Firefox
    // @ts-ignore
    window.sidebar.addPanel(pageTitle, pageURL, "");
    // @ts-ignore
  } else if (window.external && window.external.AddFavorite) {
    // For Internet Explorer
    // @ts-ignore
    window.external.AddFavorite(pageURL, pageTitle);
    // @ts-ignore
  } else if (window.opera && window.print) {
    // For Opera
    const bookmarkLink = document.createElement("a");
    bookmarkLink.href = pageURL;
    bookmarkLink.title = pageTitle;
    bookmarkLink.rel = "sidebar";
    bookmarkLink.click();
  } else {
    // For other browsers that do not support bookmarking

    alert(
      "Your browser does not support bookmarking. Please use the bookmarking functionality provided by your browser."
    );
  }
};

export const BookmarkButton = () => {
  const handleBookmark = () => {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const shortcut = isMac ? "Cmd + D" : "Ctrl + D";

    alert(`Press ${shortcut} to bookmark this page.`);

    // Optional: Try to create a bookmark programmatically (most browsers will block this)
    try {
      // @ts-ignore
      window.external.AddFavorite(window.location.href, document.title);
    } catch (e) {
      console.log("Automatic bookmarking is not supported in this browser.");
    }
  };

  return (
    <button
      onClick={handleBookmark}
      className="bg-blue-500 text-white rounded-md px-4 py-2 flex items-center gap-x-2">
      <Bookmark className="h-4 w-4" />
      Bookmark this page
    </button>
  );
};
