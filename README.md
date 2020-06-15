This project contains two main components:

	1) Front end --> has been developed by using React.js

	2) Back end --> has been developed by using Spring Boot, Spring Security

------------------------------------------------------------------------------
If you want to run the application properly, you need a MONGODB cluster  which can be accesible via URL Link.

	Example: mongodb://helloworld:helloworld@ds11111.mlab.com:1111/helloworld


In this cluster, you need to have two collections: Contents and Users. 

(By referring to the models under "webserver" directory, you can check what you need to include inside those collections.)


Do not forget to add some dummy data for both collections!


After setting up the database collections, you can paste your cluster link to webserver/src/main/resources/application.properties


------------------------------------------------------------------------------

If Maven is already set to your PATH, you need to run the following commands in order to run the webserver:

	1) maven package

	2) mvn spring-boot:run


Now open another terminal for running the front end components and execute the following commands:

	1) cd aboutsoftwarengineering

	2) npm start
	


If you want to update the contents of homepage, navigate to \login page from the web browser and login with your admin account.

Now you will be able to modify the content of your webpage by using your web browser.




NOTE: This web application was meant to be sharing Software Engineering concepts and knowledge. That is why the folder names are like "aboutsoftwareengineering" etc.  
