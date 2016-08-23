## API Documentation

**Authorization by username and password**
----
Return user info

* **URL**

  `/auth`

* **Method:**

  `POST`

*  **URL Params**

  None

* **Data Params** 
  
    ```javascript
    {
      "username": "tinywolf709",
      "password": "rockon"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
  
    **Header:**
    
    ```javascript
    {
        Authorization: "************************"
    }
    ```

    **Content:**

    ```javascript
    {
      "type": "local",
      "_id": "57bc421fba6036fad8cad7c6",
      "gender": "female",
      "name": {
        "title": "miss",
        "first": "alison",
        "last": "reid"
      },
      "location": {
        "street": "1097 the avenue",
        "city": "Newbridge",
        "state": "ohio",
        "zip": 28782
      },
      "email": "alison.reid@example.com",
      "username": "tinywolf709",
      "phone": "031-541-9181",
      "cell": "081-647-4650",
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/60.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/60.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/60.jpg"
      },
      "registered": 1471955479,
      "__v": 0
    }
    ```

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />


**Authorization by social platform**
----
Return user info

* **URL**

  `/auth/social`

* **Method:**

  `POST`

*  **URL Params**

  None

* **Data Params**

    ```javascript
    {
      "id": "123456789123456",
      "provider": "facebook",
      "accessToken": "*****",
      "refreshToken": "undefined",
      "data": {
        "id": "123456789123456",
        "username": "undefined",
        "displayName": "Necip Arg",
        "name": {
          "familyName": "undefined",
          "givenName": "undefined",
          "middleName": "undefined"
        },
        "gender": "undefined",
        "profileUrl": "undefined",
        "provider": "facebook"
      }
    }  
    ```

* **Success Response:**

  * **Code:** 200 <br />
  
    **Header:**
    
    ```javascript
    {
        Authorization: "************************"
    }
    ```

    **Content:**

    ```javascript
    {
      "type": "social",
      "_id": "57bc29267e2f8692d1afaa26",
      "updated": 1471956870,
      "registered": 1471949094,
      "name": "Necip Arg",
      "provider": "facebook",
      "platformId": "10154182615377839"
    }
    ```

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />



**List Contacts**
----
Returns a list of Contacts

* **URL**

  `/contacts`

* **Method:**

  `GET`

*  **URL Params**

  None
  
* **Header Params**

    ```javascript
    {
      "Content-Type": "application/json"
      "Authorization": "JWT ************************"
    }    
    ```

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    {
      "contacts": [
        {
          "_id": "57bc48c1cc261778da668c5e",
          "owner": {
            "id": "57bc421fba6036fad8cad7c6",
            "type": "local"
          },
          "name": {
            "title": "mr",
            "first": "ricky",
            "last": "robertson"
          },
          "gender": "male",
          "location": {
            "street": "1858 jones road",
            "city": "Killarney",
            "state": "virginia",
            "zip": 67647
          },
          "email": "ricky.robertson@example.com",
          "phone": "041-060-3589",
          "cell": "081-733-6421",
          "picture": "https://randomuser.me/api/portraits/men/76.jpg",
          "__v": 0
        },
        {
          "_id": "57bc48c1cc261778da668c5f",
          "owner": {
            "id": "57bc421fba6036fad8cad7c6",
            "type": "local"
          },
          "name": {
            "title": "ms",
            "first": "barb",
            "last": "reed"
          },
          "gender": "female",
          "location": {
            "street": "6819 south street",
            "city": "Passage West",
            "state": "massachusetts",
            "zip": 14086
          },
          "email": "barb.reed@example.com",
          "phone": "011-434-6413",
          "cell": "081-844-2224",
          "picture": "https://randomuser.me/api/portraits/women/84.jpg",
          "__v": 0
        }
      ],
      "pagination": {
        "page": 3,
        "pageCount": 50,
        "totalCount": 100
      }
    }
    ```

* **Error Response:**
  
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
  
    ```javascript
    { "error": "Error listing contacts" }
    ```

 
**Get Contact**
----
  Returns JSON data about a single contact.

* **URL**

  `/contacts/:id`

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `id=[string]`

