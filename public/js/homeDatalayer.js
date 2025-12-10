/**
 * Digital Data Layer Implementation
 * Follows a structure inspired by W3C CEDDL.
 */

window.digitalData = window.digitalData || {};

(function () {
  'use strict';

  // Helper function to read cookies
  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return "";
  }

  // Capture User Details
  var userID = getCookie("CustomerNumber");
  var userName = getCookie("CustomerName");

  // Capture Page Details
  var path = window.location.pathname;
  var pageFileName = path.substring(path.lastIndexOf("/") + 1);
  var pageName = pageFileName.split(".")[0] || "home";

  // Normalize page name
  if (pageName === "index" || pageName === "") {
    pageName = "home";
  }

  // Structuring digitalData
  window.digitalData.page = {
    pageInfo: {
      pageName: pageName,
      pageFileName: pageFileName,
      destinationURL: window.location.href,
      language: "en-US", // Defaulting, could be dynamic
    },
    category: {
      primaryCategory: "content" // Update logic for product pages if needed
    }
  };

  window.digitalData.user = {
    profile: {
      profileInfo: {
        profileID: userID || "guest",
        profileName: userName || "Guest",
        status: userID ? "logged-in" : "logged-out"
      }
    }
  };

  // Backward compatibility or legacy fields if needed (optional)
  // window.digitalData.account = ... 

  console.log("Data Layer Initialized:", window.digitalData);

})();
