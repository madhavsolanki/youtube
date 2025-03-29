# Backend Documentation - YouTube-Like Application

## **1. Home Section**
This section manages the main video feed, individual video views, category-based filtering, and search functionality.

### **1.1 Fetch All Videos (Home Page Feed)**
- **Endpoint:** `GET /videos` 
- **Description:** Retrieves all videos approved by the admin to be displayed on the home page.
- **Response:** Returns a list of videos with details such as title, thumbnail, duration, and uploader info.
### **1.2 Fetch Single Video**
- **Endpoint:** `GET /videos/:videoId` 
- **Description:** Fetches a specific video when a user clicks on it.
- **Response:** Returns video details including title, description, uploader, category, views, likes, and comments.
### **1.3 Fetch Videos by Category**
- **Endpoint:** `GET /videos/category/:categoryId` 
- **Description:** Displays videos under a selected category.
- **Response:** Returns a list of videos filtered by the given category.
### **1.4 Search Videos**
- **Endpoint:** `GET /videos/search?query=keyword` 
- **Description:** Implements YouTube-style search functionality, allowing users to search videos by title, description, or tags.
- **Response:** Returns a list of videos matching the search query.
---

## **2. Shorts Video Section**
This section handles user-uploaded short videos and admin approvals.

### **2.1 Upload Shorts**
- **Endpoint:** `POST /shorts/upload` 
- **Description:** Users can upload short videos, which must be approved by an admin before becoming publicly available.
- **Validation:** Max length of **100 seconds**.
### **2.2 Edit Shorts**
- **Endpoint:** `PUT /shorts/:shortId` 
- **Description:** Users can edit their short videos before admin approval.
### **2.3 Get All Shorts**
- **Endpoint:** `GET /shorts` 
- **Description:** Fetches all approved short videos.
### **2.4 Get Shorts by Specific User**
- **Endpoint:** `GET /shorts/user/:userId` 
- **Description:** Fetches all shorts uploaded by a specific user.
### **2.5 Get Single Short Video**
- **Endpoint:** `GET /shorts/:shortId` 
- **Description:** Retrieves details of a specific short video.
### **2.6 Admin Approval for Shorts**
- **Endpoint:** `PUT /shorts/approve/:shortId` 
- **Description:** Admin reviews and approves/rejects short videos.
---

## **3. User Management**
This section includes authentication, user roles, dashboard, subscriptions, and interactions.

### **3.1 User Authentication**
- **Endpoints:**
    - `POST /auth/register`  (User Registration)
    - `POST /auth/login`  (User Login)
    - `POST /auth/logout`  (User Logout)
    - `PUT /auth/update-profile`  (Update User Profile)
### **3.2 User Video Upload Process**
- **Workflow:** When a user uploads a video, it is first sent to the admin for approval. Once approved, it becomes publicly visible.
### **3.3 User Dashboard**
- **Endpoint:** `GET /user/dashboard` 
- **Description:** Displays user details, uploaded videos, and settings.
- **Features:**
    - Modify uploaded videos (edit description, delete videos).
    - View subscriber count.
    - View list of subscribed channels.
    - View liked videos.
### **3.4 Subscriptions & Subscribers**
- **Endpoints:**
    - `GET /user/subscribers`  (View subscriber count & list)
    - `GET /user/subscribed-channels`  (View subscribed channels)
    - `POST /user/subscribe/:channelId`  (Subscribe to a channel)
    - `DELETE /user/unsubscribe/:channelId`  (Unsubscribe from a channel)
### **3.5 Liked Videos**
- **Endpoints:**
    - `POST /videos/:videoId/like`  (Like a video)
    - `DELETE /videos/:videoId/unlike`  (Unlike a video)
    - `GET /user/liked-videos`  (Fetch all liked videos)
### **3.6 Role-Based Access**
- **User Roles:**
    - `user` : Regular users can upload videos, like, comment, and subscribe.
    - `admin` : Can approve/reject videos, manage content, and moderate comments.
### **3.7 User Comments**
- **Endpoints:**
    - `POST /videos/:videoId/comment`  (Add comment)
    - `GET /videos/:videoId/comments`  (Fetch all comments on a video)
    - `GET /comments/:commentId`  (Fetch single comment)
    - `PUT /comments/:commentId`  (Edit comment)
    - `DELETE /comments/:commentId`  (Delete comment)
---

## **4. Categories Management (Admin Only)**
This section handles video categorization, ensuring users can browse videos by topic.

### **4.1 Create Category**
- **Endpoint:** `POST ``/categories` 
- **Description:** Admin can create new video categories.
- **Access:** Admin Only.
### **4.2 Update Category**
- **Endpoint:** `PUT /categories/:categoryId` 
- **Description:** Admin can update category details.
- **Access:** Admin Only.
### **4.3 Delete Category**
- **Endpoint:** `DELETE /categories/:categoryId` 
- **Description:** Admin can delete categories.
- **Access:** Admin Only.
### **4.4 Fetch All Categories**
- **Endpoint:** `GET /categories` 
- **Description:** Retrieves all available categories.
---

## **Admin Approval Workflow**
- When a user uploads a **video** or **short**, an entry is created with status `Pending` .
- Admin reviews and updates the `status`  (`Approved`  or `Rejected` ).
- If **approved**, the video/short becomes public; otherwise, the user is notified with **remarks**.
This ensures **admin control over content visibility** before publication.

