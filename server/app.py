from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS
import bcrypt

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database connection
def get_db_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="amartyapaul123",
        database="miniproject",
        port=3306,
        charset='utf8',
    )
    return connection

# Signup route (user registration)
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    name = data['name']
    flat_no = data['flatNo']
    apartment_name = data['apartmentName']
    area = data['area']
    pincode = data['pincode']
    email = data['email']
    password = data['password']

    # Hash the password using bcrypt
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        # SQL query
        query = """
            INSERT INTO users (name, flat_no, apartment_name, area, pincode, email, password) 
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        values = (name, flat_no, apartment_name, area, pincode, email, hashed_password)

        # Execute query
        cursor.execute(query, values)
        connection.commit()

        return jsonify({"message": "User registered successfully!"}), 201

    except Error as e:
        # Log the detailed error message for debugging
        print(f"Error occurred: {e}")  # Print the error to the console or use a logging system
        return jsonify({"error": "There was an issue processing your request."}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


# Login route (authentication)
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        # Query to fetch the user's details
        query = "SELECT password FROM users WHERE email = %s"
        cursor.execute(query, (email,))
        result = cursor.fetchone()

        if result:
            stored_password = result[0]

            # Verify the password using bcrypt
            if bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):
                return jsonify({"message": "Login successful!"}), 200
            else:
                return jsonify({"error": "Invalid email or password"}), 401
        else:
            return jsonify({"error": "Invalid email or password"}), 401

    except Error as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        connection.close()

# Recharge route (store recharge details)
@app.route('/api/recharge', methods=['POST'])
def recharge():
    data = request.json
    phone_number = data.get('phoneNumber')
    plan_details = data.get('planDetails')
    payment_method = data.get('paymentMethod') 
    service_provider = data.get('serviceProvider') # Expecting the selected payment method from the frontend

    if not phone_number or not plan_details or not payment_method or not service_provider:
        return jsonify({'error': 'Missing phone number, plan details, or payment method or service provider'}), 400

    # Extract plan details
    plan_type = plan_details['type']
    price = plan_details['price']
    validity = plan_details['validity']
    data_amount = plan_details['data']
    subscriptions = ', '.join(plan_details['subscriptions'])
    description = plan_details['description']

    # Calculate GST and total price
    gst_rate = 0.05
    gst_amount = price * gst_rate
    total_price = price + gst_amount

    try:
        # Insert recharge details into the database
        connection = get_db_connection()
        cursor = connection.cursor()

        # SQL query to create the recharge_details table with new columns if it doesn't exist
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS recharge_details4 (
            id INT AUTO_INCREMENT PRIMARY KEY,
            phone_number VARCHAR(15),
            plan_type VARCHAR(50),
            price DECIMAL(10, 2),
            gst_amount DECIMAL(10, 2),
            total_price DECIMAL(10, 2),
            validity VARCHAR(20),
            data VARCHAR(50),
            subscriptions TEXT,
            description TEXT,
            payment_method VARCHAR(50),
            service_provider VARCHAR(50),  # New column for service provider
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """)


        cursor.execute("""
        DROP TRIGGER IF EXISTS calculate_total_price;
        """)
        cursor.execute("""
        CREATE TRIGGER calculate_total_price BEFORE INSERT ON recharge_details4
        FOR EACH ROW
        BEGIN
            SET NEW.gst_amount = NEW.price * 0.05;
            SET NEW.total_price = NEW.price + NEW.gst_amount;
        END;
        """)
        # Insert recharge details into the recharge_details table
        insert_query = """
        INSERT INTO recharge_details4 (phone_number, plan_type, price, gst_amount, total_price, validity, data, subscriptions, description, payment_method, service_provider)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (phone_number, plan_type, price, gst_amount, total_price, validity, data_amount, subscriptions, description, payment_method, service_provider))
        connection.commit()
        rows_affected = cursor.rowcount

        return jsonify({'message': f'Recharge successful! {rows_affected} record(s) inserted.'}), 200


    except Error as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cursor.close()
        connection.close()



@app.route('/api/users/<email>', methods=['PUT'])
def update_user(email):
    data = request.get_json()
    name = data.get('name')
    flat_no = data.get('flat_no')
    apartment_name = data.get('apartment_name')
    area = data.get('area')
    pincode = data.get('pincode')

    connection = get_db_connection()
    cursor = connection.cursor()

    query = """
    UPDATE users
    SET name = %s, flat_no = %s, apartment_name = %s, area = %s, pincode = %s
    WHERE email = %s
    """
    values = (name, flat_no, apartment_name, area, pincode, email)

    cursor.execute(query, values)
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({"message": "User details updated successfully!"})

# Delete User Endpoint
@app.route('/api/users/<email>', methods=['DELETE'])
def delete_user(email):
    connection = get_db_connection()
    cursor = connection.cursor()

    query = "DELETE FROM users WHERE email = %s"
    cursor.execute(query, (email,))
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({"message": "User deleted successfully!"})



if __name__ == '__main__':
    app.run(debug=True)
