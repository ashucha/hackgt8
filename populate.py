import json
import pandas as pd
import requests

def extractCords(url):
    part1 = url.split('@')[-1]
    part2 = part1.split(',')
    return [part2[0], part2[1]]

# clear the database
ret = requests.get(url='http://localhost:5000/stores').json()
for x in ret:
    requests.delete(url='http://localhost:5000/stores/' + x['id'])

# name, address, foodType, cost, stars, url
df = pd.read_csv('data.tsv', '\t')
for row in df.iterrows():
    name, address, foodType, cost, stars, url = row[1]
    latitude, longitude = extractCords(url)
    body = {
        "name": name,
        "address": address,
        "foodType": foodType,
        "cost": 0 if pd.isnull(cost) else len(cost),
        "stars": stars,
        "latitude": latitude,
        "longitude": longitude
    }
    requests.post(url='http://localhost:5000/stores', headers={'content-type': 'application/json'}, data=json.dumps(body))