"""Snack Table

Revision ID: 028cec0405a8
Revises: 6704a8d8d6f3
Create Date: 2022-07-21 22:30:46.017331

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '028cec0405a8'
down_revision = '6704a8d8d6f3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('snacks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('cover_pic', sa.String(length=255), nullable=False),
    sa.Column('title', sa.String(length=20), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('category', sa.String(length=20), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('snacks')
    # ### end Alembic commands ###
