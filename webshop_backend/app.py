from flask import Flask, jsonify, request

app = Flask(__name__)



products = [
    {"id": 1, 
     "name": "Dell Latitude 5300", 
     "image": "dell_notebook.png", 
     "price": 112.878, 
     "description": "Intel Core i5-8365U | 16GB memory | 512GB SSD"
     },
    {"id": 2, 
     "name": "iPhone 16 Pro",
     "image": "iphone_16.png",  
     "price": 499.990, 
     "description": "128 GB - Black Titanium"
     },
     {
         "id": 3,
         "name": "TV LG",
         "image": "TV.png",
         "price": 89.287,
         "description": "Full HD TV (Google Assistant, 60 Hz, Smart TV)"
     },
     {
         "id": 4,
         "name": "Camera Mint Green",
         "image": "camera.png",
         "price": 32.009,
         "description": "Built-in flash light, Instant photos in credit card format, Automatic exposure adjustment."
     },
     {
         "id": 5,
         "name": "Ear Studio Headphones",
         "image": "headphone.png",
         "price": 11.787,
         "description": "With Cable with 6.3 mm & 3.5 mm Jack, Closed DJ Headphones with 50 mm Driver, Bass Sound."
     }
]

@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(products)



if __name__ == '__main__':
    app.run(debug=True)
