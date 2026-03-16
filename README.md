# Comment Section Web App

A lightweight **Comment Section Web Application** built with **HTML, CSS, and Vanilla JavaScript**.  
This project allows users to submit comments, display them dynamically, delete comments, and store them using **localStorage** so they persist after refreshing the page.

The application also includes **basic security protections, comment rate limiting, character counters, and sorting by newest comments**.

---

## Features

- Add comments with name and message
- Display comments dynamically
- Delete comments
- Save comments using **localStorage**
- Sort comments by newest first
- Comment **rate limiting** (prevents spam)
- Character counters for inputs
- Prevent empty comment submissions
- **Basic XSS protection** using HTML escaping
- Submit comments with **Enter key**
- Responsive UI
- Styled comment cards with hover effects

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- DOM Manipulation
- Local Storage API

---

## Project Structure

```
comment-section/
│
├── index.html      # Main HTML structure
├── style.css       # Styling and UI design
├── script.js       # Comment logic and functionality
└── README.md       # Project documentation
```

---

## How It Works

### Comment Creation

When a user submits a comment, the app creates a comment object containing:

- Unique ID
- User name
- Comment text
- Timestamp

```javascript
function createCommentObject(name, commentText){
  const newComment = {
    id: Date.now().toString()+ Math.random().toString(36).substr(2,9),
    name: name,
    comment: commentText,
    timestamp: new Date().toISOString()
  };
}
```

Each comment is stored inside a JavaScript array.

---

### Local Storage Persistence

All comments are saved in the browser using **localStorage**.

```javascript
localStorage.setItem('comments', JSON.stringify(comments));
```

When the page loads, stored comments are retrieved and displayed automatically.

---

### Rate Limiting (Anti-Spam)

To prevent spam, users must wait **15 seconds between comments**.

If a user tries to comment too quickly, the system shows an alert.

---

### XSS Protection

The application sanitizes user input to prevent HTML or script injection.

```javascript
function escapeHtml(str){
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
```

---

### Comment Sorting

Comments are automatically sorted by **newest first** using their timestamp.

```javascript
comments.sort((a,b)=>{
  return new Date(b.timestamp) - new Date(a.timestamp);
});
```

---

## UI Features

- Modern gradient submit button
- Floating delete button
- Alternating comment background colors
- Hover animations for comments
- Background image with blur effects
- Clean centered comment form

---

## Responsive Design

The interface adjusts to different screen sizes and remains readable on mobile devices.

---

## Learning Goals

This project was built to practice:

- JavaScript DOM manipulation
- Event handling
- Data structures (arrays and objects)
- Local storage persistence
- Input validation
- Basic frontend security
- UI styling with CSS

---

## Possible Future Improvements

- Edit comments feature
- User avatars
- Like / upvote system
- Comment replies (threaded comments)
- Backend database storage
- Authentication system
- Pagination for large comment lists

---

## Author

**Yosef Ergano**

Computer Science student focused on building practical projects and improving web development skills.

---

## License

This project is open source and free to use for learning purposes.
