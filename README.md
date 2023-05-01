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


## Phase Two:

CMPS 415  -  Enterprise Systems
Programming Project

Phase II: UD	 	 				                                                                    Due:4/21/23
To be completed by April 21, 2023

Overview
The project for CMPS 415 will be the development of a Node.js web app which provides CRUD operations for a help desk ticketing system. This project will be split into three phases. Each phase must be developed and submitted separately for each phase. One submission of a final project is not allowed. Students are required to produce their own individual solutions; this is not a team project.


Phase II – Summary
This purpose of this phase is to extend the services created in Phase I. The extension will require the addition of a database to store the tickets. Two additional endpoints will need to be developed to update and delete tickets.

You should use a database solution provided by Render.com. You may consider the following: https://devcenter.heroku.com/articles/mean-apps-restful-api#provision-a-mongodb-database

Summary of Deliverables
Node Web Service using Node that offers 5 endpoints.
• DELETE - /rest/ticket/id = ”Deletes a ticket record by ID”
• PUT - /rest/ticket/id = ”Updates exsisting ticket record based on ID”

You must consider necessary input/output and error handling. There is no strict requirement for these.

A report must be uploaded on Moodle containing a cover page, description of your work with any explanations that you consider important, a demonstration (with screenshots) of the required parts, and appendices containing your code. You must include relevant links for testing your code.

Rubric
Your score will be out of 100 points. The grade will be based upon the percentage of the project being completed.

• 30 percent for each endpoint implemented
• 40 percent for integrating and using a database

## Phase Three

 CMPS 415  -  Enterprise Systems
Programming Project

Phase III: Adding an Adapter                                                                                                    Due: 4/28/23
To be completed by April 28.

Overview
The project for CMPS 415 will be the development of a Node.js web app which provides CRUD operations for a help desk ticketing system. This project will be split into three phases. Each phase must be developed and submitted separately for each phase. One submission of a final project is not allowed. Students are required to produce their own individual solutions; this is not a team project.

Phase III – Summary
The purpose of this phase is to apply the Adapter design pattern to your web service that allows the use of XML to represent tickets. The pattern is described below as a UML diagram:


 


Consider this example: If the leaders of two countries need to meet, but the two leaders do not share a common language, a translator is used to interpret the communication between the uncommon languages. An adaptor in software is not unlike the translator. The translator does not add anything to the conversation, they simply facilitate the conversation. So what should happen if our web service “speaks” JSON but an external component needs to “speak” in XML? We would not want to change our web service. We simply add a translator, or more accurately, an adaptor.

Implementation details are intentionally left out of this phase since the purpose of a design pattern is to provide a general approach to a problem. It is required that you implement 2 additional endpoints that do NOT reimplement the functionality of the existing GET/PUT endpoints. The Adapter Design Pattern requires that the ADAPTOR receive the request, translate the request, then call the method for the ADAPTEE. In this case, the ADAPTORs are the 2 new endpoints and the ADAPTEEs are the two existing endpoints.

Summary of Deliverables
Web Service using Node that offers 2 new endpoints developed using the Adapter Design Pattern. 
• GET - /rest/xml/ticket/id = Endpoint to get a single ticket returned as an XML document. This endpoint, should receive the request, use the existing /rest/ticket/id endpoint to get the ticket information as a JSON object, then return the information as an XML document.”
• PUT - /rest/xml/ticket/id = Endpoint to add a single ticket that was sent as an XML document. This endpoint, should receive the request, translate the XML document to a JSON object, then use the existing /rest/ticket/id endpoint to add the ticket information.”

IN ADDITION, you will provide a written report about your web service that contains the following in order:
1)	Your name and W#.
2)	A paragraph describing the technical details of the web service. In this section, please explain how the adapter pattern has been implemented (which part of the code implements the pattern and how it works/interfaces with the rest of the code, for example, which parts of the code correspond to the above UML diagram).
3)	Screenshots of your service completing some sequence of tests to demonstrate the functionality of the service.
A Summary paragraph that includes the following:
a.	A brief description of how successful you were in completing the project.
b.	What the major hurdles were and how you overcame them.
c.	A possible extension of your project.
4)	Your source code.

Rubric
Your score will be out of 150 points.
• 50 points for the for each endpoint
• 50 points for a final report which demonstrates a working app.

Additional Resources
Please see the following sources:
https://www.geeksforgeeks.org/convert-xml-data-into-json-using-node-js 

A brief description of XML:
https://www.w3schools.com/xml/xml_whatis.asp


Sample Ticket as XML
<ticket>
 <id>35436</id>
 <created_at>2015-07-20T22:55:29Z</created_at>
 <updated_at>2016-05-05T10:38:52Z</updated_at>
  ...
 <submitter>Michael_bolton@selu.edu</submitter>
 <assignee_id>23532</assignee_id>
 <follower_ids>
<id>235323</id>
<id>234</id> 
 </follower_ids>
  ...
</ticket>

