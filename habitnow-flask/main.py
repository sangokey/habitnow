from google.cloud import datastore
from flask import Flask, request, make_response, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = datastore.Client()


@app.route('/')
def index():
    return "Flask Backend for CS361 Project"


@app.route('/users', methods=['GET', 'POST'])
def users_get_post():

    # Create a User

    if request.method == 'OPTIONS':
        return build_preflight_response()

    elif request.method == 'POST':
        content = request.get_json()
        new_user = datastore.entity.Entity(
            key=client.key("User"))
        new_user.update(
            {"username": content["username"], "password": content["password"], "firstname": content["firstname"], "lastname": content["lastname"]})
        client.put(new_user)
        new_user_id = str(new_user.key.id)
        return_boat = {"id": new_user_id, "username": new_user["username"], "password": new_user["password"],
                       "firstname": new_user["firstname"], "lastname": new_user["lastname"]}
        return build_actual_response(jsonify(return_boat))

    # List all Users
    elif request.method == 'GET':
        query = client.query(kind="User")
        results = list(query.fetch())
        for e in results:
            e["id"] = e.key.id
        return (json.dumps(results), 200)
    else:
        return 'Method not recognized'


@app.route('/authenticate/<username>/<password>', methods=['GET'])
def authenticate_user(username, password):

    if request.method == 'GET':
        query = client.query(kind="User")
        users = list(query.fetch())

        for user in users:
            if user["username"] == username and user["password"] == password:
                return ("success", 200)

        return ("fail", 403)


def build_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response


def build_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
