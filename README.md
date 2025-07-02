How to run the project  :- 
1. install the dependencies :- npm install 
2. add .env 
3. build the repo :- npx turbo run build
4. Run the files :- npx turbo run dev



in this project there are three working ends :- 
1. frontEnd
2. BackEnd
3. Database (mongoDb)


1. FRONT END :- 

    It is simply taking a input from user the uri they want to make short and sending that to the backEnd in order to get a shortUri and return it to user . So in short there is not much in frontEnd simply calling an post request to a route at backEnd and recieving shortUri as  response and then returning it to user. 

    Now User can use that shortUri and make a get request to the backEnd simply through browser in this format ${BackenRoute}/api/:shortUri  i.e it will send a get request and redirect you to the longUri. 



2. Back End && Database:- 
    Here Comes the Interesting Part where are the works happens , This i have designed as unique it is not as a usuall uri converter in which we store both shortUri and longUri in the database in this we only store longUri and a unique no with it ,so now that whenver we want to fetch anything through to the database we differentiate through that no , now we don't provide that no to user directly  then this no is converted in to 62chars unique string now whenever user want to fetch the longUri he will provide us that chars unique string that consists of [a->z] + [A->Z] + [0->9] now we will convert this string into no and then fetch it in the database , now you all would be wondering what's the benefit of this basically this makes my server stateless as we are not giving each server a range server simply sends the request to the database and we recieve a unique no which we convert into string and provide it to the user so in this we can do horizontall scalling as much as we want as no server is dependent on each other as traditionally we use to give each server a range and if one of them fails the range is wasted as we can't allot that range to another as we don't no how much of it has been used to so basically that whole range is wasted. 



HOW URI'S ARE GENERATED FROM NO :- 

    So for this i am going for a simple pattern rather issuing directly in order to make the unique string's diverse and not directly in serious for odd no i am issuing from the starting and for even i am issuing it from back side of the digits we have

    so for ex avaiableChars:- [a,b,c,...,z,A,...,Z,1,2,...,9]

    shortId = 1 so string would be = aaaaaab
    shortId = 2 so string would be = 9999997
    shortId = 3 so string would be = aaaaaad 
    ...
    ...
    similary issuing it from both end 

    now inorder to make it more unique i have just jumble the avaibleChars[] (Although i know still they are guessable but a little bit more struggle in order to guess). 


How i am generating unique ShortId in database :- 
    since my schema is like :- {
        longUrl : string 
        shortId : number (id)
    }
    id {
        no : number
    }
    i have also created a table which store a no so basically whenever i put the value in the table i simmply fetch the no from id and increase the id by 1 and as it is also a critical section so that ensures that my entry is unique , and no id can clash each other i did this because i wanted it to be independt from backend so simply backend sends the request with only longUri and everything in database should be independent and response contains the unique id, this way my repo works. 


So how much unique string we can generate ?? 

we are generating the shortUri of 7 digits which consists of 62 chars that consists of  [a->z] + [A->Z] + [0->9]  

so basically total no of unique strings are = 62**7 === 3.5 trillion 

so the question arise is this enough will it be less than our requirements ?? 

so for example if we are having requesting of 1000 uri's per second (I think that is the most we can recieve as we ain't that big companies)


for each year required at this rate  ==> 1000*60*60*24*365 == 31.5 billions uri's would be required per year at this rate

    3.5 trillion/ 31.5 == 11.11 years we can issue uri at this rate although we won't be having 1000 uri request per second so i considered the worst case . 



THANK YOU!!!!