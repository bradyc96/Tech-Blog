document.querySelectorAll(".btn-comment").forEach((comment) => {
    comment.addEventListener("click", async (event) => {
      event.preventDefault();
      console.log("Hello");
  
      try {
        let body = document.querySelector("#comment-text").value;
        let postId = event.target.getAttribute("data-postId");
        if (event.target.matches(".btn-comment")) {
          let commentNew = {
            body,
            post_id: postId,
          };
          const postComment = await fetch(`/api/comments/`, {
            method: "POST",
            body: JSON.stringify(commentNew),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (postComment.ok) {
            body = "";
            location.reload();
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  });