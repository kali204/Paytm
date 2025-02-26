import pymysql

try:
    conn = pymysql.connect(
        host='localhost',
        user='root',
        password='1947',
        db='payme',
        cursorclass=pymysql.cursors.DictCursor
    )
    print("Database Connected Successfully")
    conn.close()
except Exception as e:
    print(f"Database Connection Error: {e}")
