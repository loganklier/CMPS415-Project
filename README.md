# CMPS415-Project

## Phase One:

CMPS 415  -  Enterprise Systems
Programming Project
Phase I: CR                                                                                                                          Due:4/07/23
To be completed by April 7, 2023.

Overview
The project for CMPS 415 will be the development of a Node.js web app which provides CRUD operations for a help desk ticketing system. This project will be split into three phases. Each phase must be developed and submitted separately for each phase. One submission of a final project is not allowed. Students are required to produce their own individual solutions; this is not a team project.

Phase I – Summary
Phase I will focus on the creation of a simple web service using Node and ExpressJS. This phase will focus on setting up the project in Render.com and developing the Create and Read endpoints.

It this phase, tickets will be stored in memory. There will be initial tickets loaded into memory upon service startup. YOU are responsible for providing an initial set of tickets if you want your app to have tickets “loaded”. Your service will allow additions to the collection of tickets as well as access to individual existing tickets. Tickets will be represented/stored in JSON.

Summary of Deliverables

Node Web Service using Node that offers 3 endpoints.
• GET - /rest/list/ = ”Endpoint to get all tickets”
This endpoint requires no input, but will return all of the JSON
objects that are in memory.
• GET - /rest/ticket/id = ”Endpoint to get a single ticket”
This endpoint requires the ID to be sent to the web app. It will return a JSON object of the ticket that has the matching ID.
• POST - /rest/ticket/ = ”Endpoint to create a new ticket”
This endpoint requires a JSON object to be sent to the web app. This object will contain all necessary fields. It will return a JSON
object of the ticket that was created.

In all cases, you will need to do your own error checking and choose how to handle cases such as “ticket not found” or “incomplete ticket info”.

A report must be uploaded on Moodle containing a cover page, description of your work with any explanations that you consider important, a demonstration (with screenshots) of the required parts, and appendices containing your code. You must include relevant links for testing your code.

Rubric
Your score will be out of 100 points. The grade will be based upon the
percentage of the project being completed.

• 20 percent for each endpoint successfully implemented
• 20 percent for setting up the project in Render.com
• 20 percent for storing tickets in memory
 
Notes
This project was developed with industry support and guidance.

Resources:
https://github.com/nichipedia/415-examples   //Sample Node.js app
https://www.Render.com   //Service used for deploying app https://www.getpostman.com   //App for endpoint testing



Sample JSON ticket:

{
"id": 35436,
"created_at": "2015-07-20T22:55:29Z",
"updated_at": "2016-05-05T10:38:52Z",
"type": "incident",
"subject": "MFP not working right",
"description": "PC Load Letter? What does that even mean???",
"priority": "med",
"status": "open",
"recipient": "support_example@selu.edu",
"submitter": "Michael_bolton@selu.edu",
"assignee_id": 235323,
"follower_ids": [235323, 234],
"tags": ["enterprise", "printers"],
}

