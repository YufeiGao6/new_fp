# cs4241-FinalProject

For your final project, you'll implement a course project that exhibits your mastery of the course materials. 
This project gives you an opportunity to be creative and to pursue individual research and learning.

## General description

Your project should consist of a complete Web application. 
The site must exhibit facets of the three main sections of the course material:

- Static Web page content and design. You should have a project that is well-designed, easily navigable, and exhibits good human-computer interaction.
- Dynamic behavior implemented with JavaScript and possibly other JavaScript librarires.
- Server-side programming. Typically this will take the form of some sort of persistent data and possibly server-side computation.

Additionally, you should incorporate features that you independently research, design, and implement for your project.

## Project ideation

Excellent projects serve someone/some group: define your users and stakeholders. 
Don't just create a webapp with a pile of features.
I encourage you to identify projects that will have impact.

Create something useful for a cause or hobby you care about; something that will help you grow as a student.
Also see our [hall of fame](https://cs4241-18a.github.io/fame/), with notable projects from prior offerings of the course.

## Logistics

### Team size
Students are encouraged to work in teams of 1-4 students for the project. 
This will allow you to build a good project without expending an excessive amount of effort. 
While I would expect a team of four students to produce a project with more features, I expect a single person project to exhibit all of the required facets described above.

### Deliverables

__Proposal:__ 
Provide an outline of your project direction and the names of the team members. 
The outline should have enough detail so that staff can determine if it meets the minimum expectations, or if it goes too far to be reasonable by the deadline.
This file must be named proposal.md so we can find it.
Submit a PR to turn it in.

There are no other scheduled checkpoints for your project. 
You must be done in time to present before the final project demo day. 

#### Turning in Your Outline / Project

**NOTE: code is due before the project presentation day due to the end of term / grading schedule constraints**
Submit a second PR on the final project repo to turn in your app and code.

Deploy your app, in the form of a webpage, to Heroku or some other service.
Folks on the same team do not need to post the same webpage, but must instead clearly state who is on the team in their proposal.
(Staff will use the proposal to build the grading sheet.)

## Final Presentation

Presentations will occur during the final week of class.

As for the presentations, we will take over a different room on WPI's campus, with tables.
You'll set up and demo to folks who stop by.
You'll demo to staff as part of your grade.

## FAQs

- **Can I open-source my project?** You may open source your project after the class ends. 
I encourage it. While other course code should be kept hidden, this is a case where others can and should learn and draw inspiration from everyone else.

- **Can I use XYZ framework?** You can use any web-based frameworks or tools available.


# BaBaMen | Social Media | Sticky Post
## Yufei Gao, Ruyue Wang, Yuxin Wu, Da Xu 

![BaBaMen](/favicon.ico) https://a4-babamen.herokuapp.com/

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
