Timothy_Whitaker_u22744968
To use the website go to the following link: https://wheatley.cs.up.ac.za/u22744968/index.html.
Choose which ever prac you would like to view.
There are four different pages:
1. Cars Page - This page shows all cars and you can search, filter and sort the cars.
2. Brands Page - This page shows all car brands.
3. Find Me A Car Page - This page allows you to search for a car based on your preferences.
4. Compare Page - This page allows you to compare two cars ,You search for a car and click which car you want to add to the comparison.

You can sign up or login to the website in the top left corner.
Once logged in your details will appear and you can either logout or view your profile.(although viewing your profile is not implemented as of yet)
Default login details: email: root@root.com password: Password1!
Default API_Key: "a9198b68355f78830054c31a39916b7f" - Only works for Displaying data, you need to login rate and update.

The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character.
Why: 
1. Longer and more complex passwords are more difficult to crack using guessing, brute force and dictionary attacks.
2. This has become an industry standard for password security.
3. Passwords that are more difficult to crack ensure that your data is more secure.

For hashing the bcrypt() function is used. It is a hashing algorithm that is designed to be slow to prevent brute force attacks.
It is also kept up to date by the PHP team.
The API key was generated as follows:
1.openssl_random_pseudo_bytes() function is used (It is a cryptographically secure pseudo-random bytes generator) which is converted to hexadecimal using bin2hex(). 
2.uniqid() is then used which uses a combination of the current time in microseconds and the current proccess ID. Adding uniqueness to the API key.
3.Step 1 is repeated.
4.The 3 strings are concatenated together.