const user = document.querySelector("#user");
const comment = document.querySelector("#comment");
const submit = document.querySelector(".submit");
const commentsDisplay = document.querySelector("#commentsDisplay");

let comments = [];


//sanitize input/Esacpe function code
function escapeHtml(str){
  if(!str) return'';
  return str.replace(/</g, "&lt;"). replace(/>/g, "&gt;");
}


//comment code
function createCommentObject(name, commentText){
  const newComment = {
    id: Date.now().toString()+ Math.random().toString(36). substr(2,9),
    name: escapeHtml(name),
    comment: escapeHtml(commentText),
    timestamp: new Date().toISOString()
  };
  return newComment;
}


  //display a comment code
  function displayComment(CommentObj){
    
const newDiv = document.createElement("div");

const newHTag = document.createElement("h3");
newHTag.style.fontWeight = "bold";
newHTag.textContent = CommentObj.name;

const newPTag = document.createElement("p");
newPTag.textContent = CommentObj.comment;

const timeSpan = document.createElement("span");
timeSpan.textContent = new Date(CommentObj.timestamp).toLocaleString();


//delete commnet code
const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";
deleteBtn.style.cursor = "pointer";
deleteBtn.addEventListener("click", function(){
  deleteComment(CommentObj.id);

  deleteBtn.classList.add("deleteBtn")
});


newDiv.appendChild(newHTag);
newDiv.appendChild(newPTag);
newDiv.appendChild(timeSpan);
newDiv.appendChild(deleteBtn);

commentsDisplay.appendChild(newDiv);

};

//deleteComment code

function deleteComment(id){
  comments = comments.filter(c => c.id !==id); //remove from array

  localStorage.setItem('comments', JSON.stringify(comments)); //update the localStorage

   //refresh display
  commentsDisplay.innerHTML = "";
  comments.forEach( c => displayComment(c));
}


//submit comment code
submit.addEventListener("click", function(event){
  event.preventDefault();

  const nameValue = user.value;
  const commentValue = comment.value;

  if(!nameValue || !commentValue) return; //don't submity empty blanks

    const now = Date.now();
  const lastComment = localStorage.getItem('lastCommentTime') || 0;
  const limit = 30 * 1000; // 30 seconds

  if(now - lastComment < limit) {
    const remaining = Math.ceil((limit - (now - lastComment)) / 1000);
    alert(`Please wait ${remaining} seconds beofre commenting again.`);
    return;
  }

  localStorage.setItem('lastCommentTime', now);
  
  const newComment = createCommentObject(nameValue, commentValue);

  comments.push(newComment);
  localStorage.setItem('comments', JSON.stringify(comments));

  displayComment(newComment);

  user.value = "";
  comment.value = "";
  
});


//character length code
const userCounter = document.createElement("span");
userCounter.id = "userCounter";
user.after(userCounter);

const commentCounter = document.createElement("span");
commentCounter.id = "commentCounter";
comment.after(commentCounter);


user.addEventListener("input", function(){
  const count = user.value.length;
  const max = 50;
  userCounter.textContent = `${count}/${max}`;
});

comment.addEventListener("input", function(){
  const count = comment.value.length;
  const max = 500;
  commentCounter.textContent = `${count}/${max}`;
})


//sort comment by the newest function
  function sortCommentsByNewest(comments){
    comments.sort((a,b) =>{
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
  } 

//load comment code
function loadComments(){

  const storedComments = localStorage.getItem('comments');

  if(storedComments){
    comments = JSON.parse(storedComments);
    sortCommentsByNewest();
    comments.forEach(c => displayComment(c));
  }
}

loadComments();
