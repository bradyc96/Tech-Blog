const dashboardFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#title-text").value.trim();
    const body = document.querySelector("#content-text").value.trim();
    const newPost = {
      title,
      body,
    };
  
    if (title && body) {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: { "Content-Type": "application/json" },
      });
    }
  };
  
  document
    .querySelector(".dashboard-form")
    .addEventListener("submit", dashboardFormHandler);