# giskardTechExercise

## 1. Setup

[back-express]:
    https://github.com/victorbillaud/giskardTechExercise/tree/main/back-express
[front-svelte]:
	https://github.com/victorbillaud/giskardTechExercise/tree/main/front-svelte

There is 2 different app for this project : 
- Express app for the [backend][back-express] 
- Svelte app for the [frontend][front-svelte]

This 2 apps works together and need to be start on the same machine.

The backend app require a `.env` file with this attribute

```.end
PORT=3000
API_URL=localhost:3000
SQL_HOST=localhost
SQL_USER=giskard
SQL_PASSWD=giskard
SQL_DATABASE=GiskardCalendarExercise
```

If you change the port number please change it in the `api.js` file in [frontend][front-svelte] app.

## 2. Run
### 2.1 Backend
You just need to type `docker-compose up` inside the `back-express` folder for starting the backend app.

### 2.2 Frontend

Begin by install all node package by tipping `npm i` and  build the app with `npm run build` in your terminal at the root of this folder `/front-svelte`.

For start this app you must type `npm run start`.
## 3. Documentation

There is all the endpoint for the express app

## <span style="background:blue">GET</span> ```/availabilities``` <a id="availabilities"></a> 

### Get all availabilities

### Result

```json
[
	{
		"day": "Fri Sep 09 2022",
		"slots": [
			{
				"id": 16,
				"start": "2022-09-09T06:00:00.000Z",
				"end": "2022-09-09T12:00:00.000Z"
			},
			{
				"id": 17,
				"start": "2022-09-09T13:00:00.000Z",
				"end": "2022-09-09T20:00:00.000Z"
			}
		]
	},
	{
		"day": "Sun Sep 11 2022",
		"slots": [
			{
				"id": 18,
				"start": "2022-09-11T06:00:00.000Z",
				"end": "2022-09-11T06:00:00.000Z"
			}
		]
	}
]
```

## <span style="background:blue">GET</span> ```/availability?id=``` <a id="availability"></a> 

### Get one availability

### Result

```json
{
	"id": 16,
	"start": "2022-09-09T06:00:00.000Z",
	"end": "2022-09-09T12:00:00.000Z"
}
```

## <span style="background:green">POST</span> ```/availabilities/create```  <a id="/availabilities/create"></a> 

### Create a new availability

### Body 

```json
{
  "end": Datetime,
  "start": Datetime
}
```
### Result

```json
{
    "state": boolean, 
    "message": "Message link to the result"
}
```

## <span style="background:green">POST</span> ```/availabilities/delete```  <a id="/availabilities/delete"></a> 

### Delete an availability

### Body 

```json
{
  "id": Integer
}
```
### Result

```json
{
    "state": boolean, 
    "message": "Message link to the result"
}
```

## <span style="background:green">POST</span> ```/reservations/create```  <a id="/reservations/create"></a> 

### Create a new reservation

### Body 

```json
{
  "title": "Title of the slot",
  "email": "Email link to the slot",
  "end": Datetime,
  "start": Datetime
}
```
### Result

```json
{
    "state": boolean, 
    "message": "Message link to the result"
}
```


## <span style="background:green">POST</span> ```/reservations/delete```  <a id="/reservations/delete"></a> 

### Delete a reservation

### Body 

```json
{
  "id": Integer (id of the slot),
  "email": "Email link to the slot",
}
```
### Result

```json
{
    "state": boolean, 
    "message": "Message link to the result"
}
```


