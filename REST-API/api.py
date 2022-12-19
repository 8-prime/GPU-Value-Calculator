from flask import Flask
import flask as fs
from flask_restful import Resource, Api

import webscrape

app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}


class GetGPU1080(Resource):
    def get(self):
        return {'hello': 100}


class GetGpus(Resource):
    def get(self):
        response = fs.jsonify(webscrape.getCurrentGpuData())
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

api.add_resource(HelloWorld, '/')
api.add_resource(GetGPU1080, '/pimmel')
api.add_resource(GetGpus, '/gpus')

if __name__ == '__main__':
    app.run(debug=False)