* **Header Params**

    ```javascript
    {
      "Content-Type": "application/json"
      "Authorization": "JWT ************************"
    }    
    ```

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    {
      "_id": "57bc48c1cc261778da668c5e",
      "owner": {
        "id": "57bc421fba6036fad8cad7c6",
        "type": "local"
      },
      "name": {
        "title": "mr",
        "first": "ricky",
        "last": "robertson"
      },
      "gender": "male",
      "location": {
        "street": "1858 jones road",
        "city": "Killarney",
        "state": "virginia",
        "zip": 67647
      },
      "email": "ricky.robertson@example.com",
      "phone": "041-060-3589",
      "cell": "081-733-6421",
      "picture": "https://randomuser.me/api/portraits/men/76.jpg",
      "__v": 0
    }
    ```

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```javascript
    { "error": "Error reading contact" }
    ```

  * **Code:** 404 NOT FOUND <br />
    **Content:**

    None


**Update Contact**
----
  Returns updated JSON data about a target contact.

* **URL**

  `/contacts/:id`

* **Method:**

  `PUT`

*  **URL Params**

   **Required:**

   `id=[string]`

* **Header Params**
      
    ```javascript
    {
      Content-Type: "application/json"
      Authorization: "JWT ************************"
    }
    ```

* **Data Params**

    ```javascript
    {
      "owner": {
        "id": "57bc421fba6036fad8cad7c6",
        "type": "local"
      },
      "name": {
        "title": "mr",
        "first": "ricky",
        "last": "robertson"
      },
      "gender": "male",
      "location": {
        "street": "1858 jones road",
        "city": "Killarney",
        "state": "virginia",
        "zip": 67647
      },
      "email": "ricky.robertson@example.com",
      "phone": "041-060-3589",
      "cell": "081-733-6421",
      "picture": "https://randomuser.me/api/portraits/men/76.jpg"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    {
      "_id": "57bc48c1cc261778da668c5e",
      "owner": {
        "id": "57bc421fba6036fad8cad7c6",
        "type": "local"
      },
      "name": {
        "title": "mr",
        "first": "ricky",
        "last": "robertson"
      },
      "gender": "male",
      "location": {
        "street": "1858 jones road",
        "city": "Killarney",
        "state": "virginia",
        "zip": 67647
      },
      "email": "ricky.robertson@example.com",
      "phone": "041-060-3589",
      "cell": "081-733-6421",
      "picture": "https://randomuser.me/api/portraits/men/76.jpg",
      "__v": 0
    }
    ```

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```javascript
    { "error": "Error updating contact" }
    ```

  * **Code:** 404 NOT FOUND <br />
    **Content:**

    None


**Create Contact**
----
  Returns JSON data about created contact.

* **URL**

  `/contacts`

* **Method:**

  `POST`

*  **URL Params**

   None

* **Header Params**
      
    ```javascript
    {
      Content-Type: "application/json"
      Authorization: "JWT ************************"
    }
    ```

* **Data Params**

    ```javascript
    {
      "name": {
        "title": "mr",
        "first": "ricky",
        "last": "robertson"
      },
      "gender": "male",
      "location": {
        "street": "1858 jones road",
        "city": "Killarney",
        "state": "virginia",
        "zip": 67647
      },
      "email": "ricky.robertson@example.com",
      "phone": "041-060-3589",
      "cell": "081-733-6421",
      "picture": "https://randomuser.me/api/portraits/men/76.jpg"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    {
      "_id": "57bc48c1cc261778da668c5e",
      "owner": {
        "id": "57bc421fba6036fad8cad7c6",
        "type": "local"
      },
      "name": {
        "title": "mr",
        "first": "ricky",
        "last": "robertson"
      },
      "gender": "male",
      "location": {
        "street": "1858 jones road",
        "city": "Killarney",
        "state": "virginia",
        "zip": 67647
      },
      "email": "ricky.robertson@example.com",
      "phone": "041-060-3589",
      "cell": "081-733-6421",
      "picture": "https://randomuser.me/api/portraits/men/76.jpg",
      "__v": 0
    }
    ```

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```javascript
    { "error": "Error creating contact" }
    ```


**List Users**
----
Returns a list of Users

* **URL**

  `/users`

* **Method:**

  `GET`

*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    [{
      "_id": "57b330de848a005e48f5de94",
      "gender": "female",
      "name": {
        "title": "ms",
        "first": "olivia",
        "last": "young"
      },
      "location": {
        "street": "1119 grove road",
        "city": "Mountmellick",
        "state": "rhode island",
        "zip": 88061
      },
      "email": "olivia.young@example.com",
      "username": "crazykoala938",
      "registered": 1411100094,
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/20.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/20.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/20.jpg"
      },
      "__v": 0
    }, {
      "_id": "57b330de848a005e48f5de95",
      "gender": "female",
      "name": {
        "title": "ms",
        "first": "susanne",
        "last": "russell"
      },
      "location": {
        "street": "6896 grafton street",
        "city": "Naas",
        "state": "louisiana",
        "zip": 25003
      },
      "email": "susanne.russell@example.com",
      "username": "ticklishswan833",
      "registered": 1345063087,
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/69.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/69.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/69.jpg"
      },
      "__v": 0
    }]
    ```

* **Error Response:**

* **Code:** 500 INTERNAL SERVER ERROR <br />
  **Content:**

    ```javascript
    { "error": "Error listing users" }
    ```

* **Sample Call:**

    ```javascript
    $.ajax({
      url: "/users",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
    ```


**Show User**
----
  Returns JSON data about a single user.

* **URL**

  `/users/:id`

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `id=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    {
      "_id": "57b330de848a005e48f5de94",
      "gender": "female",
      "name": {
        "title": "ms",
        "first": "olivia",
        "last": "young"
      },
      "location": {
        "street": "1119 grove road",
        "city": "Mountmellick",
        "state": "rhode island",
        "zip": 88061
      },
      "email": "olivia.young@example.com",
      "username": "crazykoala938",
      "registered": 1411100094,
      "phone": "011-475-1126",
      "cell": "081-725-2254",
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/20.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/20.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/20.jpg"
      },
      "__v": 0
    }
    ```

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```javascript
    { "error": "Error reading user" }
    ```

* **Sample Call:**

    ```javascript
    $.ajax({
      url: "/users/1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
    ```

