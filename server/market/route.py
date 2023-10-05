from market import app
from flask import render_template, redirect, url_for, flash, request, jsonify
from market.models import Item, User
from market.forms import RegisterForm, LoginForm, PurchaseItemForm, SellItemForm
from market import db
from flask_login import login_user, logout_user, login_required, current_user
from flask_restful import Resource, marshal_with, fields
import json


@app.route('/', methods=['POST', 'GET'])
@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/market')
@login_required
def market():
    purchase_form = PurchaseItemForm()
    selling_form = SellItemForm()
    if request.method == 'POST':
        purchased_item = request.form.get('purchased_item')
        p_item_object = Item.query.filter_by(name=purchased_item).first()
        if p_item_object:
            if current_user.can_purchase(p_item_object):
                p_item_object.buy(current_user)
                flash(f'You purchased {p_item_object.name} for {p_item_object.price}$', category='success')
            else:
                flash(f"Unfortunately, you don't have enough money to purchase {p_item_object}", category='danger')
        
        sold_item = request.form.get('sold_item')
        s_item_object = Item.query.filter_by(name=sold_item).first()
        if s_item_object:
            if current_user.can_sell(s_item_object):
                s_item_object.sell(current_user)
                flash(f"You sold {s_item_object.name} for {s_item_object.price}$", category='success')


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
            flash(f'Success! you are logged in as {attempted_user.username}', category='success')
            return {"loginStatus": "Success"}

        else:
            return {"loginStatus": "Failed"}
            flash('Username and password are not match! Please try again', category='danger')
    
    return jsonify({})

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    if request.method == 'POST':
        name_logged_out = current_user.username
        logout_user()
        flash('You have been logged out!', category='success')
        return jsonify({"name": name_logged_out})
