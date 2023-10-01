from market import app
from flask import render_template, redirect, url_for, flash, request, jsonify
from market.models import Item, User
from market.forms import RegisterForm, LoginForm, PurchaseItemForm, SellItemForm
from market import db
from flask_login import login_user, logout_user, login_required, current_user

@app.route('/', methods=['POST', 'GET'])
@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/market')
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

        return redirect(url_for('market'))
    
    if request.method == 'GET':
        items = Item.query.all()
        items_list = [{'id': item.id, 'name': item.name, 'price': item.price} for item in items]
        return jsonify({"items": items_list})

    owned_items = Item.query.filter_by(owner=current_user.id)

@app.route('/register', methods=['POST', 'GET'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        user_to_create = User(username=form.username.data,
                              email=form.email.data,
                              password = form.password1.data)
        db.session.add(user_to_create)
        db.session.commit()
        login_user(user_to_create)
        flash(f'Account created successfully! You are now logged in as {user_to_create.username}', category='success')
        return redirect(url_for('market'))
        
    if form.errors != {}:
        for err_msg in form.errors.values():
            flash(f'There was an error with creating a user {err_msg}', category='danger')


@app.route('/login', methods=['POST', 'GET'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        attempted_user = User.query.filter_by(username=form.username.data).first()
        if attempted_user and attempted_user.check_password_correction(attempted_password=form.password.data):
            login_user(attempted_user)
            flash(f'Success! you are logged in as {attempted_user.username}', category='success')
            return redirect(url_for('market'))

        else:
            flash('Username and password are not match! Please try again', category='danger')

@app.route('/logout')
def logout():
    logout_user()
    flash('You have been logged out!', category='success')
