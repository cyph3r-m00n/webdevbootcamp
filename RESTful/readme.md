# RESTful Routing

##Introduction
* Define REST and explain WHY it matters
* List all 7 RESTful Routes
* Show example of RESTful routing in practice

REST - a mapping between HTTP routes and CRUD

Convention/Architecture to CRUD Functionality


BLOG

CREATE   /
READ     /allBlogs
UPDATE   /updateBlog/:id
DESTROY  /destroyBlog/:id



7 RESTful Routes:

name    path            verb            purpose
===========================================================
Index   /dogs           GET             list all dogs
New     /dogs/new       GET             Show new dog form
Create  /dogs           POST            Create a new dog, then redirect somewhere
Show    /dogs/:id       GET             Show info about one specific dog
Edit    /dogs/:id/edit  GET             Show Edit form for one dog
Update  /dogs/:id       PUT             Update a particular dog, then redirect somewhere    
Destroy /dogs/:id       DELETE          Delete a particular dog, then redirect somewhere



# Basic Layout

* Add header and footer Partials
* Include Semantic UI
* Add Simple Nav.


# Edit/Update

* Add Edite Route
* Add Edit Form
* Add Update Route
* Add Update Form
* Add Method-override


# Destroyyyy

* Add Destroy Route
* Redirect


# Final Updates
* Sanitize blog bodyStyle Index
* Update REST Table 