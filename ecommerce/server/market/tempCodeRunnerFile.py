    items = Item.query.filter_by(id=1)
        items_list = [{'id': item.id, 'name': item.name, 'price': item.price} for item in items]
        return jsonify(items_list)