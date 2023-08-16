// Listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

// Save Bookmark
function saveBookmark(e) {
  // Get form values
  const siteName = document.getElementById("siteName").value;
  const siteUrl = document.getElementById("siteUrl").value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  const bookmark = {
    name: siteName,
    url: siteUrl,
  };

  // Test if bookmarks is null
  let bookmarks = [];

  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  }

  // Add bookmark to array
  bookmarks.push(bookmark);

  // Set to localStorage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // Clear form
  document.getElementById("myForm").reset();

  // Re-fetch bookmarks
  fetchBookmarks();

  // Prevent form from submitting
  e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url) {
  // Get bookmarks from localStorage
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // Remove bookmark from array
  const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.url !== url);

  // Re-set back to localStorage
  localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}
window.addEventListener("load", fetchBookmarks);
// Fetch bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // Get output id
  const bookmarksResults = document.getElementById("bookmarksResults");

  // Build output
  bookmarksResults.innerHTML = "";
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    bookmarksResults.innerHTML += `<div class="well"> <h3>${name} <a class="btn btn-secondary" target="_blank" href="${addhttp(
      url
    )}">Visit</a> <a onclick="deleteBookmark('${url}')" class="btn btn-danger" href="#">Delete</a> </h3> </div>`;
  });
}

// Validate Form
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert("Please fill in the form");
    return false;
  }

  const expression =
    /[-a-zA-Z0-9@:%+.~#?&//=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Please use a valid URL");
    return false;
  }

  return true;
}

function addhttp(url) {
  if (!/^https?:\/\//i.test(url)) {
    url = "http://" + url;
  }
  return url;
}
