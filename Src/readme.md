<img src="./Assets/FireHuntGif.gif" width="100%" />



# Welcome to Fire Hunt <img src="./Assets/logo.png" width="30px" />

FireHunt is an open-source project to full-text search your firebase.

With FireHunt you can search your firebase without any difficulty. We currently only support JavaScript searches and will soon support all languages that support firebase.

# Try Before Use

You can try our example online. [Link To The Example](https://github.com).

# How To Install

You will need to install [Git Bash.](https://git-scm.com/downloads)

Then, let's clone the GitHub repository.

```gfm
git clone https://github.com/CodingReef/FireHunt.git
```

Or you can just add the following code snippet in the head tag of your HTML file.

```js
<script src="https://codingreefdev.github.io/FireHunt/Src/FireHunt.js" ></script>
```

# Function To Query

First, make a file in your file directories called `FireHunt.json` and paste your firebase web app's SDK inside that file.

Then, make an instance of the library's class to search your firebase.

FOR FIRESTORE
```js
var firehuntFS = await new FireHunt_FireStore();
```
FOR REAL-TIME DATABASE

```js
var firehuntRT = await new FireHunt_RealTimeDB();
```
Here, we are using `await` so, make sure to use an `async` function. 

Then, you can use the following `Functions`.

## The following are supported by the FireStore class

```js
await firehuntFS.init();
```
```js
await firehuntFS.searchKey({ collection: "", key: ""}).then( searchResults => {console.log(searchResults )});
```
```js
await firehuntFS.searchValue({ collection: "", value: ""}).then(searchResults =>{console.log(searchResults )});
```

NOTE: All the `calls` use `await`  so make sure to use an `async` function. We use `await` because the fetching of data from firebase takes time.

## await firehuntFS.init(); (Required)

This initializes your firebase app. Just make sure to use an `async` function and that you have your firebase `SDK` in a file called `FireHunt.json`. 

## await firehuntFS.searchKey({ collection: "", key: ""}).then( searchResults => {console.log(searchResults )});

This `call` is used to search your firebase for the `key` values in your firebase `documents`. 

Pass the following parameters in a JSON format. 

collection: the path for your collection.

key: the basic text to search your collection.

Please Note: 

* Don't forget to use `await`.
* This searches only the collection and not the sub-collections.
* This not only searches your document name but also the data inside the documents.
* And only `.then` can be used to get the results.

## await firehuntFS.searchValue({ collection: "", value: ""}).then(searchResults =>{console.log(searchResults )});

This `call` is used to search your firebase for the `value` - values in your firebase `documents`. 

Pass the following parameters in a JSON format. 

collection: the path for your collection.

value: the basic text to search your collection.

Please Note: 

* Don't forget to use `await`.
* This searches only the collection and not the sub-collections.
* This not only searches your document name but also the data inside the documents.
* And only `.then` can be used to get the results.

## The following are supported by the `Realtime Database class`

```js
await firehuntRT.init();
```
```js
await firehuntRT.searchKey({ path: "", key: "" }).then(searchResults => { console.log(searchResults) });
```
```js
await firehuntRT.searchValue({ path: "", key: "" }).then(searchResults => { console.log(searchResults) });
```

NOTE: All the `calls` use `await`  so make sure to use an `async` function. We use `await` because the fetching of data from firebase takes time.

## await firehuntRT.init(); (Required)

This initializes your firebase app. Just make sure to use an `async` function and that you have your firebase `SDK` in a file called `FireHunt.json`. 

## await firehuntRT.searchKey({ path: "", key: "" }).then(searchResults => { console.log(searchResults) });

This `call` is used to search your firebase for the `key` values in your firebase `(All the keys starting from that path)`. 

Pass the following parameters in a JSON format. 

path: the path for your destination to start searching from (The Directory).

key: the basic text to search for the key values in your real-time database.

Please Note: 

* Don't forget to use `await`.
* This searches all the data starting from the path.
* And only `.then` can be used to get the results.

## await firehuntRT.searchValue({ path: "", key: "" }).then(searchResults => { console.log(searchResults) });

This `call` is used to search your firebase for the `value` - values in your firebase `(All the values starting from that path)`. 

Pass the following parameters in a JSON format. 

path: the path for your destination to start searching from (The Directory).

value: the basic text to search for the `value`-values in your real-time database.

Please Note: 

* Don't forget to use `await`.
* This searches all the data starting from the path.
* And only `.then` can be used to get the results.

# What's Next?

Now, you can use the API to search Firebase. Soon we will be uploading a template to show search results to your users. Till then you can try creating your own. Thanks for using FireHunt!!!.

# Want to contribute?

Contribution to this project is open for all. Have something to show or have an upgrade you can contribute it all. Create a  pull request and get started. [More On Pull Requests.](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests)

