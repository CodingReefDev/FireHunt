//this library is an openSource library
//Maintained by CodingReef & GitHub Contributors
//website : https://firehunt.codingreef.com
//GitHub: https://github.com/CodingReefDev/FireHunt

/*
==========================================
||   START OF FIRESTORE SEARCH  ||
==========================================
*/

//this var contains the refferance to firestore

//to check is a string is empty
String.prototype.isEmpty = function() {
    var splited = this.split(" ");
    var final="";
    splited.forEach((e)=>{
        final+=e;
    });
    return !final;
};

var FireHuntDBRefFS;
class FireHunt_FireStore {
    constructor() { };
    async init() {
        //getting the firebase sdk
        var config;
        await fetch('./FireHunt.json')
            .then(response => response.json())
            .then(conf => config = conf);
        //init-ing the firebase app
        var FireHuntApp = await firebase.initializeApp(config, "FireHunt_FireStore");
        //creating an ref to the firestore
        FireHuntDBRefFS = await FireHuntApp.firestore();
        //returing an message
        return "thanks for using FireHunt 😊";
    };
    async fetchData(path) {
        //creating an json var
        var json = {};
        //fetching the data form firebase-firestore
        const snapshot = await FireHuntDBRefFS.collection(path).get();
        //once got the data
        await snapshot.forEach((doc) => {
            //we ref to the path. i.e, collectionName/documentName of the json contains the data 
            json[doc.id] = doc.data();
        });
        //we return the result ie json format of all data in firestore collection
        return json;
    }
    async arrayIt(json) {
        //contains the result of json to array format
        var result = [];
        //creating an class to search for each of the sub-branches of the data
        class array {
            constructor(json, path) {
                //to create an async function
                setTimeout(async () => {
                    //for each item in json
                    for (var i in json) {
                        //if its type is still object i.e json
                        if (typeof json[i] == "object") {
                            //then we simplifiy it more
                            await new array(json[i], path);
                            //and we push it into the result
                            result.push({ key: i, value: json[i], path: path + '/' + i });
                        } else {
                            //else we know that it is in requried format
                            //so we push it into our result
                            result.push({ key: i, value: json[i], path: path + '/' + i });
                        };
                    };
                }, 0);
            };
        };
        //this is the first break down of the json
        async function arrayFunction(json, path) {
            //init path2
            var path2 = path;
            for (var i in json) {
                //making 'path' as the initally passed 'path' i.e 'path2'
                path = path2;
                //if its type is still object i.e json
                if (typeof json[i] == "object") {
                    //we add the path
                    path += i;
                    //then we simplifiy it more
                    await new array(json[i], path);
                    //we push it into our result
                    result.push({ key: i, value: json[i], path: path + '/' + i });
                } else {
                    //else we know that it is in requited format
                    //so we push it into our result
                    result.push({ key: i, value: json[i], path: path + '/' + i });
                };
            };
        };
        //running the above function
        await arrayFunction(json, '/');
        //returning the result
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(result);
            }, 0);
        });
    };

    async Processer(config) {
        //init vars
        var json, final;
        //getting the data from the function 
        await this.fetchData(config.collection).then(data => {
            //assigning the data
            json = data;
        });
        //then we convert into an array with json data this promise result contains the key, value, path
        await this.arrayIt(json).then(data => {
            //assigning the data
            final = data;
        });
        //returing it
        return final;
    }
    async searchKey(config) {
        //this contains the final result
        var finalResult = [];
        //we procsss the data and get all the data into an array with json data
        await this.Processer({ collection: config.collection }).then(data => {
            //for each of the json in the array
            for (var branchId = 0; branchId < data.length; branchId++) {
                //init the key form the key of the json
                var key = data[branchId].key;
                //then we check if the user query and the key matches
                if (key.toUpperCase().match(config.key.toUpperCase())) {
                    //then we push it into the result
                    finalResult.push(data[branchId]);
                }
            }
        });
        //finally we return the result
        return finalResult;
    }
    async searchValue(config) {
        //this contains the final result
        var finalResult = [];
        //we procsss the data and get all the data into an array with json data
        await this.Processer({ collection: config.collection }).then(data => {
            //for each of the json in the array
            for (var branchId = 0; branchId < data.length; branchId++) {
                //init the value form the value of the json
                var value = data[branchId].value;
                //if the query-ed or the type of the data form firebase is object
                if (typeof config.value == 'object' || typeof value == 'object') {
                    //this feature is not avaliable yet
                    //can you do it before us? then contribute it, thanks!!!
                }
                else {
                    //then we check if the user query and the value matches
                    if (value.toUpperCase().match(config.value.toUpperCase())) {
                        finalResult.push(data[branchId]);
                    };
                };
            };
        });
        //finally we return the result
        return finalResult;
    };
    //NOT FINISHED
    async GetDoc({ path, DescName, value }) {
        //setting all the params inside json format
        var data = {}
        if (value) {
            data.value = value;

        } else {
            data.value = '';
        }
        if (path) {
            data.path = path
        } else {
            console.error('Missing Argument path')
        }
        //id desc name i.e description name in the db
        data.DescName = DescName
        //then we get all the docs with the field in it.
        await this.GetDocData(data.path, data.DescName).then(e => {
            //and store the val
            data.getRes = e;
        });

        //if there is any result
        if (data.getRes) {
            //this holds the result (final)
            var result = [];
            //for each doc
            data.getRes.forEach(each => {
                //gettin the description
                var dec = each.data[DescName];
                // check for the match
                if (dec.toUpperCase().match(data.value.toUpperCase())) {
                    //changint thre is
                    var Neweach = each;
                    Neweach.Id = data.path + '/' + each.Id;
                    //then we push the final result
                    result.push(Neweach);
                }
            })
            return new Promise((res, rej) => {
                //then we return it
                res(result);
            })
        } else {
            //there s no result
            return 'No Results';
        }

    }
    async GetDocData(path, name) {
        return new Promise(async (res, rej) => {
            var allDocsMatched = []
            await FireHuntDBRefFS.collection(path).where(name, "!=", '')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        allDocsMatched.push({ Id: doc.id, data: doc.data() });
                    });
                })
                .catch((error) => {
                    rej("Error getting documents: ", error);
                });
            res(allDocsMatched);
        })
    }
};

