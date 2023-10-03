from market import api
from flask_restful import Resource, fields, marshal_with
from market.models import Item
from flask import jsonify

items_field = {
    'id': fields.Integer,
    'name': fields.String,
    'price': fields.Integer,
    'barcode': fields.Integer,
    'description': fields.String,
    'owner': fields.Integer
}

class MarketResource(Resource):
    @marshal_with(items_field)
    def get(self):
        items = Item.query.all()
        return items

class OwnedItems(Resource):
    @marshal_with(items_field)
    def get(self):
        ownedItems = Item.query.all()
        return ownedItems

api.add_resource(MarketResource, '/market/items/')
api.add_resource(OwnedItems, '/market/owned')