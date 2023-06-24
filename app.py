# Import the dependencies
import numpy as np
import pandas as pd
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from geoalchemy2 import Geometry
from geojson import Feature, FeatureCollection, Point
from flask_sqlalchemy import SQLAlchemy
from flask import render_template

from flask import Flask, jsonify

# Database Setup
engine = create_engine("sqlite:///AQI.sqlite.db")

Base = automap_base()

# Reflect the database tables
Base.prepare(engine, reflect=True)

# Save references to each table
AQI = Base.classes.AQI
MedianAQI = Base.classes.MedianAQI
location = Base.classes.location
# Create our session (link) from Python to the DB
session = Session(engine)

# Flask Setup
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///AQI.sqlite.db"
db = SQLAlchemy(app)

# Flask Routes
# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/dashboard")
def dashboard():
    results = session.query(AQI).all()
    data = []
    for result in results:
        row = {
            'id': result.id,
            'country': result.Country,
            'city': result.City,
            'aqi': result.AQIValue,
            'aqi_category': result.AQICategory,
            'co_aqi': result.COAQIValue,
            'co_aqi_category': result.COAQICategory,
            'ozone_aqi': result.OzoneAQIValue,
            'ozone_aqi_category': result.OzoneAQICategory,
            'no2_aqi': result.NO2AQIValue,
            'no2_aqi_category': result.NO2AQICategory,
        }
        data.append(row)

    json_data = jsonify(data)

    return json_data

@app.route("/api/chloropleth")
def chloropleth():
    results = session.query(MedianAQI).all()
    data = []
    for result in results:
        row = {
            'id': result.id,
            'country': result.Country,
            'med_aqi': result.MedianAQIValue,
        }
        data.append(row)
    json_data = jsonify(data)

    return json_data


@app.route('/api/locations')
def get_locations():

    #Query the database
    results = session.query(location).all()
    features = []
    for result in results:
        point = Point((result.latitude, result.longitude))
        properties = {'name': result.Country, 'AQI': result.AQIValue}
        features.append(Feature(geometry=point, properties=properties))
    feature_collection = FeatureCollection(features)

    # Return GeoJSON response
    return jsonify(feature_collection)

if __name__ == '__main__':
    app.run(debug=True)