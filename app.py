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
from flask import render_template, jsonify

from flask import Flask

engine = create_engine("sqlite:///AQI.sqlite.db")
Base = automap_base()

Base.prepare(engine, reflect=True)

AQI = Base.classes.AQI
MedianAQI = Base.classes.MedianAQI
location = Base.classes.location

session = Session(engine)
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///AQI.sqlite.db"
db = SQLAlchemy(app)

@app.route("/")
def index():
    return render_template("dashboard.html")

@app.route("/api/raw_aqi")
def rawAQI():
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
            'lat': result.lat,
            'lng': result.lng,
            'pm_aqi': result.PMAQIValue
        }
        data.append(row)

    json_data = jsonify(data)

    return json_data

@app.route("/api/median")
def median():
    results = session.query(MedianAQI).all()
    data = []
    for result in results:
        row = {
            'id': result.id,
            'country': result.Country,
            'med_aqi': result.AQIValue,
            'med_co': result.COAQIValue,
            'med_ozone': result.OzoneAQIValue,
            'med_no2': result.NO2AQIValue,
            'good': result.Good,
            'mod': result.Moderate,
            'unhealthy': result.Unhealthy,
            'unhealthy_sens': result.Unhealthy_for_Sensitive_Groups,
            'very_unhealthy': result.Very_Unhealthy,
            'hazard': result.Hazardous,
            'lat': result.lat,
            'long': result.long
        }
        data.append(row)
    json_data = jsonify(data)

    return json_data


@app.route('/api/locations')
def get_locations():

    results = session.query(location).all()
    features = []
    for result in results:
        point = Point((result.longitude, result.latitude))
        properties = {'name': result.Country, 'AQI': result.AQIValue}
        features.append(Feature(geometry=point, properties=properties))
    feature_collection = FeatureCollection(features)

    return jsonify(feature_collection)

@app.route("/map")
def map():
    return render_template("map.html")

@app.route("/chloro")
def chloro():
    return render_template("index_chloropleth.html")

if __name__ == '__main__':
    app.run(debug=True)