/*
==========================================
||   START OF REALTIME DATABASE SEARCH  ||
==========================================
*/

//this var contains the refferance to realtimeBD
var FireHuntDBRefRT;
class FireHunt_RealTimeDB {
    constructor() { };
    async init() {
        //getting the firebase sdk
        var config;
        await fetch('./FireHunt.json')
            .then(response => response.json())
            .then(conf => config = conf);
        //init-ing the firebase app
        var FireHuntApp = await firebase.initializeApp(config, "FireHunt_RealTimeDB");
        //creating an ref to the firestore
        FireHuntDBRefRT = await FireHuntApp.database();
        //returing an message
        return "thanks for using FireHunt 😊";
    };
    async fetchData(path) {
        //creating an return promise as it takes a lot of time for slow connections
        return new Promise(async (res, rej) => {
            //fetching the data form firebase-firestore
            await FireHuntDBRefRT.ref(path).on('value', snapshot => {
                res(snapshot.val());
            });
        });
    };

    async arrayIt(json) {
        //this class handles the sub json trees
        class simplifiy {
            async simplifiy(json, path) {
                //for each one in json
                for (const key in json) {
                    //we check its type
                    if (typeof json[key] == 'object') {
                        //if its still json
                        //then we addup the path
                        var path2 = path + '/' + key;
                        //and then simplifiy it more
                        await new simplifiy().simplifiy(json[key], path2);
                        //and also push it
                        result.push({ key: key, value: json[key], path: path2 });
                    }
                    else {
                        //we push it in the array
                        result.push({ key: key, value: json[key], path: path });
                    };
                };
            };
        };
        //contains the result of json to array format
        var result = [];
        //for each of the json key
        for (const key in json) {
            //if the value of it is object
            if (typeof json[key] == 'object') {
                //we simlifiy it
                await new simplifiy().simplifiy(json[key], '/' + key);
                //and push it into the array. here as it is the first time the path is '/'
                result.push({ key: key, value: json[key], path: '/' });
            }
            else {
                //else we push it into the result
                result.push({ key: key, value: json[key], path: '/' });
            };
        };
        //we create an promise as this process might take more time
        return new Promise((res, rej) => {
            //then we return the result
            res(result);
        });
    };

    async Processer(config) {
        //init vars
        var json, final;
        //getting the data from the function 
        await this.fetchData(config.path).then(data => {
            //assigning the data
            json = data;
        });
        //then we convert into an array with json data this promise result contains the key, value, path
        await this.arrayIt(json).then(data => {
            //assigning the data
            final = data;
        });
        //returing it
        return final;
    };
    async searchKey(config) {
        //this contains the final result
        var finalResult = [];
        //we procsss the data and get all the data into an array with json data
        await this.Processer({ path: config.path }).then(data => {
            //for each of the json in the array
            data.forEach(key => {
                //then we check if the user query and the key matches
                if (key.key.toUpperCase().match(config.key.toUpperCase())) {
                    //then we push it into the result
                    finalResult.push(key);
                };
            });
        });
        //finally we return the result
        return finalResult;
    };
    async searchValue(config) {
        //this contains the final result
        var finalResult = [];
        //we procsss the data and get all the data into an array with json data
        await this.Processer({ path: config.path }).then(data => {
            //for each of the json in the array
            data.forEach(key => {
                //init the value form the value of the json
                var value = key.value;
                //if the query-ed or the type of the data form firebase is object
                if (typeof config.value == 'object' || typeof value == 'object') {
                    //this feature is not avaliable yet
                    //can you do it before us? then contribute it, thanks!!!
                }
                else {
                    //then we check if the user query and the value matches
                    if (value.toUpperCase().match(config.value.toUpperCase())) {
                        finalResult.push(key);
                    };
                };
            });
        });
        //finally we return the result
        return finalResult;
    };
};