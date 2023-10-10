from market import app
from flask import flash, request, jsonify
from market.models import Item, User
from market import db, api
from flask_login import login_user, logout_user, login_required, current_user
from flask_restful import Resource, marshal_with, fields, marshal
import json

@app.route('/', methods=['POST', 'GET'])
@app.route('/navbar')
def home():
    if current_user:
        return {"current_user_budget": current_user.budget, "current_user_logged_in": True}
    else:
        return {"current_user_logged_in": False}
    
@app.route('/market/purchase', methods=['POST','GET'])
def purchase():
    if request.method == 'POST':
        data = json.loads(request.data)
        purchased_item = data.get("item_id")
        p_item_object = Item.query.filter_by(id=purchased_item).first()
        if p_item_object:
            if current_user.can_purchase(p_item_object):
                p_item_object.buy(current_user)
                return {"message": "Buy Successful"}
            else:
                return {"message": "Buy Failed"}

@app.route('/market/sell', methods=['POST'])
def sell():
    if request.method == 'POST':
        data = json.loads(request.data)
        sell_item = data.get("item_id")
        s_item_object = Item.query.filter_by(id=sell_item).first()
        if s_item_object:
            if current_user.can_sell(s_item_object):
                s_item_object.sell(current_user)
                return {"message": "Sell Successfully"}
            else:
                return {"message": "Sell Failed"}

@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        data = json.loads(request.data)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return {"registerStatus": "Failed"}
        else:
            user_to_create = User(username=username,
                                email=email,
                                password=password)
            db.session.add(user_to_create)
            db.session.commit()
            login_user(user_to_create)
            flash(f'Account created successfully! You are now logged in as {user_to_create.username}', category='success')
            return {"registerStatus": "Success"}


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        data = json.loads(request.data)
        username = data.get('username')
        print(username)
        password = data.get('password')
        attempted_user = User.query.filter_by(username=username).first()
        if attempted_user and attempted_user.check_password_correction(attempted_password=password):
            login_user(attempted_user)
            current_user_id = current_user.id
            return {"loginStatus": "Success", "current_user_id": current_user_id}

        else:
            return {"loginStatus": "Failed"}
    
@app.route('/logout', methods=['POST'])
@login_required
def logout():
    if request.method == 'POST':
        name_logged_out = current_user.username
        logout_user()
        flash('You have been logged out!', category='success')
        return jsonify({"name": name_logged_out, "current_user_logged_in": False})

items_field = {
    'id': fields.Integer,
    'name': fields.String,
    'price': fields.Integer,
    'barcode': fields.Integer,
    'description': fields.String,
    'owner': fields.Integer
}

class MarketResource(Resource):
    def get(self):
        if current_user:
            items = Item.query.filter_by(owner=None).all()
            return {'items':marshal(items, items_field), 'current_user_logged_in': True}
        else:
            current_user_logged_in = False
            return {'current_user_logged_in': False}

class OwnedItems(Resource):
    def get(self):
        if current_user:
            ownedItems = Item.query.filter_by(owner=current_user.id).all()
            return {'ownedItems':marshal(ownedItems, items_field), "current_user_logged_in": True}
        else:
            return {"current_user_logged_in": False}

api.add_resource(MarketResource, '/market/items/')
api.add_resource(OwnedItems, '/market/owned/')
