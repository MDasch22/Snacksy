# from sqlalchemy import ForeignKey
from .db import db, items


class ShoppingCart(db.Model):
    __tablename__ = "shopping_carts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    total = db.Column(db.Float, nullable=False)

    snacks = db.relationship("Snack", secondary=items,
                             back_populates="shopping_carts")
    cart_items = db.relationship("Snack",
                                 secondary=items,
                                 back_populates="snack_items"
                                 )

    user = db.relationship("User", back_populates="shopping_cart")

    def __init__(self):
        self.shoppingList = []

    def addItem(self, item):
        self.shoppingList.append(item)

    def removeItem(self, item):
        self.shoppingList.remove(item)

    def getTotal(self):
        total = 0
        for item in self.shoppingList:
            name, price = item
            total = total + price
        return total

    def getShoppingList(self):
        items = None
        for item in self.shoppingList:
            items = items + item
        return items

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total': self.total,
            'user': self.user,
            'snacks': self.snacks
        }
