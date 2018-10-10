# cs4241-FinalProject

# BaBaMen | Social Media | Sticky Post
## Yufei Gao, Ruyue Wang, Yuxin Wu, Da Xu 

![BaBaMen](/favicon.ico) https://fp-babamen.herokuapp.com/

Our social media application called **Sticky Post**, which allows users to leave messages and share feelings with friends, families or colleagues.

The users' messages will appear on the screen as sticky posts. The only thing they need to do is just login to their accounts. Then, they can create, edit or delete post(s) freely.  Users can press the like button on any post to let the post-creator knows that people think the same way. 

**Sticky Post** allows users to do all the CRUD functions. What's more, we also store all the data in the database decently and implement multiples of event-based interaction on the front-end. A well-organized server of **Sticky Post** also gives the users a better using experience. 

Want to know the most popular topics among friends? The more "like" a post gets, the larger font the post gets. This feature lets users know the hottest topics easily.


## Technical Achievements
- **Tech Achievement 1**: Server-side validation of user submitted data.
- **Tech Achievement 2**: Server-side storage of user submitted data.
- **Tech Achievement 3**: Used MongoDB to store our posts and users' data. We have two collections that each has one field contains a value references to the other collection.
- **Tech Achievement 4**: Implemented the algorithm that can load the db and make the posts to be shown as a word cloud. The posts with more likes are positioned in center and the font is bigger.
- **Tech Achievement 5**: Every button in **Sticky Post** has the decent animation, which is powered by .css and .html files.
- **Tech Achievement 6**: After a user click the like button on a post, the number of likes of that post increases instantly.
- **Tech Achievement 7**: We design a new Favicon for our group and implement it into our project.
- **Tech Achievement 8**: **Sticky Post** generates a random profile photos for each user.  
- **Tech Achievement 9**: Show post's created time base on user's system time.

### Design/Evaluation Achievements
- **Design Achievement 1**: Post are now draggable. Users can drag any post and stick it on any position on the screen.  
- **Design Achievement 2**: Added a welcome page.  
- **Design Achievement 3**: Changed color scheme to gray and white style.  
- **Design Achievement 4**: Added animations for signing up, creating new post, and other actions.  
- **Design Achievement 5**: Added user's profile photo on the post.
- **Design Achievement 1**: The animations of every post beautifies the page. Users can move the cursor from post to post to enjoy the reapperances of posts all the time.
- **Design Achievement 2**: The beautiful footer and its animations make the footer clear and beautiful.
- **Design Achievement 3**: Being located at the top left corner of the page, the menu button, which allows the users to send feedback and look at our code in Github, save a lot of places in the header.
- **Design Achievement 4**: The title scroller allows us to show different things on the page to the users. 
- **Design Achievement 5**: We select the font that matches our website to make the page elegant.
- **Design Achievement 6**: We used Giorgio Morandi(an Italian painter) color palette, which eases the stress of our users and lets them use **Sticky Post** comfortably.
- **Design Achievement 7**: The layout of our website is clear and beautiful.
- **Design Achievement 8**: We don't allow users to select the text in the post.  



Reference:
Word Cloud: https://codepen.io/stevn/pen/JdwNgw  
Title Scroller: https://codepen.io/halvo/pen/BWQxWm  
Emoji Picker: https://github.com/mervick/emojionearea  
Draggable HTML Element: https://www.w3schools.com/howto/howto_js_draggable.asp  
