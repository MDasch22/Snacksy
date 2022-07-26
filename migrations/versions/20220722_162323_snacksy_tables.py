"""snacksy tables

Revision ID: a7fe6decc363
Revises:
Create Date: 2022-07-22 16:23:23.558483

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a7fe6decc363'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('profile_picture', sa.String(
                        length=255), nullable=True),
                    sa.Column('first_name', sa.String(
                        length=20), nullable=False),
                    sa.Column('last_name', sa.String(
                        length=30), nullable=False),
                    sa.Column('username', sa.String(
                        length=40), nullable=False),
                    sa.Column('email', sa.String(length=255), nullable=False),
                    sa.Column('address', sa.String(
                        length=255), nullable=False),
                    sa.Column('hashed_password', sa.String(
                        length=255), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email'),
                    sa.UniqueConstraint('username')
                    )
    op.create_table('shopping_carts',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('total', sa.Float(), nullable=False),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('snacks',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('cover_pic', sa.String(
                        length=255), nullable=False),
                    sa.Column('title', sa.String(length=100), nullable=False),
                    sa.Column('description', sa.String(
                        length=500), nullable=False),
                    sa.Column('price', sa.Float(), nullable=False),
                    sa.Column('category', sa.String(
                        length=20), nullable=False),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('items',
                    sa.Column('shopping_cart_id',
                              sa.Integer(), nullable=False),
                    sa.Column('snack_id', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['shopping_cart_id'], [
                                            'shopping_carts.id'], ),
                    sa.ForeignKeyConstraint(['snack_id'], ['snacks.id'], ),
                    sa.PrimaryKeyConstraint('shopping_cart_id', 'snack_id')
                    )
    op.create_table('reviews',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('snack_id', sa.Integer(), nullable=False),
                    sa.Column('rating', sa.Integer(), nullable=False),
                    sa.Column('comment', sa.String(length=500), nullable=True),
                    sa.ForeignKeyConstraint(['snack_id'], ['snacks.id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    # op.drop_table('cart_items')
    op.drop_table('items')
    op.drop_table('snacks')
    op.drop_table('shopping_carts')
    op.drop_table('users')
    # ### end Alembic commands ###
