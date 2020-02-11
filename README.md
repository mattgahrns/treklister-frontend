# Treklister Frontend

Treklister is a web application designed with travelers in mind. It lets you create trips which include two dynamic check lists. One list for things you can't forget before leaving, and a second to make sure you don't leave anything behind. Since the lists are dynamic they can be added to, deleted from, and edited on the fly. Your trips are all saved in our database and can easily be reused as many times as you like.

You can view a demo of the app [here](https://youtu.be/R-ekRgefOZI).

## Install Instructions

For this project you will need to fork and clone both the [frontend](https://github.com/mattgahrns/treklister-frontend) and the [backend](https://github.com/mattgahrns/treklister-backend) then follow the steps below:

  1. Open both repos in your IDE of choice.
  2. On the front end run 'npm install' and on the backend run 'bundle install' in the terminal.
  3. On the backend run 'rails db:migrate'.
  4. On the backend run 'rails s -p 3001' (the -p flag stands for port and the number is the port you want to run the rails server on.          Choose anything besides 3000, as 3000 will be the one that the npm server runs on).
  5. On the frontend run 'npm start'.
  
The app should now be up and running in your default browser.

## License

[MIT License](https://opensource.org/licenses/MIT)
