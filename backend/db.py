import pymysql.cursors

def get_db_connection():
    connection = pymysql.connect(
        host='localhost',  # Change to your MySQL server host if necessary
        user='root',       # Your MySQL username
        password='1947',  # Your MySQL password
        db='payme',  # Name of your database
        cursorclass=pymysql.cursors.DictCursor
    )
    return connection
